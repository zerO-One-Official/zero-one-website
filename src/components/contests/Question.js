import Link from "next/link";
import Markdown from "@/components/markdown/Markdown";
import { Badge } from "@/components/ui/badge";

const difficultyStyles = {
  easy: "border-green-400/30 bg-green-400/10 text-green-300",
  medium: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  hard: "border-red-400/30 bg-red-400/10 text-red-300",
  basic: "border-blue-400/30 bg-blue-400/10 text-blue-300",
  expert: "border-purple-400/30 bg-purple-400/10 text-purple-300",
};

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
    ? `/playground/quiz/${question.slug}`
    : `/playground/coding/${question.slug}`;
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
              className={
                difficultyStyles[difficulty] ||
                "border-white/15 bg-white/5 text-foreground/70"
              }
            >
              {difficulty}
            </Badge>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60">
        {question.point ? <span>{question.point} points</span> : null}
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
