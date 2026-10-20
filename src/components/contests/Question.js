import Link from "next/link";
import Markdown from "@/components/markdown/Markdown";
import { Badge } from "@/components/ui/badge";
import {
  getDifficultyBadgeClassName,
  pointsBadgeClassName,
} from "@/components/contests/questionBadgeStyles";

export const Question = ({
  question,
  questionDomain,
  contestSlug,
  isContestCompleted = false,
  timeLimitSeconds,
}) => {
  if (!question?.slug) return null;

  const isQuizQuestion =
    questionDomain === "QuizQuestion" ||
    question?.answerType ||
    ["OBJECTIVE", "DEBUGGING"].includes(question?.questionType);
  const playgroundUrl = contestSlug && !isContestCompleted
    ? `/contest/${contestSlug}/attempt`
    : isQuizQuestion
    ? `/practice/quiz/${question.slug}`
    : `/practice/coding/${question.slug}`;
  const difficulty = question.difficulty?.toLowerCase();
  const typeLabel = isQuizQuestion
    ? question.questionType || "Quiz"
    : "Coding";

  return (
    <Link
      href={playgroundUrl}
      className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 transition-colors hover:border-accent/30 hover:bg-white/10"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
          {question.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={
              isQuizQuestion
                ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                : "border-violet-400/30 bg-violet-400/10 text-violet-300"
            }
          >
            {typeLabel}
          </Badge>
          {isQuizQuestion && question.answerType ? (
            <Badge
              variant="outline"
              className="border-sky-400/30 bg-sky-400/10 text-sky-300"
            >
              {question.answerType}
            </Badge>
          ) : null}
          {difficulty ? (
            <Badge
              variant="outline"
              className={getDifficultyBadgeClassName(difficulty)}
            >
              {difficulty}
            </Badge>
          ) : null}
          {question.point != null ? (
            <Badge
              variant="outline"
              className={`${pointsBadgeClassName} normal-case`}
            >
              {question.point} points
            </Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60">
        {timeLimitSeconds ? <span>{timeLimitSeconds} seconds</span> : null}
      </div>
      {question.description || question.desc ? (
        <div className="line-clamp-3 text-foreground/80">
          <Markdown>{question.description || question.desc}</Markdown>
        </div>
      ) : null}
    </Link>
  );
};
