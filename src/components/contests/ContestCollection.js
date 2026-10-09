import { OnGoingEvent } from "@/components/contests/Ongoing";
import { Past } from "@/components/contests/Past";
import { Upcoming } from "@/components/contests/Upcoming";
import {
  getEventHref,
  splitEventsByStatus,
} from "@/components/contests/eventUtils";
import { Badge } from "@/components/ui/badge";
import { getDate, getTime } from "@/utils/helper";
import Link from "next/link";

const ContestCollection = ({
  contests,
  emptyMessage,
  isMyContests = false,
}) => {
  const eventGroups = isMyContests
    ? null
    : splitEventsByStatus(
        contests.map((contest) => ({ ...contest, type: "contest" }))
      );

  return (
    <main className="container-70 flex flex-col gap-8 min-h-screen pt-16 pb-20">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-5xl sm:text-4xl font-semibold text-accent">
          {isMyContests ? "My Contests" : "Contests"}
        </h1>
        <p className="text-foreground/70">
          {isMyContests
            ? "All contests you have registered for, together in one place."
            : "Browse upcoming challenges, follow live contests, and revisit past events."}
        </p>
      </div>

      {contests.length ? (
        isMyContests ? (
          <section className="flex flex-col gap-3">
            {contests.map((contest) => (
              <Link
                key={contest.slug}
                href={getEventHref({ ...contest, type: "contest" })}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-accent/40 hover:bg-white/10"
              >
                <div>
                  <h2 className="text-xl font-semibold text-accent">
                    {contest.name}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/60">
                    {getDate(contest.startDate)} · {getTime(contest.startDate)}
                    {" · "}
                    {contest.durationMinutes} minutes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {contest.status?.toLowerCase()}
                  </Badge>
                  {contest.attempt?.status === "SUBMITTED" ? (
                    <Badge variant="secondary">Attempt submitted</Badge>
                  ) : contest.attempt?.status === "IN_PROGRESS" ? (
                    <Badge variant="secondary">Attempt in progress</Badge>
                  ) : null}
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="flex flex-col">
            {eventGroups?.ongoing.length ? (
              <OnGoingEvent events={eventGroups.ongoing} />
            ) : null}
            {eventGroups?.upcoming.length ? (
              <Upcoming events={eventGroups.upcoming} />
            ) : null}
            {eventGroups?.past.length ? <Past events={eventGroups.past} /> : null}
          </div>
        )
      ) : (
        <div className="rounded-3xl border border-white/5 bg-white/5 p-10 text-center text-lg text-foreground/70">
          {emptyMessage}
        </div>
      )}
    </main>
  );
};

export default ContestCollection;
