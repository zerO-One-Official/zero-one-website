"use client";

import {
  advanceContestAttemptSection,
  enterContestAttemptSection,
  startContestAttempt,
  startContestAttemptQuestionTimer,
  submitContestAttempt,
} from "@/action/contestAttempt";
import Markdown from "@/components/markdown/Markdown";
import CodeEditor from "@/components/codeEditor/CodeEditor";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SUBMISSION_GRACE_MS = 15 * 60 * 1000;
const MAX_LOCAL_EVENTS = 500;

const formatCountdown = (milliseconds) => {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;
};

const ContestAttempt = ({ context }) => {
  const router = useRouter();
  const [attempt, setAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [integrityEvents, setIntegrityEvents] = useState([]);
  const [questionTimers, setQuestionTimers] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionPreviewIndex, setSectionPreviewIndex] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [isOnline, setIsOnline] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(
    context.attempt?.status === "SUBMITTED"
  );
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [fullscreenLost, setFullscreenLost] = useState(false);
  const storageWarningShown = useRef(false);
  const answersRef = useRef(answers);
  const eventsRef = useRef(integrityEvents);
  const submitLock = useRef(false);
  const autoSubmitAttempted = useRef(false);
  const sectionTransitionLock = useRef(false);
  const autoSectionAdvanceKey = useRef("");
  const autoQuestionAdvanceKey = useRef("");
  const questionTimerInitializationKeys = useRef(new Set());
  const submitAttemptRef = useRef(null);

  const contestStart = new Date(context.contest.startDate).getTime();
  const contestEnd = new Date(context.contest.endsAt).getTime();
  const canResume =
    context.attempt?.status === "IN_PROGRESS" &&
    context.contest.status !== "CANCELED" &&
    now <= contestEnd + SUBMISSION_GRACE_MS;
  const canStart =
    context.contest.status === "LIVE" &&
    now >= contestStart &&
    now < contestEnd;
  const storageKey = attempt ? `contest-attempt:${attempt.attemptId}` : null;
  const questions = attempt?.questions || [];
  const sections = attempt?.sections || [];
  const activeSectionIndex = attempt?.activeSectionIndex ?? -1;
  const currentSectionQuestions = questions.filter(
    (item) => item.sectionIndex === activeSectionIndex
  );
  const currentQuestion = currentSectionQuestions[activeIndex];
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.key] || {
        selectedOptions: [],
        submittedCode: "",
        language: currentQuestion.allowedLanguages?.[0] || "",
      }
    : null;
  const currentQuestionTimer = currentQuestion
    ? questionTimers[currentQuestion.key]
    : null;
  const currentQuestionDeadline = currentQuestionTimer
    ? new Date(currentQuestionTimer.endsAt).getTime()
    : null;
  const questionTimeExpired =
    currentQuestionDeadline !== null && now >= currentQuestionDeadline;

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    answersRef.current = answers;
    eventsRef.current = integrityEvents;
    if (!attempt || !storageKey) return;

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          answers,
          integrityEvents,
          activeIndex,
          activeSectionIndex: attempt.activeSectionIndex,
        })
      );
    } catch {
      if (!storageWarningShown.current) {
        storageWarningShown.current = true;
        toast.error("Local answer recovery is unavailable in this browser.");
      }
    }
  }, [activeIndex, answers, attempt, integrityEvents, storageKey]);

  useEffect(() => {
    const question = currentQuestion;
    if (
      !attempt ||
      !question?.timeLimitSeconds ||
      questionTimers[question.key] ||
      questionTimerInitializationKeys.current.has(question.key)
    ) {
      return;
    }

    questionTimerInitializationKeys.current.add(question.key);
    startContestAttemptQuestionTimer(attempt.attemptId, question.key)
      .then((result) => {
        if (!result.success) {
          questionTimerInitializationKeys.current.delete(question.key);
          if (currentQuestion?.key === question.key) {
            toast.error(result.message);
          }
          return;
        }
        if (result.timer) {
          setQuestionTimers((previous) => ({
            ...previous,
            [question.key]: result.timer,
          }));
        }
      })
      .catch((error) => {
        questionTimerInitializationKeys.current.delete(question.key);
        if (currentQuestion?.key === question.key) {
          toast.error(error.message || "Unable to start the question timer.");
        }
      });
  }, [attempt, currentQuestion, questionTimers]);

  const recordIntegrityEvent = useCallback(
    (type) => {
      if (!attempt) return;
      const elapsed = Math.max(
        0,
        Date.now() - new Date(attempt.startedAt).getTime()
      );
      const nextEvents = [
        ...eventsRef.current,
        { type, occurredAtMs: elapsed },
      ].slice(-MAX_LOCAL_EVENTS);
      eventsRef.current = nextEvents;
      setIntegrityEvents(nextEvents);
    },
    [attempt]
  );

  useEffect(() => {
    if (!attempt) return undefined;

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        recordIntegrityEvent("TAB_SWITCH");
      }
    };
    const onWindowBlur = () => recordIntegrityEvent("WINDOW_BLUR");
    const onCopy = () => recordIntegrityEvent("COPY");
    const onPaste = () => recordIntegrityEvent("PASTE");
    const onCut = () => recordIntegrityEvent("CUT");
    const onFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement);
      setFullscreenLost(!isFullscreen);
      if (!isFullscreen) recordIntegrityEvent("FULLSCREEN_EXIT");
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    document.addEventListener("cut", onCut);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [attempt, recordIntegrityEvent]);

  const submitAttempt = useCallback(async () => {
    if (!attempt || submitLock.current || submitted) return;
    submitLock.current = true;
    setSubmitting(true);

    try {
      const submittedAnswers = Object.entries(answersRef.current).map(
        ([questionKey, answer]) => ({
          questionKey,
          selectedOptions: answer.selectedOptions || [],
          submittedCode: answer.submittedCode || "",
          language: answer.language || "",
        })
      );
      const result = await submitContestAttempt(
        attempt.attemptId,
        submittedAnswers,
        eventsRef.current
      );
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setSubmitted(true);
      setShowSubmitConfirmation(false);
      if (storageKey) {
        try {
          localStorage.removeItem(storageKey);
        } catch {
          toast.error("The submitted local recovery copy could not be cleared.");
        }
      }
      toast.success(result.message);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Unable to submit your attempt.");
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  }, [attempt, router, storageKey, submitted]);

  submitAttemptRef.current = submitAttempt;

  const enterFirstSection = async () => {
    if (!attempt || sectionTransitionLock.current) return;
    sectionTransitionLock.current = true;
    try {
      const result = await enterContestAttemptSection(attempt.attemptId);
      if (!result.success) {
        toast.error(result.message);
        return false;
      }
      setAttempt((previous) => ({
        ...previous,
        activeSectionIndex: result.activeSectionIndex,
        sectionStartedAt: result.sectionStartedAt,
        sectionEndsAt: result.sectionEndsAt,
      }));
      setActiveIndex(0);
      return true;
    } catch (error) {
      toast.error(error.message || "Unable to enter this section.");
      return false;
    } finally {
      sectionTransitionLock.current = false;
    }
  };

  const advanceSection = useCallback(
    async (finishEarly) => {
      if (!attempt || sectionTransitionLock.current) return;
      sectionTransitionLock.current = true;
      try {
        const result = await advanceContestAttemptSection(
          attempt.attemptId,
          activeSectionIndex,
          finishEarly
        );
        if (!result.success) {
          if (finishEarly) toast.error(result.message);
          return false;
        }
        if (result.complete) {
          await submitAttemptRef.current?.();
          return true;
        }
        setAttempt((previous) => ({
          ...previous,
          activeSectionIndex: result.activeSectionIndex,
          sectionStartedAt: result.sectionStartedAt,
          sectionEndsAt: result.sectionEndsAt,
          completedSectionIndexes: result.completedSectionIndexes,
        }));
        setActiveIndex(0);
        return true;
      } catch (error) {
        if (finishEarly) {
          toast.error(error.message || "Unable to advance to the next section.");
        }
        return false;
      } finally {
        sectionTransitionLock.current = false;
      }
    },
    [activeSectionIndex, attempt]
  );

  useEffect(() => {
    if (!attempt || submitted || now < new Date(attempt.dueAt).getTime()) {
      return;
    }
    if (navigator.onLine && !autoSubmitAttempted.current) {
      autoSubmitAttempted.current = true;
      submitAttemptRef.current?.();
    }
  }, [attempt, now, submitted]);

  useEffect(() => {
    if (
      !attempt ||
      submitted ||
      activeSectionIndex < 0 ||
      now >= new Date(attempt.dueAt).getTime() ||
      !attempt.sectionEndsAt ||
      now < new Date(attempt.sectionEndsAt).getTime()
    ) {
      return;
    }
    const key = `${attempt.attemptId}:${activeSectionIndex}`;
    if (autoSectionAdvanceKey.current === key) return;
    autoSectionAdvanceKey.current = key;
    if (activeSectionIndex + 1 < sections.length) {
      advanceSection(false).then((advanced) => {
        if (!advanced) autoSectionAdvanceKey.current = "";
      });
    } else {
      submitAttemptRef.current?.();
    }
  }, [activeSectionIndex, advanceSection, attempt, now, sections.length, submitted]);

  useEffect(() => {
    if (
      !attempt ||
      submitted ||
      !currentQuestion ||
      !questionTimeExpired
    ) {
      return;
    }

    const expiredKey = `${attempt.attemptId}:${currentQuestion.key}`;
    if (autoQuestionAdvanceKey.current === expiredKey) return;
    autoQuestionAdvanceKey.current = expiredKey;
    toast.info("Question time is over. Moving on.");

    const nextIndex = currentSectionQuestions.findIndex((question, index) => {
      if (index <= activeIndex) return false;
      const timer = questionTimers[question.key];
      return !timer || now < new Date(timer.endsAt).getTime();
    });
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    } else if (activeSectionIndex + 1 < sections.length) {
      advanceSection(true).then((advanced) => {
        if (!advanced) autoQuestionAdvanceKey.current = "";
      });
    } else {
      submitAttemptRef.current?.();
    }
  }, [
    activeIndex,
    activeSectionIndex,
    advanceSection,
    attempt,
    currentQuestion,
    currentSectionQuestions,
    now,
    questionTimeExpired,
    questionTimers,
    sections.length,
    submitted,
  ]);

  useEffect(() => {
    const retrySubmissionWhenOnline = () => {
      if (
        attempt &&
        !submitted &&
        Date.now() >= new Date(attempt.dueAt).getTime()
      ) {
        autoSubmitAttempted.current = false;
        submitAttemptRef.current?.();
      }
    };
    window.addEventListener("online", retrySubmissionWhenOnline);
    return () =>
      window.removeEventListener("online", retrySubmissionWhenOnline);
  }, [attempt, submitted]);

  const updateAnswer = (question, update) => {
    setAnswers((previous) => {
      const next = {
        ...previous,
        [question.key]: {
          selectedOptions: [],
          submittedCode: "",
          language: question.allowedLanguages?.[0] || "",
          ...previous[question.key],
          ...update,
        },
      };
      answersRef.current = next;
      return next;
    });
  };

  const beginAttempt = async () => {
    if (!document.fullscreenElement) {
      if (!document.fullscreenEnabled) {
        toast.error("This browser does not support fullscreen contest mode.");
        return;
      }
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        toast.error("Fullscreen is required to start this contest.");
        return;
      }
    }

    const result = await startContestAttempt(context.contest.slug);
    if (!result.success) {
      if (document.fullscreenElement) {
        await document.exitFullscreen().catch(() => {});
      }
      toast.error(result.message);
      router.refresh();
      return;
    }
    if (result.alreadySubmitted) {
      setSubmitted(true);
      router.refresh();
      return;
    }

    const activeAttempt = {
      attemptId: result.attemptId,
      startedAt: result.startedAt,
      dueAt: result.dueAt,
      questions: result.questions,
      sections: result.sections || [],
      activeSectionIndex: result.activeSectionIndex ?? -1,
      sectionStartedAt: result.sectionStartedAt,
      sectionEndsAt: result.sectionEndsAt,
      completedSectionIndexes: result.completedSectionIndexes || [],
    };
    setAttempt(activeAttempt);
    setAnswers({});
    setIntegrityEvents([]);
    setQuestionTimers(
      Object.fromEntries(
        (result.questionTimers || []).map((timer) => [
          timer.questionKey,
          timer,
        ])
      )
    );
    answersRef.current = {};
    eventsRef.current = [];
    setActiveIndex(0);

    try {
      const saved = localStorage.getItem(
        `contest-attempt:${activeAttempt.attemptId}`
      );
      if (saved) {
        const recovered = JSON.parse(saved);
        const recoveredAnswers =
          recovered?.answers && typeof recovered.answers === "object"
            ? recovered.answers
            : {};
        const recoveredEvents = Array.isArray(recovered?.integrityEvents)
          ? recovered.integrityEvents
          : [];
        const recoveredIndex =
          recovered?.activeSectionIndex === activeAttempt.activeSectionIndex &&
          Number.isInteger(recovered?.activeIndex) &&
          activeAttempt.questions.some(
            (question) =>
              question.sectionIndex === activeAttempt.activeSectionIndex &&
              question.questionIndex === recovered.activeIndex
          )
            ? recovered.activeIndex
            : 0;
        setAnswers(recoveredAnswers);
        setIntegrityEvents(recoveredEvents);
        setActiveIndex(recoveredIndex);
        answersRef.current = recoveredAnswers;
        eventsRef.current = recoveredEvents;
        toast.success("Your saved answers were restored.");
      }
    } catch {
      toast.error("Saved answers could not be read from local storage.");
    }
  };

  if (!context.success) {
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <section className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold text-accent">
            Contest unavailable
          </h1>
          <p className="mt-3 text-foreground/70">{context.message}</p>
          <Link
            href="/contests"
            className="mt-6 inline-block text-accent hover:underline"
          >
            Back to contests
          </Link>
        </section>
      </main>
    );
  }

  if (!context.authenticated) {
    const callbackUrl = `/contest/${context.contest.slug}/attempt`;
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <section className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold text-accent">
            Sign in to attempt this contest
          </h1>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-background"
          >
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  if (!context.registered) {
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <section className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold text-accent">
            Registration required
          </h1>
          <p className="mt-3 text-foreground/70">
            Register for this contest before starting an attempt.
          </p>
          <Link
            href={`/contest/${context.contest.slug}`}
            className="mt-6 inline-block text-accent hover:underline"
          >
            Back to contest
          </Link>
        </section>
      </main>
    );
  }

  if (submitted || context.attempt?.status === "SUBMITTED") {
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <section className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold text-accent">
            Attempt submitted
          </h1>
          <p className="mt-3 text-foreground/70">
            Your answers have been graded securely. The report will be
            available after the contest ends.
          </p>
          {context.attempt?.reportReady ? (
            <Link
              href={`/contest/${context.contest.slug}/my-report`}
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-background"
            >
              View report
            </Link>
          ) : (
            <Link
              href="/my-contests"
              className="mt-6 inline-block text-accent hover:underline"
            >
              Back to My Contests
            </Link>
          )}
        </section>
      </main>
    );
  }

  if (!attempt) {
    const contestHasEnded = context.contest.status !== "LIVE" || now >= contestEnd;
    const canEnter = canStart || canResume;
    return (
      <main className="grid min-h-screen place-items-center p-6">
        <section className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold text-accent">
            {context.contest.name}
          </h1>
          <p className="mt-3 text-foreground/70">
            {contestHasEnded
              ? canResume
                ? "Resume your saved attempt before the recovery window closes."
                : "The contest attempt window has ended."
              : now < contestStart
              ? `The contest starts in ${formatCountdown(contestStart - now)}.`
              : "Enter fullscreen to begin. Your answers are saved locally and can be restored after a reload."}
          </p>
          <p className="mt-4 text-sm text-foreground/50">
            Tab changes, window focus changes, copy/paste, and leaving
            fullscreen are recorded with your submission. Browser checks can
            record these actions but cannot guarantee that cheating is
            impossible.
          </p>
          {canEnter ? (
            <Button
              type="button"
              className="mt-6"
              onClick={beginAttempt}
            >
              {canResume ? "Resume fullscreen contest" : "Start fullscreen contest"}
            </Button>
          ) : null}
          <Link
            href={`/contest/${context.contest.slug}`}
            className="mt-6 block text-accent hover:underline"
          >
            Back to contest
          </Link>
        </section>
      </main>
    );
  }

  const question = currentQuestion;
  const questionTimerStarting =
    Boolean(question?.timeLimitSeconds) && currentQuestionDeadline === null;
  const deadline = new Date(attempt.dueAt).getTime();
  const sectionDeadline = attempt.sectionEndsAt
    ? new Date(attempt.sectionEndsAt).getTime()
    : null;
  const sectionTimeExpired =
    sectionDeadline !== null && now >= sectionDeadline;
  const activeSection = sections[activeSectionIndex];
  const previewSection = sections[sectionPreviewIndex] || sections[0];
  const isLastQuestionInSection =
    activeIndex === currentSectionQuestions.length - 1;
  const isFinalQuestion =
    isLastQuestionInSection &&
    activeSectionIndex === sections.length - 1;
  const answeredCount = questions.filter((item) => {
    const answer = answers[item.key];
    return (
      answer?.selectedOptions?.length > 0 ||
      Boolean(answer?.submittedCode?.trim())
    );
  }).length;
  const isQuizQuestion = question?.questionDomain === "QuizQuestion";
  const isCodeAnswer =
    question?.questionDomain === "CodingQuestion" ||
    question?.answerType === "CODE";
  const isMultipleChoice = question?.answerType === "MSQ";

  return (
    <main className="fixed inset-0 z-[100] flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-accent">
            {context.contest.name}
          </h1>
          <p className="text-sm text-foreground/60">
            {answeredCount} of {questions.length} answered
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p
            aria-live="polite"
            className={`font-mono text-xl font-semibold ${
              now >= deadline ? "text-red-400" : "text-accent"
            }`}
          >
            {formatCountdown(deadline - now)}
          </p>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setShowSubmitConfirmation(true)}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit contest"}
          </Button>
        </div>
      </header>

      {fullscreenLost ? (
        <div
          role="alert"
          className="border-b border-red-400/30 bg-red-400/10 px-6 py-2 text-center text-sm text-red-200"
        >
          Fullscreen was exited. This event has been recorded.
        </div>
      ) : null}
      {!isOnline ? (
        <div
          role="status"
          className="border-b border-yellow-400/30 bg-yellow-400/10 px-6 py-2 text-center text-sm text-yellow-100"
        >
          You are offline. Answers are saved locally; reconnect before the
          submission window closes.
        </div>
      ) : null}

      <nav
        aria-label="Contest sections"
        className="flex items-center gap-3 border-b border-white/10 px-4 py-3"
      >
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
          {sections.map((section) => {
            const isCompleted = attempt.completedSectionIndexes?.includes(
              section.index
            );
            const isActive = section.index === activeSectionIndex;
            const isPreview =
              activeSectionIndex < 0 &&
              section.index === sectionPreviewIndex;
            const canOpenNext =
              activeSectionIndex >= 0 &&
              section.index === activeSectionIndex + 1 &&
              !attempt.sectionEndsAt;
            return (
              <button
                key={section.index}
                type="button"
                disabled={
                  activeSectionIndex >= 0 &&
                  !isActive &&
                  !canOpenNext
                }
                onClick={() => {
                  if (activeSectionIndex < 0) {
                    setSectionPreviewIndex(section.index);
                  } else if (canOpenNext) {
                    advanceSection(true);
                  }
                }}
                aria-current={isActive || isPreview ? "step" : undefined}
                className={`shrink-0 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  isActive || isPreview
                    ? "border-accent bg-accent/10 text-accent"
                    : isCompleted
                    ? "border-green-400/30 bg-green-400/5 text-green-200"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {section.name}
              </button>
            );
          })}
        </div>
        {activeSectionIndex >= 0 ? (
          <div
            aria-live="polite"
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 font-mono text-sm font-semibold ${
              sectionDeadline !== null && now >= sectionDeadline
                ? "border-red-400/30 text-red-300"
                : "border-white/10 text-yellow-200"
            }`}
          >
            <Timer className="size-4" aria-hidden="true" />
            {sectionDeadline
              ? `Section ${formatCountdown(sectionDeadline - now)}`
              : "No section timer"}
          </div>
        ) : null}
      </nav>

      {activeSectionIndex < 0 ? (
        <section className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-6 sm:p-10">
          <article className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
            <p className="text-sm uppercase tracking-wide text-accent">
              Section {sectionPreviewIndex + 1} of {sections.length}
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              {previewSection?.name}
            </h2>
            {previewSection?.timeLimitMinutes ? (
              <p className="mt-3 text-sm text-foreground/60">
                Time limit: {previewSection.timeLimitMinutes} minutes
              </p>
            ) : null}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-6">
              <Markdown>
                {previewSection?.description || "No section instructions provided."}
              </Markdown>
            </div>
            <Button
              type="button"
              className="mt-6 bg-accent text-background hover:bg-accent/90"
              onClick={enterFirstSection}
              disabled={!previewSection || sectionTransitionLock.current}
            >
              Enter {previewSection?.name || "section"}
            </Button>
          </article>
        </section>
      ) : (
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <nav
            aria-label="Section questions"
            className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r"
          >
            {currentSectionQuestions.map((item, index) => {
              const answer = answers[item.key];
              const isAnswered =
                answer?.selectedOptions?.length > 0 ||
                Boolean(answer?.submittedCode?.trim());
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  disabled={
                    Boolean(
                      questionTimers[item.key] &&
                        now >=
                          new Date(questionTimers[item.key].endsAt).getTime()
                    )
                  }
                  aria-current={activeIndex === index ? "step" : undefined}
                  className={`shrink-0 rounded-xl border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    activeIndex === index
                      ? "border-accent bg-accent/10 text-accent"
                      : isAnswered
                      ? "border-green-400/30 bg-green-400/5"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <span className="block text-sm text-foreground/50">
                    Question {index + 1}
                  </span>
                  <span className="mt-1 block max-w-56 truncate font-medium">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>

          <section className="min-h-0 overflow-y-auto p-5 sm:p-8">
            <div className="mx-auto mb-6 flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-accent">
                  {activeSection?.name}
                </p>
                <p className="text-sm text-foreground/60">
                  {currentSectionQuestions.length} questions in this section
                </p>
              </div>
            </div>

            {sectionTimeExpired ? (
              <div
                role="status"
                className="rounded-2xl border border-red-400/30 bg-red-400/10 p-6 text-center"
              >
                <h2 className="text-xl font-semibold text-red-200">
                  Section time is over
                </h2>
                <p className="mt-2 text-sm text-foreground/70">
                  This section is locked. The next section will open
                  automatically when the connection is available.
                </p>
              </div>
            ) : question ? (
              <article className="mx-auto flex max-w-5xl flex-col gap-6">
                <header className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-accent">
                      {activeSection?.name} · Question {activeIndex + 1}
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold">
                      {question.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {question.timeLimitSeconds > 0 ? (
                      <span
                        aria-live="polite"
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-sm font-semibold ${
                          questionTimeExpired
                            ? "border-red-400/30 text-red-300"
                            : "border-yellow-400/20 text-yellow-200"
                        }`}
                      >
                        <Timer className="size-4" aria-hidden="true" />
                        {currentQuestionDeadline === null
                          ? "Starting timer..."
                          : formatCountdown(
                              currentQuestionDeadline - now
                            )}
                      </span>
                    ) : null}
                    <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-foreground/70">
                      {question.point} points
                    </span>
                  </div>
                </header>
                {questionTimeExpired ? (
                  <p
                    role="status"
                    className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                  >
                    Time for this question has ended. Moving to the next question.
                  </p>
                ) : null}

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Markdown>{question.description}</Markdown>
                  {!isQuizQuestion ? (
                    <div className="mt-4 space-y-3 text-sm text-foreground/70">
                      {question.inputFormat ? (
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Input format
                          </h3>
                          <Markdown>{question.inputFormat}</Markdown>
                        </div>
                      ) : null}
                      {question.outputFormat ? (
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Output format
                          </h3>
                          <Markdown>{question.outputFormat}</Markdown>
                        </div>
                      ) : null}
                      {question.constraints ? (
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Constraints
                          </h3>
                          <Markdown>{question.constraints}</Markdown>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {question.questionSnippet ? (
                  <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-sm">
                    <code>{question.questionSnippet}</code>
                  </pre>
                ) : null}

                {isCodeAnswer ? (
                  <div className="flex flex-col gap-3">
                    {question.questionDomain === "CodingQuestion" ? (
                      <label className="flex flex-col gap-2">
                        <span className="font-semibold">Programming language</span>
                        <select
                          value={currentAnswer.language}
                          onChange={(event) =>
                            updateAnswer(question, {
                              language: event.target.value,
                            })
                          }
                          className="w-fit rounded-xl border border-white/10 bg-background px-4 py-2"
                        >
                          {question.allowedLanguages.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                    <label className="flex flex-col gap-2">
                      <span className="font-semibold">
                        Your answer
                        {question.codeLanguage
                          ? ` (${question.codeLanguage})`
                          : ""}
                      </span>
                      <CodeEditor
                        value={currentAnswer.submittedCode}
                        onChange={(submittedCode) =>
                          updateAnswer(question, { submittedCode })
                        }
                        language={
                          currentAnswer.language ||
                          question.codeLanguage ||
                          "javascript"
                        }
                        autoComplete={false}
                        readOnly={questionTimeExpired || questionTimerStarting}
                        height="420px"
                        className="w-full"
                      />
                    </label>
                  </div>
                ) : (
                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-2 text-lg font-semibold">
                      {isMultipleChoice
                        ? "Select all that apply"
                        : "Choose one answer"}
                    </legend>
                    {question.options.map((option, index) => {
                      const checked =
                        currentAnswer.selectedOptions.includes(option);
                      return (
                        <label
                          key={`${question.key}-option-${index}`}
                          className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                            checked
                              ? "border-accent bg-accent/10"
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <input
                            type={isMultipleChoice ? "checkbox" : "radio"}
                            name={question.key}
                            checked={checked}
                            disabled={questionTimeExpired || questionTimerStarting}
                            onChange={() => {
                              const selectedOptions = isMultipleChoice
                                ? checked
                                  ? currentAnswer.selectedOptions.filter(
                                      (item) => item !== option
                                    )
                                  : [...currentAnswer.selectedOptions, option]
                                : [option];
                              updateAnswer(question, { selectedOptions });
                            }}
                            className="mt-1 accent-accent"
                          />
                          <span>
                            <Markdown>{option}</Markdown>
                          </span>
                        </label>
                      );
                    })}
                  </fieldset>
                )}

                <div className="flex justify-between gap-4 border-t border-white/10 pt-5">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      activeIndex === 0 ||
                      questionTimeExpired ||
                      questionTimerStarting ||
                      Boolean(
                        questionTimers[
                          currentSectionQuestions[activeIndex - 1]?.key
                        ] &&
                          now >=
                            new Date(
                              questionTimers[
                                currentSectionQuestions[activeIndex - 1].key
                              ].endsAt
                            ).getTime()
                      )
                    }
                    onClick={() => setActiveIndex((index) => index - 1)}
                  >
                    Previous
                  </Button>
                  {isFinalQuestion ? (
                    <Button
                      type="button"
                      className="bg-green-600 text-white hover:bg-green-700"
                      onClick={() => setShowSubmitConfirmation(true)}
                      disabled={submitting}
                    >
                      Submit contest
                    </Button>
                  ) : isLastQuestionInSection ? (
                    <Button
                      type="button"
                      className={
                        attempt.sectionEndsAt
                          ? "bg-muted text-muted-foreground"
                          : "bg-sky-600 text-white hover:bg-sky-700"
                      }
                      onClick={() => advanceSection(true)}
                      disabled={
                        questionTimeExpired ||
                        questionTimerStarting ||
                        Boolean(attempt.sectionEndsAt) ||
                        sectionTransitionLock.current
                      }
                    >
                      {attempt.sectionEndsAt
                        ? "Next section when time ends"
                        : "Next section"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="bg-accent text-background hover:bg-accent/90"
                      onClick={() => setActiveIndex((index) => index + 1)}
                      disabled={
                        questionTimeExpired ||
                        questionTimerStarting ||
                        Boolean(
                          questionTimers[
                            currentSectionQuestions[activeIndex + 1]?.key
                          ] &&
                            now >=
                              new Date(
                                questionTimers[
                                  currentSectionQuestions[activeIndex + 1].key
                                ].endsAt
                              ).getTime()
                        )
                      }
                    >
                      Next question
                    </Button>
                  )}
                </div>
              </article>
            ) : (
              <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-foreground/70">
                  This section has no questions.
                </p>
                {activeSectionIndex < sections.length - 1 ? (
                  <Button
                    type="button"
                    className="w-fit bg-sky-600 text-white hover:bg-sky-700"
                    onClick={() => advanceSection(true)}
                  >
                    Next section
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="w-fit bg-green-600 text-white hover:bg-green-700"
                    onClick={() => setShowSubmitConfirmation(true)}
                  >
                    Submit contest
                  </Button>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      {showSubmitConfirmation ? (
        <div
          className="fixed inset-0 z-[110] grid place-items-center bg-black/80 p-4"
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-contest-title"
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-background p-6"
          >
            <h2 id="submit-contest-title" className="text-2xl font-semibold">
              Submit contest?
            </h2>
            <p className="mt-3 text-foreground/70">
              You answered {answeredCount} of {questions.length} questions.
              Submission is final. Your report will be available after the
              contest ends.
            </p>
            <p className="mt-2 text-sm text-foreground/50">
              {integrityEvents.length} browser integrity events recorded.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSubmitConfirmation(false)}
                disabled={submitting}
              >
                Keep working
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={submitAttempt}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Confirm submission"}
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
};

export default ContestAttempt;
