"use client";

import useScroll from "@/hooks/useScroll";
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

          const hours = Math.max(
            0,
            Math.floor(timeRemaining / (60 * 60 * 1000))
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
            [event._id]: { hours, minutes, seconds },
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
      className="flex xl:flex-col flex-auto mt-40 sm:mt-20 fadeonscroll shadow-cus border border-white/5 p-6 rounded-3xl"
    >
      <div className="mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full">
        <h2 className="sticky top-36 text-6xl sm:text-5xl font-semibold">
          Ongoing
        </h2>
      </div>

      <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
        {events.map((event) => {
          const time = timers[event._id] || {
            hours: "00",
            minutes: "00",
            seconds: "00",
          };

          return (
            <Link
              href={`/events/${event.slug}?type=${event.type}&tab=info`}
              key={event._id}
              className="flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2"
            >
              <h2 className="text-accent font-semibold text-4xl sm:text-xl">
                {event.name}
              </h2>
              <h2 className="flex gap-6 sm:gap-2">
                {String(time.hours).padStart(2, "0")}:
                {String(time.minutes).padStart(2, "0")}:
                {String(time.seconds).padStart(2, "0")}
              </h2>
            </Link>
          );
        })}
      </div>
    </section>
  ) : null;
};
