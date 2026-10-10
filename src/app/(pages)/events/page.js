import { OnGoingEvent } from "@/components/contests/Ongoing";
import { Upcoming } from "@/components/contests/Upcoming";
import { Past } from "@/components/contests/Past";
import { splitEventsByStatus } from "@/components/contests/eventUtils";
import { getEvents } from "@/action/events";
import { Trophy } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Events() {
  const { events = [] } = await getEvents();
  const { ongoing, upcoming, past } = splitEventsByStatus(events);

  return (
    <main className="mt-10 mb-8 px-3 xs:px-4 sm:px-6 xl:px-8 2xl:px-10 3xl:px-20">
      <section className="flex flex-col gap-10 items-center">
        <Trophy className="text-accent size-36" />
        <h2 className={`text-5xl xl:text-6xl font-semibold`}>
          ZERO ONE Events
        </h2>
        <div
          className={`mb-7 xl:mb-10 text-lg box-border w-full xl:w-3/5 text-center`}
        >
          Zero One Coding Club hosts fun events like workshops, hackathons, and
          contests. These help us learn and have a good time. We get to improve
          our coding skills, be creative in hackathons, and enjoy friendly
          contests. It&apos;s a cool place for both beginners and coding fans!
        </div>
      </section>
      <section className="flex flex-col">
        {ongoing.length ? <OnGoingEvent events={ongoing} /> : null}
        {upcoming.length ? <Upcoming events={upcoming} /> : null}
        {past.length ? <Past events={past} /> : null}
        {!events.length ? (
          <p className="py-16 text-center text-xl text-foreground/60">
            No events are scheduled right now.
          </p>
        ) : null}
      </section>
    </main>
  );
}
