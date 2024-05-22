'use client'

import useScroll from "@/hooks/useScroll";
import { getMonthName, getTime } from "@/utils/helper";
import Link from "next/link";
import { useRef } from "react";

export const Upcoming = ({ events: ev }) => {
  const events = JSON.parse(ev)
  const ref = useRef();

  useScroll(ref);

  const currentDate = new Date();

  const upcomingEvents =
    events && events?.filter((event) => new Date(event.date) > currentDate);

  return (
    <section
      ref={ref}
      className={`flex xl:flex-col flex-auto mt-40 sm:mt-20 fadeonscroll shadow-cus border border-white/5 p-6 rounded-3xl`}
    >
      <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
        <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>
          Upcoming
        </h2>
      </div>

      {upcomingEvents.length ? (
        <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
          {upcomingEvents.map((event) => {
            const eventDate = new Date(event.date);
            return (
              <Link
                href={`/events/${event.name}?tab=info`}
                key={event._id}
                className="group border-b border-white/5 hover:scale-105 transition-all rounded flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 "
              >
                <h2 className=" text-accent font-medium text-3xl sm:text-xl">
                  {event.name}
                </h2>
                <h2 className="flex gap-6 sm:gap-2">
                  <span>
                    {`${eventDate.getDate()} ${getMonthName(
                      eventDate
                    )} ${eventDate.getFullYear()}`}
                  </span>
                  <span>{`${getTime(eventDate)}`}</span>
                </h2>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-3/5 xl:w-full xl:mt-16">
          <h3 className="text-accent text-2xl font-light">
            No Upcoming Events
          </h3>
        </div>
      )}
    </section>
  );
};
