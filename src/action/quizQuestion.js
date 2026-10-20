"use server";

import QuizQuestion from "@/models/QuizQuestion";
import Contest from "@/models/Contest";
import connect from "@/utils/dbConnect";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { convertIdsToString } from "@/utils/helper";

const getQuestionsUnavailableForPractice = async () => {
  const contests = await Contest.find({
    status: { $in: ["DRAFT", "LIVE"] },
    sections: {
      $elemMatch: {
        questions: {
          $elemMatch: { questionDomain: "QuizQuestion" },
        },
      },
    },
  })
    .select("sections.questions")
    .lean();

  return [
    ...new Set(
      contests.flatMap((contest) =>
        (contest.sections || []).flatMap((section) =>
          (section.questions || [])
            .filter((entry) => entry.questionDomain === "QuizQuestion")
            .map((entry) => String(entry.question))
        )
      )
    ),
  ];
};

const isQuestionUnavailableForPractice = (questionId) =>
  Contest.exists({
    status: { $in: ["DRAFT", "LIVE"] },
    sections: {
      $elemMatch: {
        questions: {
          $elemMatch: {
            question: questionId,
            questionDomain: "QuizQuestion",
          },
        },
      },
    },
  });

export const getQuizQuestions = cache(async (fields) => {
  try {
    await connect();

    const questions = await QuizQuestion.find({})
      .select(fields)
      .sort({ created_at: -1 })
      .lean();

    return {
      questions: convertIdsToString(questions),
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return { message: error.message, type: "error", success: false };
  }
});

export const getPracticeQuizQuestions = cache(async () => {
  try {
    await connect();

    const unavailableQuestionIds = await getQuestionsUnavailableForPractice();
    const questions = await QuizQuestion.find({
      _id: { $nin: unavailableQuestionIds },
    })
      .select("_id name slug description questionType answerType difficulty point")
      .sort({ created_at: -1 })
      .lean();

    return {
      questions: convertIdsToString(questions),
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Error fetching practice quiz questions:", error);
    return { message: error.message, type: "error", success: false };
  }
});

export const getQuizQuestion = async (slug) => {
  try {
    await connect();
    const question = await QuizQuestion.findOne({ slug })
      .select(
        "name slug description questionType answerType difficulty point questionSnippet codeLanguage options.value"
      )
      .lean();

    if (!question) {
      return {
        message: "Question not found",
        type: "error",
        success: false,
      };
    }

    if (await isQuestionUnavailableForPractice(question._id)) {
      return {
        message: "This quiz question is not available for practice.",
        type: "error",
        success: false,
      };
    }

    return {
      question: convertIdsToString(question),
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Error fetching quiz question:", error);
    return { message: error.message, type: "error", success: false };
  }
};

export const checkQuizAnswer = async (slug, answer) => {
  try {
    await connect();
    const question = await QuizQuestion.findOne({ slug }).select(
      "answerType correctCodeSnippet options.value options.isCorrect"
    );

    if (!question) {
      return {
        message: "Question not found",
        type: "error",
        success: false,
      };
    }

    if (await isQuestionUnavailableForPractice(question._id)) {
      return {
        message: "This quiz question is not available for practice.",
        type: "error",
        success: false,
      };
    }

    let correct = false;
    let correctOptions = [];
    if (question.answerType === "CODE") {
      const normalize = (code) => String(code || "").replace(/\s+/g, "");
      correct =
        normalize(answer?.codeAnswer) ===
          normalize(question.correctCodeSnippet) &&
        Boolean(answer?.codeAnswer?.trim());
    } else {
      const submittedOptions = Array.isArray(answer?.selectedOptions)
        ? [...new Set(answer.selectedOptions)]
        : [];
      const availableOptions = question.options.map((option) => option.value);
      correctOptions = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option.value);
      const submittedOptionsAreValid = submittedOptions.every((option) =>
        availableOptions.includes(option)
      );

      correct =
        submittedOptionsAreValid &&
        submittedOptions.length === correctOptions.length &&
        correctOptions.every((option) => submittedOptions.includes(option));
    }

    return {
      message: correct ? "Correct answer" : "Not quite. Try again.",
      correct,
      correctOptions,
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Failed to check quiz answer:", error);
    return { message: error.message, type: "error", success: false };
  }
};

export const addQuizQuestion = async (questionData) => {
  try {
    await connect();

    const {
      name,
      slug,
      description,
      point,
      difficulty,
      questionSnippet,
      correctCodeSnippet,
      optionsEnabled,
      options,
      questionType,
      answerType,
      codeLanguage,
    } = questionData;

    const payload =
      questionType === "DEBUGGING"
        ? {
            name,
            slug,
            description,
            point,
            difficulty,
            questionSnippet,
            ...(optionsEnabled ? { options } : { correctCodeSnippet }),
            codeLanguage,
            questionType,
            answerType,
          }
        : {
            name,
            slug,
            description,
            point,
            difficulty,
            questionType,
            options,
            answerType,
          };

    // Create new question
    await QuizQuestion.create(payload);

    // Invalidate caches
    revalidatePath(`/practice/quiz/${slug}`);

    return {
      message: "Quiz question successfully added",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Failed to add quiz question:", error);
    return { message: error.message, type: "error", success: false };
  }
};

// export const updateQuizQuestion = async (question) => {
//   try {
//     await connect();

//     const { _id, name, desc, point, difficulty, link } = question;

//     const updatedQuestion = await QuizQuestion.updateOne(
//       { _id },
//       { $set: { name, desc, point, difficulty, link } }
//     );

//     return {
//       message: "Question Updated",
//       question: updatedQuestion,
//       type: "success",
//       success: true,
//     };
//   } catch (error) {
//     console.log(error);
//     return { message: error.message, type: "error", success: false };
//   }
// };

export const deleteQuizQuestion = async (questionId) => {
  try {
    await connect();

    const question = await QuizQuestion.findById(questionId).select("slug").lean();
    if (!question) throw new Error("Question not found.");
    const result = await QuizQuestion.deleteOne({ _id: questionId });
    if (!result.deletedCount) throw new Error("Question not found.");
    revalidatePath(`/practice/quiz/${question.slug}`);
    return { message: "Question deleted", type: "success", success: true };
  } catch (error) {
    console.log(error);
    return { message: error.message, type: "error", success: false };
  }
};
