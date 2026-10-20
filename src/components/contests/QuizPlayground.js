"use client";

import { checkQuizAnswer } from "@/action/quizQuestion";
import Button from "@/components/button/Button";
import ReadOnlyContestCode from "@/components/contests/ReadOnlyContestCode";
import {
  getDifficultyBadgeClassName,
  pointsBadgeClassName,
} from "@/components/contests/questionBadgeStyles";
import Markdown from "@/components/markdown/Markdown";
import { Badge } from "@/components/ui/badge";
import { languageConfigs } from "@/components/codeEditor/editorConfigs";
import LoginRequiredDialog from "@/components/auth/LoginRequiredDialog";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

const QuizPlayground = ({ question }) => {
  const pathname = usePathname();
  const { status: sessionStatus } = useSession();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [codeAnswer, setCodeAnswer] = useState(question.questionSnippet || "");
  const [answerResult, setAnswerResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const isCodeAnswer = question.answerType === "CODE";
  const isMultipleChoice = question.answerType === "MSQ";
  const languageName = question.codeLanguage
    ? languageConfigs[question.codeLanguage]?.name.split(" (")[0] ||
      question.codeLanguage.toUpperCase()
    : null;

  const toggleOption = (value) => {
    setAnswerResult(null);
    setSelectedOptions((previous) => {
      if (isMultipleChoice) {
        return previous.includes(value)
          ? previous.filter((option) => option !== value)
          : [...previous, value];
      }
      return [value];
    });
  };

  const submitAnswer = async (event) => {
    event.preventDefault();
    if (sessionStatus !== "authenticated") {
      setLoginDialogOpen(true);
      return;
    }
    setLoading(true);
    try {
      const result = await checkQuizAnswer(question.slug, {
        selectedOptions,
        codeAnswer,
      });
      setAnswerResult(result);
    } catch (error) {
      setAnswerResult({
        success: false,
        message: error.message || "Unable to check your answer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = isCodeAnswer
    ? Boolean(codeAnswer.trim())
    : selectedOptions.length > 0;

  return (
    <>
    <main className="container-70 flex min-h-screen flex-col gap-6 py-12">
      <header className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-white/5 p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm uppercase text-accent">
          <span>{question.questionType}</span>
          <span>·</span>
          <span>{question.answerType}</span>
          <span>·</span>
          <Badge
            variant="outline"
            className={`${getDifficultyBadgeClassName(question.difficulty)} uppercase`}
          >
            {question.difficulty?.toLowerCase()}
          </Badge>
          <Badge
            variant="outline"
            className={`${pointsBadgeClassName} capitalize`}
          >
            {question.point} points
          </Badge>
        </div>
        <h1 className="text-4xl font-semibold">{question.name}</h1>
        <div className="text-foreground/80">
          <Markdown>{question.description}</Markdown>
        </div>
      </header>

      {question.questionSnippet ? (
        <section className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-accent">
              {question.questionType === "DEBUGGING"
                ? "Code to debug"
                : "Code snippet"}
            </h2>
            {languageName && (
              <span className="rounded-md border border-white/10 bg-black/20 px-3 py-1 font-mono text-sm text-foreground/70">
                {languageName}
              </span>
            )}
          </div>
          <ReadOnlyContestCode
            value={question.questionSnippet}
            language={question.codeLanguage || "javascript"}
          />
        </section>
      ) : null}

      <form
        onSubmit={submitAnswer}
        className="flex flex-col gap-5 rounded-3xl border border-white/5 bg-white/5 p-6"
      >
        {isCodeAnswer ? (
          <label className="flex flex-col gap-3">
            <span className="text-xl font-semibold text-accent">
              Your answer ({question.codeLanguage})
            </span>
            <textarea
              value={codeAnswer}
              onChange={(event) => {
                setCodeAnswer(event.target.value);
                setAnswerResult(null);
              }}
              rows={14}
              spellCheck={false}
              className="w-full resize-y rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-sm outline-none focus:border-accent"
              aria-label="Your code answer"
            />
          </label>
        ) : (
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 text-xl font-semibold text-accent">
              {isMultipleChoice ? "Select all correct answers" : "Choose an answer"}
            </legend>
            {question.options.map((option, index) => {
              const selected = selectedOptions.includes(option.value);
              const checkedOptions =
                answerResult?.success && Array.isArray(answerResult.correctOptions);
              const isCorrectOption =
                checkedOptions && answerResult.correctOptions.includes(option.value);
              const isIncorrectSelection =
                checkedOptions && selected && !isCorrectOption;
              const inputId = `answer-option-${index}`;
              const optionStyle = isCorrectOption
                ? "border-green-400 bg-green-400/10"
                : isIncorrectSelection
                ? "border-red-400 bg-red-400/10"
                : selected
                ? "border-accent bg-accent/10"
                : "border-white/10 bg-black/20 hover:bg-white/5";

              return (
                <label
                  key={inputId}
                  htmlFor={inputId}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${optionStyle}`}
                >
                  <input
                    id={inputId}
                    type={isMultipleChoice ? "checkbox" : "radio"}
                    name="quiz-answer"
                    checked={selected}
                    onChange={() => toggleOption(option.value)}
                    className="mt-1 accent-accent"
                  />
                  <span className="text-foreground/90">
                    <Markdown>{option.value}</Markdown>
                  </span>
                </label>
              );
            })}
          </fieldset>
        )}

        {answerResult ? (
          <p
            role="status"
            className={
              answerResult.success && answerResult.correct
                ? "font-medium text-green-400"
                : "font-medium text-red-400"
            }
          >
            {answerResult.message}
          </p>
        ) : null}
        <Button
          type="submit"
          variant="filled"
          loading={loading}
          disabled={!canSubmit || loading}
          className="self-start"
        >
          Check Answer
        </Button>
      </form>
    </main>
    <LoginRequiredDialog
      open={loginDialogOpen}
      onOpenChange={setLoginDialogOpen}
      callbackUrl={pathname}
    />
    </>
  );
};

export default QuizPlayground;
