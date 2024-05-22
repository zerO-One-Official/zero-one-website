'use client'

import Image from "next/image";
import { getMonthName, getTime } from "@/utils/helper";

export
  const InfoTab = ({ event: ev }) => {

    const event = JSON.parse(ev)

    const date = new Date(event?.date);
    const day = date.getDate();
    const month = getMonthName(date);
    const year = date.getFullYear();
    const time = getTime(date);

    return (
      <div className="flex flex-col w-full gap-4">
        <a href={event.link} className="hover:underline text-accent">
          <h1 className="text-4xl font-semibold text-center w-full text-accent">
            {event.name}
          </h1>
        </a>
        <div className="flex gap-4 justify-center text-xl">
          <span>{`${day} ${month} ${year}`}</span>
          <span>{`${time}`}</span>
        </div>
        <div className="flex gap-4 justify-center text-xl">
          Venue: {event.venue}
        </div>
        {event.gallery.length ? (
          <div className="flex flex-col gap-4">
            <h2>Memories</h2>
            <div className="grid grid-cols-[repeat(auto-fit,300px,1fr)]">
              {event.gallery.map((img, index) => {
                return (
                  <Image
                    key={index}
                    src={img}
                    width={300}
                    height={300}
                    quality={100}
                    alt={`${eventName}`}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  };