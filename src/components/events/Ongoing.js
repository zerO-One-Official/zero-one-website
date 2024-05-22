'use client'

import useScroll from "@/hooks/useScroll";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const OnGoingEvent = ({ events: ev }) => {

    const events = JSON.parse(ev)
    const ref = useRef();

    useScroll(ref);

    const [timers, setTimers] = useState([]);
    const [remainingTime, setRemainingTime] = useState({
        hours: "",
        minutes: "",
        seconds: "",
    });

    const currentDate = new Date();
    useEffect(() => {
        // Clear existing timers
        timers.forEach((timer) => clearInterval(timer));

        // Create new timers for ongoing events
        const newTimers = events
            ?.map((event) => {
                const eventStartDate = new Date(event.date);
                const eventEndDate = new Date(
                    eventStartDate.getTime() + event.duration * 60 * 60 * 1000
                );

                // Calculate remaining time only if the event hasn't ended
                if (eventEndDate > currentDate) {
                    return setInterval(() => {
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

                        setRemainingTime({ hours, minutes, seconds });
                    }, 1000);
                } else {
                    return null; // Return null for ended events
                }
            })
            .filter((timer) => timer !== null); // Filter out null timers

        // Set the new timers in state
        setTimers(newTimers);

        // Clear the timers when the component unmounts
        return () => {
            newTimers.forEach((timer) => clearInterval(timer));
        };
    }, [events]);

    const onGoingEvents =
        events &&
        events.filter((event) => {
            const eventStartDate = new Date(event.date);
            const eventEndDate = new Date(
                eventStartDate.getTime() + event.duration * 60 * 60 * 1000
            );

            return eventStartDate <= currentDate && currentDate <= eventEndDate;
        });

    return onGoingEvents.length ? (
        <section
            ref={ref}
            className={`flex xl:flex-col flex-auto mt-40 sm:mt-20 fadeonscroll shadow-cus border border-white/5 p-6 rounded-3xl`}
        >
            <div className={`mt-0 sm:mt-10 pr-11 box-border w-2/5 xl:w-full`}>
                <h2 className={`sticky top-36 text-6xl sm:text-5xl font-semibold`}>
                    Ongoing
                </h2>
            </div>

            <div className="text-2xl mb-10 sm:mb-7 xl:mt-16 sm:text-lg mt-0 sm:mt-10 pl-11 box-border w-3/5 xl:w-full xl:pl-0">
                {onGoingEvents.map((event) => (
                    <Link
                        href={`/events/${event.name}?tab=info`}
                        key={event._id}
                        className="flex flex-1 justify-between items-center p-4 w-full gap-6 sm:gap-2 "
                    >
                        <h2 className=" text-accent font-semibold text-4xl sm:text-xl">
                            {event.name}
                        </h2>
                        <h2 className="flex gap-6 sm:gap-2">
                            {remainingTime.hours}:{remainingTime.minutes}:
                            {remainingTime.seconds}
                        </h2>
                    </Link>
                ))}
            </div>
        </section>
    ) : null;
};
