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
    <main className="mt-10 mb-8 sm:my-8 px-20 2xl:px-10 xl:px-8 sm:px-6 xs:px-3">
      <section className="flex flex-col gap-10 items-center">
        <Trophy className="text-accent size-36" />
        <h2 className={`text-6xl sm:text-5xl font-semibold`}>
          ZERO ONE Events
        </h2>
        <div
          className={`mb-10 sm:mb-7 sm:text-lg box-border w-3/5 xl:w-full xl:pl-0 text-center`}
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
