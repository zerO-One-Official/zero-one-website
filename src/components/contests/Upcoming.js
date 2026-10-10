"use client";

import useScroll from "@/hooks/useScroll";
import { getEventHref } from "@/components/contests/eventUtils";
import { getDate, getTime } from "@/utils/helper";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Upcoming = ({ events }) => {
  const ref = useRef();
  const [timers, setTimers] = useState({});

  useScroll(ref);

  useEffect(() => {
    const updateTimers = () => {
      const now = Date.now();
      setTimers(
        Object.fromEntries(
          events.map((event) => [
            event._id,
            Math.max(0, new Date(event.startDate).getTime() - now),
          ])
        )
      );
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [events]);

  const formatCountdown = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days ? `${days}d ` : ""}${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <section
      ref={ref}
      className={`flex flex-col xl:flex-row flex-auto mt-20 xl:mt-40 fadeonscroll shadow-cus border border-white/5 p-6 rounded-3xl`}
    >
      <div className={`mt-10 xl:mt-0 pr-0 xl:pr-11 box-border w-full xl:w-2/5`}>
        <h2 className={`sticky top-36 text-5xl xl:text-6xl font-semibold`}>
          Upcoming
        </h2>
      </div>

      {events.length ? (
        <div className="text-lg xl:text-2xl mb-7 xl:mb-10 mt-10 xl:mt-0 pl-0 xl:pl-11 box-border w-full xl:w-3/5 xl:mt-16">
          {events.map((event) => {
            const eventDate = new Date(event.startDate);
            return (
              <Link
                href={getEventHref(event)}
                key={event._id}
                className="group border-b border-white/5 hover:scale-105 transition-all rounded flex flex-1 flex-col sm:flex-row justify-between items-start sm:items-center p-4 w-full gap-2 xl:gap-6 flex-wrap"
              >
                <h2 className="text-accent font-medium text-xl xl:text-3xl">
                  {event.name}
                </h2>
                <h2 className="flex gap-2 sm:gap-6 flex-wrap">
                  <span>{getDate(eventDate)} </span>
                  <span>{`${getTime(eventDate)}`}</span>
                  <span className="text-accent">
                    Starts in{" "}
                    {timers[event._id] === undefined
                      ? "--:--:--"
                      : formatCountdown(timers[event._id])}
                  </span>
                </h2>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full xl:w-3/5 xl:mt-16">
          <h3 className="text-accent text-2xl font-light">
            No Upcoming Events
          </h3>
        </div>
      )}
    </section>
  );
};
