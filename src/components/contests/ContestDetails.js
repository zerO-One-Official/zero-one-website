import { InfoTab } from "@/components/contests/InfoTab";
import ContestTabs from "@/components/contests/ContestTabs";
import { Participant } from "@/components/contests/Participants";
import { Question } from "@/components/contests/Question";
import ContestRegistration from "@/components/contests/ContestRegistration";
import Markdown from "@/components/markdown/Markdown";
import { getDate, getTime } from "@/utils/helper";
import Link from "next/link";

const formatDuration = (milliseconds) => {
  if (milliseconds == null) return "—";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [
    hours ? `${hours}h` : null,
    minutes ? `${minutes}m` : null,
    `${seconds}s`,
  ]
    .filter(Boolean)
    .join(" ");
};

const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

const ContestDetails = ({ contest, attemptSummaryResult }) => {
  const infoEvent = {
    ...contest,
    desc: contest.description,
    date: contest.startDate,
    duration: contest.durationMinutes,
  };
  const participants = contest.participants || [];
  const winnerRanks = new Map(
    (contest.winners || []).map((winner) => [
      String(
        typeof winner.user === "object" ? winner.user?._id : winner.user
      ),
      winner.rank,
    ])
  );
  const registrationOpen =
    contest.status === "LIVE" &&
    new Date(contest.lastRegistrationDate).getTime() > Date.now() &&
    new Date(contest.startDate).getTime() > Date.now();
  const attemptSummary = attemptSummaryResult?.attempt;

  const details = (
    <div className="flex flex-col gap-6">
      <InfoTab event={infoEvent} />
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/5 bg-white/5 p-5">
        <span className="font-semibold">
          Status:{" "}
          <span className="text-accent capitalize">
            {contest.status?.toLowerCase()}
          </span>
        </span>
        {contest.lastRegistrationDate ? (
          <span className="text-foreground/80">
            Registration closes {getDate(contest.lastRegistrationDate)} at{" "}
            {getTime(contest.lastRegistrationDate)}
          </span>
        ) : null}
      </div>
      {contest.prizes ? (
        <section className="flex flex-col gap-3 rounded-3xl border border-white/5 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-accent">Prizes</h2>
          <Markdown>{contest.prizes}</Markdown>
        </section>
      ) : null}
      {attemptSummaryResult?.success === false ? (
        <section
          role="status"
          className="rounded-3xl border border-red-400/20 bg-red-400/5 p-5 text-sm text-red-200"
        >
          Your attempt summary could not be loaded:{" "}
          {attemptSummaryResult.message}
        </section>
      ) : null}
      {attemptSummary ? (
        <section className="flex flex-col gap-4 rounded-3xl border border-accent/20 bg-accent/5 p-6">
          <div>
            <h2 className="text-2xl font-semibold text-accent">
              My contest report
            </h2>
            <p className="mt-1 text-sm text-foreground/65">
              {attemptSummary.reportReady
                ? "Your overall result and attempt summary."
                : attemptSummary.status === "SUBMITTED"
                ? "Your submission is saved. The report will be available after the contest ends."
                : "Your contest attempt is in progress."}
            </p>
          </div>

          {attemptSummary.reportReady ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-foreground/60">
                    {attemptSummary.pendingValidationCount
                      ? "Validated score so far"
                      : "Score"}
                  </p>
                  <p className="mt-1 text-xl font-semibold">
                    {attemptSummary.score} / {attemptSummary.maxScore}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-foreground/60">Questions answered</p>
                  <p className="mt-1 text-xl font-semibold">
                    {attemptSummary.answeredCount} / {attemptSummary.totalQuestions}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-sm text-foreground/60">Time taken</p>
                  <p className="mt-1 text-xl font-semibold">
                    {formatDuration(attemptSummary.timeTakenMs)}
                  </p>
                </div>
              </div>
              {attemptSummary.pendingValidationCount ? (
                <p
                  role="status"
                  className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-sm text-yellow-100"
                >
                  {attemptSummary.pendingValidationCount} coding answer
                  {attemptSummary.pendingValidationCount === 1 ? " is" : "s are"}{" "}
                  not validated yet. We&apos;ll retry when you view the report.
                </p>
              ) : null}
              <p className="text-sm text-foreground/60">
                Submitted {formatDateTime(attemptSummary.submittedAt)}
              </p>
              <Link
                href={`/contest/${contest.slug}/my-report`}
                className="w-fit rounded-full bg-accent px-5 py-3 font-semibold text-background transition-colors hover:bg-accent/90"
              >
                Show details
              </Link>
            </>
          ) : attemptSummary.status === "IN_PROGRESS" &&
            attemptSummary.canResume ? (
            <Link
              href={`/contest/${contest.slug}/attempt`}
              className="w-fit rounded-full border border-accent/40 px-5 py-3 font-semibold text-accent hover:bg-accent/10"
            >
              Resume attempt
            </Link>
          ) : (
            <p className="text-sm text-foreground/65">
              This attempt has no final report available.
            </p>
          )}
        </section>
      ) : null}
    </div>
  );

  const questions = (
    <section className="flex flex-col gap-6">
      {contest.sections?.length ? (
        contest.sections.map((section, sectionIndex) => (
          <article
            key={`${section.name}-${sectionIndex}`}
            className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-6"
          >
            <div>
              <h2 className="text-2xl font-semibold text-accent">
                {section.name}
              </h2>
              {section.description ? (
                <div className="mt-2 text-foreground/75">
                  <Markdown>{section.description}</Markdown>
                </div>
              ) : null}
              {section.timeLimitMinutes ? (
                <p className="mt-2 text-sm text-foreground/60">
                  Section time limit: {section.timeLimitMinutes} minutes
                </p>
              ) : null}
            </div>

            {section.questions?.length ? (
              <ol className="flex flex-col divide-y divide-white/10">
                {section.questions.map((entry, questionIndex) => {
                  const question =
                    typeof entry.question === "object" ? entry.question : null;

                  return (
                    <li
                      key={`${question?._id || questionIndex}-${questionIndex}`}
                      className="py-2"
                    >
                      {question ? (
                        <Question
                          question={question}
                          questionDomain={entry.questionDomain}
                          contestSlug={contest.slug}
                          isContestCompleted={
                            contest.status?.toUpperCase() === "COMPLETED"
                          }
                          timeLimitSeconds={entry.timeLimitSeconds}
                        />
                      ) : (
                        <p className="p-4 text-foreground/60">
                          Question unavailable
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="text-foreground/60">No questions listed.</p>
            )}
          </article>
        ))
      ) : (
        <p className="rounded-3xl border border-white/5 bg-white/5 p-6 text-foreground/60">
          No contest questions are available.
        </p>
      )}
    </section>
  );

  const winnersContent = participants.length ? (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-semibold text-accent">
        Winners &amp; Participants
      </h2>
      <ol className="flex flex-col gap-3">
        {participants.map((participant, index) => {
          const user =
            typeof participant.user === "object" ? participant.user : null;
          const userId = String(
            user?._id || participant.user || ""
          );
          const rank = winnerRanks.get(userId);

          return (
            <Participant
              key={`${user?._id || index}-${index}`}
              participant={
                user
                  ? { ...user, teamName: participant.teamName }
                  : { firstName: "Participant", teamName: participant.teamName }
              }
              rank={rank}
              isWinner={rank != null}
              showParticipantStatus
              registeredAt={participant.registeredAt}
            />
          );
        })}
      </ol>
    </section>
  ) : (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-10 text-center">
      <h2 className="text-2xl font-semibold text-accent">
        Participants will appear here
      </h2>
      <p className="mt-2 text-foreground/60">
        There are no registered participants yet.
      </p>
    </div>
  );

  return (
    <main className="container-70 flex min-h-screen flex-col gap-8 pt-16 pb-20">
      <ContestRegistration
        contestSlug={contest.slug}
        status={contest.status}
        registrationOpen={registrationOpen}
        lastRegistrationDate={contest.lastRegistrationDate}
        participants={participants}
      />
      <ContestTabs
        details={details}
        questions={questions}
        winners={winnersContent}
      />
    </main>
  );
};

export default ContestDetails;
