"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CodingQuestion from "@/models/CodingQuestion";
import Contest from "@/models/Contest";
import ContestAttempt from "@/models/ContestAttempt";
import QuizQuestion from "@/models/QuizQuestion";
import { createSubmission, getSubmissionResult } from "@/action/playground";
import connect from "@/utils/dbConnect";

const SUBMISSION_GRACE_MS = 15 * 60 * 1000;
const MAX_CODE_LENGTH = 100_000;
const MAX_INTEGRITY_EVENTS = 500;
const SUPPORTED_LANGUAGE_IDS = {
  c: 50,
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
  sql: 60,
};
const INTEGRITY_EVENT_TYPES = new Set([
  "TAB_SWITCH",
  "WINDOW_BLUR",
  "COPY",
  "PASTE",
  "CUT",
  "FULLSCREEN_EXIT",
]);

const getUserId = (user) => {
  if (user == null) return "";
  if (typeof user !== "object") return String(user);
  if (user._id || user.id) return String(user._id || user.id);
  if (typeof user.toHexString === "function") return user.toHexString();
  return String(user);
};

const getContestEnd = (contest) =>
  new Date(
    new Date(contest.startDate).getTime() +
      Number(contest.durationMinutes) * 60 * 1000
  );

const getSafeQuestion = (snapshot) => ({
  key: snapshot.key,
  questionId: String(snapshot.questionId),
  questionDomain: snapshot.questionDomain,
  sectionIndex: snapshot.sectionIndex,
  questionIndex: snapshot.questionIndex,
  sectionName: snapshot.sectionName,
  sectionDescription: snapshot.sectionDescription,
  sectionTimeLimitMinutes: snapshot.sectionTimeLimitMinutes,
  timeLimitSeconds: snapshot.timeLimitSeconds,
  name: snapshot.name,
  description: snapshot.description,
  questionType: snapshot.questionType,
  answerType: snapshot.answerType,
  difficulty: snapshot.difficulty,
  point: snapshot.point,
  questionSnippet: snapshot.questionSnippet,
  codeLanguage: snapshot.codeLanguage,
  options: snapshot.options,
  inputFormat: snapshot.inputFormat,
  outputFormat: snapshot.outputFormat,
  constraints: snapshot.constraints,
  allowedLanguages: snapshot.allowedLanguages,
});

const buildQuestionSnapshot = async (contest) => {
  const references = (contest.sections || []).flatMap((section, sectionIndex) =>
    section.questions.map((entry, questionIndex) => ({
      entry,
      section,
      sectionIndex,
      questionIndex,
      questionId: String(entry.question),
    }))
  );
  const quizIds = references
    .filter(({ entry }) => entry.questionDomain === "QuizQuestion")
    .map(({ questionId }) => questionId);
  const codingIds = references
    .filter(({ entry }) => entry.questionDomain === "CodingQuestion")
    .map(({ questionId }) => questionId);

  const [quizQuestions, codingQuestions] = await Promise.all([
    quizIds.length
      ? QuizQuestion.find({ _id: { $in: quizIds } })
          .select(
            "name description questionType answerType difficulty point questionSnippet codeLanguage options.value options.isCorrect correctCodeSnippet"
          )
          .lean()
      : [],
    codingIds.length
      ? CodingQuestion.find({ _id: { $in: codingIds } })
          .select(
            "name description inputFormat outputFormat constraints difficulty point allowedLanguages testCases.input testCases.output"
          )
          .lean()
      : [],
  ]);
  const questionById = new Map();

  quizQuestions.forEach((question) =>
    questionById.set(`QuizQuestion:${question._id}`, question)
  );
  codingQuestions.forEach((question) =>
    questionById.set(`CodingQuestion:${question._id}`, question)
  );

  const snapshots = references.map(
    ({
      entry,
      section,
      sectionIndex,
      questionIndex,
      questionId,
    }) => {
      const question = questionById.get(
        `${entry.questionDomain}:${questionId}`
      );
      if (!question) {
        throw new Error(`A contest question could not be loaded (${questionId}).`);
      }

      const isQuizQuestion = entry.questionDomain === "QuizQuestion";
      const options = isQuizQuestion
        ? (question.options || []).map((option) => option.value)
        : [];
      const gradingData = isQuizQuestion
        ? {
            correctCodeSnippet: question.correctCodeSnippet || "",
            correctOptions: (question.options || [])
              .filter((option) => option.isCorrect)
              .map((option) => option.value),
          }
        : {
            testCases: (question.testCases || []).map((testCase) => ({
              input: testCase.input,
              output: testCase.output,
            })),
            allowedLanguages: question.allowedLanguages || [],
          };

      return {
        key: `${sectionIndex}:${questionIndex}:${entry.questionDomain}:${questionId}`,
        questionId,
        questionDomain: entry.questionDomain,
        sectionIndex,
        questionIndex,
        sectionName: section.name,
        sectionDescription: section.description || "",
        sectionTimeLimitMinutes: section.timeLimitMinutes ?? null,
        timeLimitSeconds: entry.timeLimitSeconds ?? null,
        name: question.name,
        description: question.description || "",
        questionType: isQuizQuestion ? question.questionType || "" : "",
        answerType: isQuizQuestion ? question.answerType || "" : "",
        difficulty: question.difficulty || "",
        point: Number(question.point) || 0,
        questionSnippet: isQuizQuestion ? question.questionSnippet || "" : "",
        codeLanguage: isQuizQuestion ? question.codeLanguage || "" : "",
        options,
        inputFormat: isQuizQuestion ? "" : question.inputFormat || "",
        outputFormat: isQuizQuestion ? "" : question.outputFormat || "",
        constraints: isQuizQuestion ? "" : question.constraints || "",
        allowedLanguages: isQuizQuestion
          ? []
          : question.allowedLanguages || [],
        gradingData,
      };
    }
  );

  return snapshots;
};

const buildSectionSnapshot = (contest) =>
  (contest.sections || []).map((section) => ({
    name: section.name,
    description: section.description || "",
    timeLimitMinutes: section.timeLimitMinutes ?? null,
  }));

const serializeQuestionTimer = (timer) => ({
  questionKey: timer.questionKey,
  startedAt: new Date(timer.startedAt).toISOString(),
  endsAt: new Date(timer.endsAt).toISOString(),
});

const getAttemptSections = (attempt, contest) =>
  attempt.sectionSnapshot?.length
    ? attempt.sectionSnapshot
    : buildSectionSnapshot(contest);

const getSectionEnd = (section, startedAt) =>
  section?.timeLimitMinutes
    ? new Date(
        new Date(startedAt).getTime() +
          Number(section.timeLimitMinutes) * 60 * 1000
      )
    : null;

const getSafeSection = (section, index) => ({
  index,
  name: section.name,
  description: section.description || "",
  timeLimitMinutes: section.timeLimitMinutes ?? null,
});

const getFinalJudgeResult = async (token) => {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const result = await getSubmissionResult(token);
    if (!result.success) {
      throw new Error(result.message || result.error || "Code grading failed.");
    }

    const statusId = result.data?.status?.id;
    if (statusId !== 1 && statusId !== 2) return result.data;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Code grading is taking too long.");
};

const gradeCodingAnswer = async (snapshot, answer) => {
  const language = String(answer.language || "").toLowerCase();
  const languageId = SUPPORTED_LANGUAGE_IDS[language];
  const allowedLanguages = snapshot.gradingData.allowedLanguages || [];
  const testCases = snapshot.gradingData.testCases || [];

  if (
    !answer.submittedCode ||
    answer.submittedCode.length > MAX_CODE_LENGTH ||
    !languageId ||
    !allowedLanguages.includes(language) ||
    !testCases.length
  ) {
    return { pointsAwarded: 0, gradingStatus: "VALIDATED" };
  }

  const submission = await createSubmission({
    source_code: answer.submittedCode,
    language_id: languageId,
    testcases: testCases.map((testCase) => ({
      stdin: testCase.input || "",
      expected_output: testCase.output || "",
    })),
  });
  if (!submission.success || !submission.data?.length) {
    console.error(
      "Unable to start Judge0 grading for contest answer:",
      submission.message || submission.error
    );
    return { pointsAwarded: 0, gradingStatus: "PENDING" };
  }

  try {
    const results = await Promise.all(
      submission.data.map((token) => getFinalJudgeResult(token))
    );
    const passed = results.filter((result) => result?.status?.id === 3).length;
    return {
      pointsAwarded: Math.round((snapshot.point * passed) / results.length),
      gradingStatus: "VALIDATED",
    };
  } catch (error) {
    console.error("Unable to retrieve Judge0 contest results:", error);
    return { pointsAwarded: 0, gradingStatus: "PENDING" };
  }
};

const gradeAnswer = async (snapshot, answer) => {
  if (snapshot.questionDomain === "CodingQuestion") {
    return gradeCodingAnswer(snapshot, answer);
  }

  if (snapshot.answerType === "CODE") {
    const normalizeCode = (code) => String(code || "").replace(/\s+/g, "");
    const correctAnswer = snapshot.gradingData.correctCodeSnippet;
    return {
      pointsAwarded:
        answer.submittedCode?.trim() &&
        normalizeCode(answer.submittedCode) === normalizeCode(correctAnswer)
          ? snapshot.point
          : 0,
      gradingStatus: "VALIDATED",
    };
  }

  const submittedOptions = [...new Set(answer.selectedOptions || [])];
  const validOptions = new Set(snapshot.options);
  const correctOptions = snapshot.gradingData.correctOptions || [];
  const validSubmission = submittedOptions.every((option) =>
    validOptions.has(option)
  );
  const isCorrect =
    validSubmission &&
    submittedOptions.length === correctOptions.length &&
    correctOptions.every((option) => submittedOptions.includes(option));

  return {
    pointsAwarded: isCorrect ? snapshot.point : 0,
    gradingStatus: "VALIDATED",
  };
};

const retryPendingCodingAnswers = async (attempt, userId) => {
  const pendingAnswers = (attempt.answers || []).filter(
    (answer) => answer.gradingStatus === "PENDING"
  );
  if (!pendingAnswers.length) return;

  const retryResults = await Promise.all(
    pendingAnswers.map(async (answer) => {
      const snapshot = attempt.questionSnapshot.find(
        (question) => question.key === answer.questionKey
      );
      if (!snapshot) {
        throw new Error(
          `Unable to find the question for answer ${answer.questionKey}.`
        );
      }
      return {
        answer,
        grading: await gradeAnswer(snapshot, answer),
      };
    })
  );

  for (const { answer, grading } of retryResults) {
    if (grading.gradingStatus !== "VALIDATED") continue;
    await ContestAttempt.updateOne(
      {
        _id: attempt._id,
        user: userId,
        status: "SUBMITTED",
        answers: {
          $elemMatch: {
            questionKey: answer.questionKey,
            gradingStatus: "PENDING",
          },
        },
      },
      {
        $set: {
          "answers.$[answer].pointsAwarded": grading.pointsAwarded,
          "answers.$[answer].gradingStatus": "VALIDATED",
        },
        $inc: { score: grading.pointsAwarded },
      },
      {
        arrayFilters: [
          {
            "answer.questionKey": answer.questionKey,
            "answer.gradingStatus": "PENDING",
          },
        ],
      }
    );
  }
};

export const getContestAttemptContext = async (slug) => {
  try {
    const session = await getServerSession(options);
    await connect();
    const contest = await Contest.findOne({
      slug,
      status: { $ne: "DRAFT" },
    })
      .select("name slug status startDate durationMinutes participants.user")
      .lean();

    if (!contest) {
      return { success: false, message: "Contest not found." };
    }

    const userId = session?.user?._id;
    const registered = Boolean(
      userId &&
        contest.participants?.some(
          (participant) => getUserId(participant.user) === String(userId)
        )
    );
    const attempt = registered
      ? await ContestAttempt.findOne({
          contest: contest._id,
          user: userId,
        })
          .select(
            "status startedAt dueAt submittedAt activeSectionIndex sectionStartedAt sectionEndsAt completedSectionIndexes"
          )
          .lean()
      : null;
    const endsAt = getContestEnd(contest);
    const reportReady =
      Boolean(attempt?.submittedAt) &&
      (contest.status === "COMPLETED" || Date.now() >= endsAt.getTime());

    return {
      success: true,
      authenticated: Boolean(userId),
      registered,
      contest: {
        name: contest.name,
        slug: contest.slug,
        status: contest.status,
        startDate: new Date(contest.startDate).toISOString(),
        endsAt: endsAt.toISOString(),
      },
      attempt: attempt
        ? {
            status: attempt.status,
            startedAt: attempt.startedAt?.toISOString(),
            dueAt: attempt.dueAt?.toISOString(),
            submittedAt: attempt.submittedAt?.toISOString(),
            reportReady,
            activeSectionIndex: attempt.activeSectionIndex ?? -1,
            sectionStartedAt: attempt.sectionStartedAt?.toISOString() || null,
            sectionEndsAt: attempt.sectionEndsAt?.toISOString() || null,
          }
        : null,
    };
  } catch (error) {
    console.error("Failed to load contest attempt:", error);
    return { success: false, message: error.message };
  }
};

export const startContestAttempt = async (slug) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return { success: false, message: "Sign in before starting the contest." };
    }

    await connect();
    const contest = await Contest.findOne({
      slug,
      status: { $in: ["LIVE", "COMPLETED"] },
    })
      .select("name slug status startDate durationMinutes participants.user sections")
      .lean();
    if (!contest) {
      return { success: false, message: "Contest is not available." };
    }

    const registered = contest.participants?.some(
      (participant) => getUserId(participant.user) === String(userId)
    );
    if (!registered) {
      return {
        success: false,
        message: "You must be registered for this contest to attempt it.",
      };
    }

    const now = new Date();
    const startsAt = new Date(contest.startDate);
    const endsAt = getContestEnd(contest);
    let attempt = await ContestAttempt.findOne({
      contest: contest._id,
      user: userId,
    }).select("+questionSnapshot.gradingData");

    if (attempt?.status === "SUBMITTED") {
      return {
        success: true,
        alreadySubmitted: true,
        message: "This contest attempt has already been submitted.",
      };
    }

    if (now < startsAt) {
      return {
        success: false,
        message: `The contest starts at ${startsAt.toISOString()}.`,
      };
    }
    if (
      contest.status === "CANCELED" ||
      now.getTime() > endsAt.getTime() + SUBMISSION_GRACE_MS
    ) {
      return { success: false, message: "The contest attempt window is closed." };
    }
    if (!attempt && (contest.status !== "LIVE" || now >= endsAt)) {
      return { success: false, message: "The contest is not accepting attempts." };
    }

    if (!attempt) {
      const questionSnapshot = await buildQuestionSnapshot(contest);
      const maxScore = questionSnapshot.reduce(
        (total, question) => total + question.point,
        0
      );
      try {
        attempt = await ContestAttempt.create({
          contest: contest._id,
          user: userId,
          startedAt: now,
          dueAt: endsAt,
          questionSnapshot,
          sectionSnapshot: buildSectionSnapshot(contest),
          maxScore,
        });
      } catch (error) {
        if (error.code !== 11000) throw error;
        attempt = await ContestAttempt.findOne({
          contest: contest._id,
          user: userId,
        }).select("+questionSnapshot.gradingData");
        if (!attempt) throw error;
      }
    }

    return {
      success: true,
      attemptId: String(attempt._id),
      startedAt: attempt.startedAt.toISOString(),
      dueAt: attempt.dueAt.toISOString(),
      questions: attempt.questionSnapshot.map(getSafeQuestion),
      sections: getAttemptSections(attempt, contest).map(getSafeSection),
      activeSectionIndex:
        Number.isInteger(attempt.activeSectionIndex) &&
        attempt.activeSectionIndex >= 0
          ? attempt.activeSectionIndex
          : -1,
      sectionStartedAt: attempt.sectionStartedAt?.toISOString() || null,
      sectionEndsAt: attempt.sectionEndsAt?.toISOString() || null,
      completedSectionIndexes: attempt.completedSectionIndexes || [],
      questionTimers: (attempt.questionTimers || []).map(serializeQuestionTimer),
    };
  } catch (error) {
    console.error("Failed to start contest attempt:", error);
    return { success: false, message: error.message };
  }
};

export const startContestAttemptQuestionTimer = async (
  attemptId,
  questionKey
) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return { success: false, message: "Sign in to continue this contest." };
    }

    await connect();
    const attempt = await ContestAttempt.findOne({
      _id: attemptId,
      user: userId,
      status: "IN_PROGRESS",
    })
      .select(
        "contest dueAt sectionEndsAt activeSectionIndex questionSnapshot.key questionSnapshot.sectionIndex questionSnapshot.questionIndex questionSnapshot.timeLimitSeconds questionTimers"
      )
      .lean();
    if (!attempt) {
      return { success: false, message: "Contest attempt not found." };
    }
    const contest = await Contest.findById(attempt.contest)
      .select("status")
      .lean();
    if (!contest || !["LIVE", "COMPLETED"].includes(contest.status)) {
      return { success: false, message: "The contest question window is closed." };
    }

    const question = attempt.questionSnapshot.find(
      (item) => item.key === questionKey
    );
    if (
      !question ||
      question.sectionIndex !== attempt.activeSectionIndex
    ) {
      return { success: false, message: "This question is not in the active section." };
    }
    if (!question.timeLimitSeconds || question.timeLimitSeconds <= 0) {
      return { success: true, timer: null };
    }

    const existingTimer = attempt.questionTimers?.find(
      (timer) => timer.questionKey === questionKey
    );
    if (existingTimer) {
      return { success: true, timer: serializeQuestionTimer(existingTimer) };
    }

    const now = new Date();
    if (
      (attempt.sectionEndsAt && now >= new Date(attempt.sectionEndsAt)) ||
      now.getTime() >
        new Date(attempt.dueAt).getTime() + SUBMISSION_GRACE_MS
    ) {
      return { success: false, message: "This question's time window has ended." };
    }

    let endsAt = new Date(
      now.getTime() + Number(question.timeLimitSeconds) * 1000
    );
    if (attempt.sectionEndsAt && endsAt > new Date(attempt.sectionEndsAt)) {
      endsAt = new Date(attempt.sectionEndsAt);
    }
    if (endsAt > new Date(attempt.dueAt)) {
      endsAt = new Date(attempt.dueAt);
    }
    const timer = {
      questionKey,
      startedAt: now,
      endsAt,
    };
    await ContestAttempt.updateOne(
      {
        _id: attempt._id,
        user: userId,
        status: "IN_PROGRESS",
        activeSectionIndex: attempt.activeSectionIndex,
        "questionTimers.questionKey": { $ne: questionKey },
      },
      { $push: { questionTimers: timer } }
    );

    const updatedAttempt = await ContestAttempt.findOne({
      _id: attempt._id,
      user: userId,
    })
      .select("questionTimers")
      .lean();
    const savedTimer = updatedAttempt?.questionTimers?.find(
      (item) => item.questionKey === questionKey
    );
    if (!savedTimer) {
      throw new Error("Unable to start the question timer.");
    }

    return { success: true, timer: serializeQuestionTimer(savedTimer) };
  } catch (error) {
    console.error("Failed to start contest question timer:", error);
    return { success: false, message: error.message };
  }
};

export const enterContestAttemptSection = async (attemptId) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return { success: false, message: "Sign in to enter this section." };
    }

    await connect();
    const attempt = await ContestAttempt.findOne({
      _id: attemptId,
      user: userId,
      status: "IN_PROGRESS",
    });
    if (!attempt) {
      return { success: false, message: "Contest attempt not found." };
    }
    if (attempt.activeSectionIndex >= 0) {
      return { success: false, message: "A contest section is already active." };
    }

    const now = new Date();
    const contest = await Contest.findById(attempt.contest)
      .select("status sections")
      .lean();
    if (
      !contest ||
      !["LIVE", "COMPLETED"].includes(contest.status) ||
      now.getTime() >
        new Date(attempt.dueAt).getTime() + SUBMISSION_GRACE_MS
    ) {
      return { success: false, message: "The contest section window is closed." };
    }

    if (
      !attempt.sectionSnapshot?.length
    ) {
      attempt.sectionSnapshot = buildSectionSnapshot(contest);
      await attempt.save();
    }

    const firstSection = attempt.sectionSnapshot?.[0];
    if (!firstSection) {
      return { success: false, message: "This contest has no sections." };
    }

    const sectionEndsAt = getSectionEnd(firstSection, now);
    const update = await ContestAttempt.updateOne(
      {
        _id: attempt._id,
        user: userId,
        status: "IN_PROGRESS",
        activeSectionIndex: { $lt: 0 },
      },
      {
        $set: {
          activeSectionIndex: 0,
          sectionStartedAt: now,
          sectionEndsAt,
        },
      }
    );
    if (!update.modifiedCount) {
      return { success: false, message: "Unable to enter the first section." };
    }

    const updated = await ContestAttempt.findOne({
      _id: attempt._id,
      user: userId,
    }).select("activeSectionIndex sectionStartedAt sectionEndsAt");
    return {
      success: true,
      activeSectionIndex: updated.activeSectionIndex,
      sectionStartedAt: updated.sectionStartedAt?.toISOString() || null,
      sectionEndsAt: updated.sectionEndsAt?.toISOString() || null,
    };
  } catch (error) {
    console.error("Failed to enter contest section:", error);
    return { success: false, message: error.message };
  }
};

export const advanceContestAttemptSection = async (
  attemptId,
  currentSectionIndex,
  finishEarly = false
) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return { success: false, message: "Sign in to continue this contest." };
    }

    await connect();
    const attempt = await ContestAttempt.findOne({
      _id: attemptId,
      user: userId,
      status: "IN_PROGRESS",
    });
    if (!attempt || attempt.activeSectionIndex !== currentSectionIndex) {
      return { success: false, message: "The active contest section changed." };
    }

    const now = new Date();
    const contest = await Contest.findById(attempt.contest)
      .select("status")
      .lean();
    if (
      !contest ||
      !["LIVE", "COMPLETED"].includes(contest.status) ||
      now.getTime() >
        new Date(attempt.dueAt).getTime() + SUBMISSION_GRACE_MS
    ) {
      return { success: false, message: "The contest section window is closed." };
    }
    if (
      !finishEarly &&
      attempt.sectionEndsAt &&
      now.getTime() < attempt.sectionEndsAt.getTime()
    ) {
      return { success: false, message: "This section still has time remaining." };
    }

    const sections = getAttemptSections(attempt, { sections: [] });
    const nextSectionIndex = currentSectionIndex + 1;
    const completedSectionIndexes = [
      ...new Set([...(attempt.completedSectionIndexes || []), currentSectionIndex]),
    ];
    const nextSection = sections[nextSectionIndex];
    const nextSectionEndsAt = nextSection
      ? getSectionEnd(nextSection, now)
      : null;
    const update = await ContestAttempt.updateOne(
      {
        _id: attempt._id,
        user: userId,
        status: "IN_PROGRESS",
        activeSectionIndex: currentSectionIndex,
      },
      {
        $set: {
          activeSectionIndex: nextSection ? nextSectionIndex : sections.length,
          sectionStartedAt: nextSection ? now : null,
          sectionEndsAt: nextSectionEndsAt,
          completedSectionIndexes,
        },
      }
    );
    if (!update.modifiedCount) {
      return { success: false, message: "Unable to advance to the next section." };
    }

    return {
      success: true,
      complete: !nextSection,
      activeSectionIndex: nextSection ? nextSectionIndex : sections.length,
      sectionStartedAt: nextSection ? now.toISOString() : null,
      sectionEndsAt: nextSectionEndsAt?.toISOString() || null,
      completedSectionIndexes,
    };
  } catch (error) {
    console.error("Failed to advance contest section:", error);
    return { success: false, message: error.message };
  }
};

export const submitContestAttempt = async (
  attemptId,
  submittedAnswers,
  integrityEvents
) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return { success: false, message: "Sign in to submit your attempt." };
    }
    if (!Array.isArray(submittedAnswers) || !Array.isArray(integrityEvents)) {
      return { success: false, message: "Invalid contest submission." };
    }
    if (integrityEvents.length > MAX_INTEGRITY_EVENTS) {
      return { success: false, message: "Too many integrity events to submit." };
    }

    await connect();
    const attempt = await ContestAttempt.findOne({
      _id: attemptId,
      user: userId,
    }).select("+questionSnapshot.gradingData");
    if (!attempt) {
      return { success: false, message: "Contest attempt not found." };
    }
    if (attempt.status === "SUBMITTED") {
      return {
        success: true,
        message: "Your contest attempt has already been submitted.",
      };
    }

    const contest = await Contest.findById(attempt.contest)
      .select("status slug")
      .lean();
    const now = new Date();
    if (
      !contest ||
      !["LIVE", "COMPLETED"].includes(contest.status) ||
      now.getTime() >
        new Date(attempt.dueAt).getTime() + SUBMISSION_GRACE_MS
    ) {
      return { success: false, message: "The contest submission window is closed." };
    }

    const questionByKey = new Map(
      attempt.questionSnapshot.map((question) => [question.key, question])
    );
    const answersByKey = new Map();
    for (const answer of submittedAnswers) {
      if (
        !answer ||
        typeof answer.questionKey !== "string" ||
        !questionByKey.has(answer.questionKey) ||
        answersByKey.has(answer.questionKey)
      ) {
        return { success: false, message: "Invalid or duplicate question answer." };
      }
      if (
        typeof answer.submittedCode === "string" &&
        answer.submittedCode.length > MAX_CODE_LENGTH
      ) {
        return { success: false, message: "A code answer exceeds the size limit." };
      }
      answersByKey.set(answer.questionKey, answer);
    }

    const answers = [];
    let score = 0;
    for (const snapshot of attempt.questionSnapshot) {
      const answer = answersByKey.get(snapshot.key);
      if (!answer) continue;

      const normalizedAnswer = {
        selectedOptions: Array.isArray(answer.selectedOptions)
          ? answer.selectedOptions.filter(
              (option) => typeof option === "string"
            )
          : [],
        submittedCode:
          typeof answer.submittedCode === "string"
            ? answer.submittedCode
            : "",
        language:
          typeof answer.language === "string" ? answer.language : "",
      };
      const hasAnswer =
        normalizedAnswer.selectedOptions.length > 0 ||
        Boolean(normalizedAnswer.submittedCode.trim());
      if (!hasAnswer) continue;

      const grading = await gradeAnswer(snapshot, normalizedAnswer);
      const { pointsAwarded, gradingStatus } = grading;
      score += pointsAwarded;
      answers.push({
        questionKey: snapshot.key,
        selectedOptions: normalizedAnswer.selectedOptions,
        submittedCode: normalizedAnswer.submittedCode,
        language: normalizedAnswer.language,
        pointsAwarded,
        pointsPossible: snapshot.point,
        gradingStatus,
      });
    }

    const maxElapsedTime =
      new Date(attempt.dueAt).getTime() -
      new Date(attempt.startedAt).getTime() +
      SUBMISSION_GRACE_MS;
    const savedIntegrityEvents = integrityEvents
      .filter(
        (event) =>
          event &&
          INTEGRITY_EVENT_TYPES.has(event.type) &&
          Number.isFinite(Number(event.occurredAtMs))
      )
      .map((event) => ({
        type: event.type,
        occurredAtMs: Math.min(
          maxElapsedTime,
          Math.max(0, Number(event.occurredAtMs))
        ),
      }));

    const updatedAttempt = await ContestAttempt.findOneAndUpdate(
      { _id: attempt._id, user: userId, status: "IN_PROGRESS" },
      {
        $set: {
          status: "SUBMITTED",
          submittedAt: now,
          answers,
          integrityEvents: savedIntegrityEvents,
          score,
        },
      },
      { new: true, runValidators: true }
    ).select("_id");

    if (!updatedAttempt) {
      const latestAttempt = await ContestAttempt.findById(attempt._id)
        .select("status")
        .lean();
      if (latestAttempt?.status === "SUBMITTED") {
        return {
          success: true,
          message: "Your contest attempt has already been submitted.",
        };
      }
      return { success: false, message: "Unable to save your contest attempt." };
    }

    revalidatePath(`/contest/${contest.slug}`);
    revalidatePath("/my-contests");
    const pendingValidationCount = answers.filter(
      (answer) => answer.gradingStatus === "PENDING"
    ).length;
    return {
      success: true,
      message: pendingValidationCount
        ? `Attempt submitted. ${pendingValidationCount} coding answer${
            pendingValidationCount === 1 ? " is" : "s are"
          } not validated yet; we'll retry when you open your report.`
        : "Attempt submitted. Your report will be available after the contest ends.",
    };
  } catch (error) {
    console.error("Failed to submit contest attempt:", error);
    return { success: false, message: error.message };
  }
};

export const getContestAttemptReport = async (slug) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return { success: false, message: "Sign in to view your contest report." };
    }

    await connect();
    const contest = await Contest.findOne({ slug })
      .select("name slug status startDate durationMinutes")
      .lean();
    if (!contest) {
      return { success: false, message: "Contest not found." };
    }

    let attempt = await ContestAttempt.findOne({
      contest: contest._id,
      user: userId,
      status: "SUBMITTED",
    })
      .select("+questionSnapshot.gradingData")
      .lean();
    if (!attempt) {
      return { success: false, message: "No submitted attempt was found." };
    }

    const reportReady =
      contest.status === "COMPLETED" ||
      Date.now() >= getContestEnd(contest).getTime();
    if (!reportReady) {
      return {
        success: false,
        message: "Your report will be available after the contest ends.",
      };
    }

    if (attempt.answers.some((answer) => answer.gradingStatus === "PENDING")) {
      await retryPendingCodingAnswers(attempt, userId);
      attempt = await ContestAttempt.findOne({
        contest: contest._id,
        user: userId,
        status: "SUBMITTED",
      })
        .select("+questionSnapshot.gradingData")
        .lean();
    }

    const answersByKey = new Map(
      attempt.answers.map((answer) => [answer.questionKey, answer])
    );
    const pendingValidationCount = attempt.answers.filter(
      (answer) => answer.gradingStatus === "PENDING"
    ).length;

    return {
      success: true,
      report: {
        contestName: contest.name,
        startedAt: attempt.startedAt.toISOString(),
        submittedAt: attempt.submittedAt.toISOString(),
        score: attempt.score,
        maxScore: attempt.maxScore,
        pendingValidationCount,
        questions: attempt.questionSnapshot.map((question) => {
          const answer = answersByKey.get(question.key);
          return {
            ...getSafeQuestion(question),
            selectedOptions: answer?.selectedOptions || [],
            correctOptions: question.gradingData?.correctOptions || [],
            submittedCode: answer?.submittedCode || "",
            language: answer?.language || "",
            pointsAwarded: answer?.pointsAwarded || 0,
            gradingStatus: answer?.gradingStatus || "VALIDATED",
            attempted: Boolean(answer),
          };
        }),
      },
    };
  } catch (error) {
    console.error("Failed to load contest report:", error);
    return { success: false, message: error.message };
  }
};

export const getContestAttemptSummary = async (slug) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return { success: true, attempt: null };
    }

    await connect();
    const contest = await Contest.findOne({ slug })
      .select("status startDate durationMinutes")
      .lean();
    if (!contest) {
      return { success: false, message: "Contest not found." };
    }

    let attempt = await ContestAttempt.findOne({
      contest: contest._id,
      user: userId,
    })
      .select(
        "status startedAt submittedAt score maxScore answers.questionKey answers.gradingStatus questionSnapshot.key"
      )
      .lean();
    if (!attempt) {
      return { success: true, attempt: null };
    }

    const submitted = attempt.status === "SUBMITTED";
    const contestEndsAt = getContestEnd(contest).getTime();
    const reportReady =
      submitted &&
      (contest.status === "COMPLETED" ||
        Date.now() >= contestEndsAt);
    if (!reportReady) {
      return {
        success: true,
        attempt: {
          status: attempt.status,
          reportReady: false,
          canResume:
            attempt.status === "IN_PROGRESS" &&
            ["LIVE", "COMPLETED"].includes(contest.status) &&
            Date.now() <= contestEndsAt + SUBMISSION_GRACE_MS,
        },
      };
    }

    if (
      attempt.answers?.some((answer) => answer.gradingStatus === "PENDING")
    ) {
      const attemptForValidation = await ContestAttempt.findOne({
        contest: contest._id,
        user: userId,
        status: "SUBMITTED",
      })
        .select("+questionSnapshot.gradingData")
        .lean();
      if (attemptForValidation) {
        await retryPendingCodingAnswers(attemptForValidation, userId);
        attempt = await ContestAttempt.findOne({
          contest: contest._id,
          user: userId,
        })
          .select(
            "status startedAt submittedAt score maxScore answers.questionKey answers.gradingStatus questionSnapshot.key"
          )
          .lean();
      }
    }

    const startedAt = new Date(attempt.startedAt);
    const submittedAt = new Date(attempt.submittedAt);
    const pendingValidationCount = (attempt.answers || []).filter(
      (answer) => answer.gradingStatus === "PENDING"
    ).length;

    return {
      success: true,
      attempt: {
        status: attempt.status,
        reportReady: true,
        score: attempt.score,
        maxScore: attempt.maxScore,
        pendingValidationCount,
        answeredCount: attempt.answers?.length || 0,
        totalQuestions: attempt.questionSnapshot?.length || 0,
        startedAt: startedAt.toISOString(),
        submittedAt: submittedAt.toISOString(),
        timeTakenMs: Math.max(0, submittedAt.getTime() - startedAt.getTime()),
      },
    };
  } catch (error) {
    console.error("Failed to load contest attempt summary:", error);
    return { success: false, message: error.message };
  }
};
