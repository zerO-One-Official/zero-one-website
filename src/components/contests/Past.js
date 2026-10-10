"use client";

import useScroll from "@/hooks/useScroll";
import { getEventHref } from "@/components/contests/eventUtils";
import { getMonthName } from "@/utils/helper";
import Link from "next/link";
import { useRef } from "react";

export const Past = ({ events }) => {
  const ref = useRef();

  useScroll(ref);

  return (
    <section
      ref={ref}
      className={`flex flex-col xl:flex-row flex-auto my-20 xl:my-40 fadeonscroll shadow-cus border border-white/5 p-6 rounded-3xl`}
    >
      <div className={`mt-10 xl:mt-0 pr-0 xl:pr-11 box-border w-full xl:w-2/5`}>
        <h2 className={`sticky top-36 text-5xl xl:text-6xl font-semibold`}>
          Past
        </h2>
      </div>
      {events.length ? (
        <div className="space-y-2 text-lg xl:text-2xl mb-7 xl:mb-10 mt-10 xl:mt-0 pl-0 xl:pl-11 box-border w-full xl:w-3/5 xl:mt-16">
          {events.map((event) => {
            const eventDate = new Date(event.startDate);
            return (
              <Link
                href={getEventHref(event)}
                key={event._id}
                className="group border-b border-white/10 hover:scale-105 transition-all rounded flex flex-1 flex-col sm:flex-row justify-between items-start sm:items-center p-4 w-full gap-2 xl:gap-6"
              >
                <h2 className="text-accent font-medium text-xl xl:text-3xl">
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
        <div className="flex items-center justify-center w-full xl:w-3/5 xl:mt-16">
          <h3 className="text-accent text-2xl font-light">No Past Events</h3>
        </div>
      )}
    </section>
  );
};
