"use client";

import useScroll from "@/hooks/useScroll";
import { getMonthName } from "@/utils/helper";
import Link from "next/link";
import { useRef } from "react";

export const Past = ({ events }) => {
  const ref = useRef();

  useScroll(ref);

  return (
    <section
      ref={ref}
      className={`flex xl:flex-col flex-auto my-40 sm:my-20 fadeonscroll shadow-cus border border-white/5 p-6 rounded-3xl`}
    >
      <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
        <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>
          Past
        </h2>
      </div>
      {events.length ? (
        <div className="space-y-2 text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
          {events.map((event) => {
            const eventDate = new Date(event.startDate);
            return (
              <Link
                href={`/events/${event.slug}?type=${event.type}&tab=info`}
                key={event._id}
                className="group border-b border-white/10 hover:scale-105 transition-all rounded flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 "
              >
                <h2 className=" text-accent font-medium text-3xl sm:text-xl">
                  {event.name}
                </h2>
                <h2 className="flex gap-6 sm:gap-2">{`${eventDate.getDate()} ${getMonthName(
                  eventDate
                )} ${eventDate.getFullYear()}`}</h2>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-3/5 xl:w-full xl:mt-16">
          <h3 className="text-accent text-2xl font-light">No Past Events</h3>
        </div>
      )}
    </section>
  );
};
