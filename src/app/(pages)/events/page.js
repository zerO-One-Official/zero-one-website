import { OnGoingEvent } from "@/components/events/Ongoing";
import { Upcoming } from "@/components/events/Upcoming";
import { Past } from "@/components/events/Past";
import { getContests } from "@/action/contest";

export default async function Events() {
  const contests = await getContests();

  return (
    <div className="container-70">
      <section className={`flex xl:flex-col flex-auto my-40 sm:my-20`}>
        <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
          <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>
            Events
          </h2>
        </div>
        <div
          className={`text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0`}
        >
          Zero One Coding Club hosts fun events like workshops, hackathons, and
          contests. These help us learn and have a good time. We get to improve
          our coding skills, be creative in hackathons, and enjoy friendly
          contests. It&apos;s a cool place for both beginners and coding fans!
        </div>
      </section>
      <div className="flex flex-col gap-10">
        {/* <OnGoingEvent events={contests} />
        <Upcoming events={contests} />
        <Past events={contests} /> */}
      </div>
    </div>
  );
}
