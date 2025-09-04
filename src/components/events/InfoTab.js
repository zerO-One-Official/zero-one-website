"use client";

import { getDate, getMonthName, getTime } from "@/utils/helper";
import Markdown from "../markdown/Markdown";
import { MapPin, NotebookText } from "lucide-react";

export const InfoTab = ({ event }) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-4xl font-semibold text-center w-full text-accent p-4">
        {event.name}
      </h1>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold flex items-center gap-2 text-accent">
          <NotebookText className="h-6 w-6 stroke-accent" />
          Description
        </h3>
        <div className="p-4 bg-white/5 border border-white/5 shadow-cus rounded-3xl ">
          <Markdown>{event?.desc || ""}</Markdown>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold flex items-center gap-2 text-accent">
          <MapPin className="h-6 w-6 stroke-accent" />
          Location Venue
        </h3>

        <div className="p-4 bg-white/5 border border-white/5 shadow-cus rounded-3xl ">
          <Markdown>{event.venue}</Markdown>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 items-center gap-4">
        <div className="flex-1 h-full flex flex-col gap-4 p-4 bg-white/5 border border-white/5 shadow-cus rounded-3xl ">
          <h3 className="text-2xl font-semibold flex items-center gap-2 text-accent">
            <MapPin className="h-6 w-6 stroke-accent" />
            Duration
          </h3>

          <p className="font-semibold pl-2">{event?.duration} Minutes</p>
        </div>
        <div className="flex-1 flex flex-col gap-4 p-4 bg-white/5 border border-white/5 shadow-cus rounded-3xl ">
          <h3 className="text-2xl font-semibold flex items-center gap-2 text-accent">
            <MapPin className="h-6 w-6 stroke-accent" />
            Contest Time
          </h3>

          <div className="grid grid-cols-1 justify-center font-semibold pl-2">
            <span>{`${getDate(event.date)}`}</span>
            <span>{`${getTime(event.date)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
