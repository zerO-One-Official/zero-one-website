import { getContestAttemptReport } from "@/action/contestAttempt";
import Markdown from "@/components/markdown/Markdown";
import ReadOnlyContestCode from "@/components/contests/ReadOnlyContestCode";

export const dynamic = "force-dynamic";

const formatDateTime = (value) =>
  new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const ContestAttemptReportPage = async ({ params }) => {
  const { slug } = await params;
  const result = await getContestAttemptReport(slug);

  if (!result.success) {
    return (
      <main className="container-70 flex min-h-screen items-center justify-center py-16">
        <section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="text-3xl font-semibold text-accent">
            Contest report unavailable
          </h1>
          <p className="mt-3 text-foreground/70">{result.message}</p>
        </section>
      </main>
    );
  }

  const { report } = result;

  return (
    <main className="container-70 flex min-h-screen flex-col gap-6 py-16">
      <header className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-4xl font-semibold text-accent">
          {report.contestName} report
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-foreground/70">
          <p>
            {report.pendingValidationCount
              ? "Validated score so far: "
              : "Score: "}
            <span className="font-semibold text-foreground">
              {report.score} / {report.maxScore}
            </span>
          </p>
          <p>Started: {formatDateTime(report.startedAt)}</p>
          <p>Submitted: {formatDateTime(report.submittedAt)}</p>
        </div>
        <p className="mt-3 text-sm text-foreground/60">
          After the contest is over, review your submitted answers, correct
          multiple-choice options, and final score here.
        </p>
        {report.pendingValidationCount ? (
          <p
            role="status"
            className="mt-3 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-sm text-yellow-100"
          >
            {report.pendingValidationCount} coding answer
            {report.pendingValidationCount === 1 ? " is" : "s are"} not
            validated yet. We&apos;ll retry the next time you open this report.
          </p>
        ) : null}
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Question report</h2>
        {report.questions.map((question, index) => (
          <article
            key={question.key}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-accent">
                  {question.sectionName} · Question {index + 1}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{question.name}</h3>
              </div>
              {question.gradingStatus === "PENDING" ? (
                <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-100">
                  Not validated yet
                </span>
              ) : (
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm">
                  {question.pointsAwarded} / {question.point} points
                </span>
              )}
            </header>
            <div className="text-foreground/80">
              <Markdown>{question.description}</Markdown>
            </div>
            {question.options.length && question.answerType !== "CODE" ? (
              <div className="flex flex-col gap-3">
                <h4 className="font-semibold">Answer choices</h4>
                {question.options.map((option, optionIndex) => {
                  const isCorrect = question.correctOptions.includes(option);
                  const isSelected = question.selectedOptions.includes(option);
                  const isWrongSelection = isSelected && !isCorrect;
                  return (
                    <div
                      key={`${question.key}-option-${optionIndex}`}
                      className={`flex flex-wrap items-start justify-between gap-3 rounded-2xl border p-4 ${
                        isCorrect
                          ? "border-green-400/40 bg-green-400/10"
                          : isWrongSelection
                          ? "border-red-400/40 bg-red-400/10"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <div className="flex-1">
                        <Markdown>{option}</Markdown>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        {isCorrect ? (
                          <span className="rounded-full bg-green-400/15 px-3 py-1 text-green-300">
                            Correct answer
                          </span>
                        ) : null}
                        {isSelected ? (
                          <span
                            className={`rounded-full px-3 py-1 ${
                              isWrongSelection
                                ? "bg-red-400/15 text-red-300"
                                : "bg-blue-400/15 text-blue-300"
                            }`}
                          >
                            {isWrongSelection ? "Your wrong selection" : "Your selection"}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
                {!question.attempted ? (
                  <p className="text-sm text-foreground/60">No answer submitted.</p>
                ) : null}
              </div>
            ) : question.attempted ? (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <h4 className="mb-3 font-semibold">
                  Submitted answer ({question.language || question.codeLanguage || "code"})
                </h4>
                <ReadOnlyContestCode
                  value={question.submittedCode}
                  language={
                    question.language || question.codeLanguage || "javascript"
                  }
                />
              </div>
            ) : (
              <p className="rounded-2xl border border-white/10 bg-black/20 p-4 text-foreground/60">
                Not attempted
              </p>
            )}
          </article>
        ))}
      </section>
    </main>
  );
};

export default ContestAttemptReportPage;
