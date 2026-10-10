"use client";

import useScroll from "@/hooks/useScroll";
import { getEventHref } from "@/components/contests/eventUtils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const OnGoingEvent = ({ events }) => {
  const ref = useRef();
  useScroll(ref);

  const [timers, setTimers] = useState({});
  const intervalRefs = useRef({});

  useEffect(() => {
    // Clear previous intervals
    Object.values(intervalRefs.current).forEach(clearInterval);
    intervalRefs.current = {};

    const now = new Date();

    events?.forEach((event) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(
        eventStartDate.getTime() + event.durationMinutes * 60 * 1000
      );

      if (eventEndDate > now) {
        const updateTimer = () => {
          const timeRemaining = eventEndDate - new Date();

          const days = Math.max(0, Math.floor(timeRemaining / (24 * 60 * 60 * 1000)));
          const hours = Math.max(
            0,
            Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
          );
          const minutes = Math.max(
            0,
            Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000))
          );
          const seconds = Math.max(
            0,
            Math.floor((timeRemaining % (60 * 1000)) / 1000)
          );

          setTimers((prev) => ({
            ...prev,
            [event._id]: { days, hours, minutes, seconds },
          }));
        };

        updateTimer(); // Initialize immediately
        intervalRefs.current[event._id] = setInterval(updateTimer, 1000);
      }
    });

    return () => {
      // Cleanup all intervals on unmount
      Object.values(intervalRefs.current).forEach(clearInterval);
    };
  }, [events]);

  return events.length ? (
    <section
      ref={ref}
      className="flex flex-col xl:flex-row flex-auto mt-20 xl:mt-40 fadeonscroll shadow-cus border border-white/5 p-6 rounded-3xl"
    >
      <div className="mt-10 xl:mt-0 pr-0 xl:pr-11 box-border w-full xl:w-2/5">
        <h2 className="sticky top-36 text-5xl xl:text-6xl font-semibold">
          Ongoing
        </h2>
      </div>

      <div className="text-lg xl:text-2xl mb-7 xl:mb-10 mt-10 xl:mt-0 pl-0 xl:pl-11 box-border w-full xl:w-3/5 xl:mt-16">
        {events.map((event) => {
          const time = timers[event._id] || {
            days: 0,
            hours: "00",
            minutes: "00",
            seconds: "00",
          };
          const eventEndDate = new Date(
            new Date(event.startDate).getTime() +
              Number(event.durationMinutes) * 60 * 1000
          );
          const isLive = event.status?.toUpperCase() === "LIVE";
          const hasTimeRemaining =
            Number.isFinite(eventEndDate.getTime()) &&
            eventEndDate.getTime() > Date.now();

          return (
            <Link
              href={getEventHref(event)}
              key={event._id}
              className="flex flex-1 flex-col sm:flex-row justify-between items-start sm:items-center p-4 w-full gap-2 xl:gap-6 rounded-2xl transition-colors hover:bg-white/5"
            >
              <h2 className="text-accent font-semibold text-xl xl:text-4xl">
                {event.name}
              </h2>
              <div className="flex flex-wrap items-center justify-end gap-3">
                {isLive ? (
                  <Badge className="border-red-400/30 bg-red-400/10 text-red-300">
                    LIVE
                  </Badge>
                ) : null}
                <span className="flex gap-1 sm:gap-2">
                  {hasTimeRemaining ? (
                    <>
                      <span>Ending in</span>
                      {time.days ? `${time.days}d ` : ""}
                      {String(time.hours).padStart(2, "0")}:
                      {String(time.minutes).padStart(2, "0")}:
                      {String(time.seconds).padStart(2, "0")}
                    </>
                  ) : isLive ? (
                    "Marked live by admin"
                  ) : null}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  ) : null;
};
