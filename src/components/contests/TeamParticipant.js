"use client";
import { useState } from "react";
import { Medal } from "../Medal";
import { Participant } from "./Participants";

const TeamParticipant = ({ team, contestId }) => {
  const [expanded, setexpanded] = useState(false);

  return (
    <div className="flex flex-col p-4">
      <button
        className={`flex gap-4 items-center transition-all ${
          expanded ? "py-2" : ""
        }`}
        onClick={() => setexpanded((prev) => !prev)}
      >
        <p className="text-lg sm:text-2xl font-bold text-primary-light/30">
          {team[0].rank}
        </p>
        <h2 className="font-bold text-2xl">{team[0].team}</h2>
        {team[0].rank ? (
          <div className="ml-auto">
            {team[0].rank <= 3 ? (
              <Medal
                className={`h-10 w-10 -translate-y-[23px] sm:-translate-y-0 sm:h-12 sm:w-12 ${
                  team[0].rank === 1
                    ? "fill-yellow-400 text-yellow-400"
                    : team[0].rank === 2
                    ? "fill-slate-300 text-slate-300"
                    : "fill-amber-700 text-amber-700"
                }`}
              />
            ) : null}
          </div>
        ) : null}
      </button>

      {expanded
        ? team.map((participant) => {
            return (
              <Participant
                contestId={contestId}
                participant={participant?.user}
                team={participant?.team}
                key={participant?._id}
              />
            );
          })
        : null}
    </div>
  );
};

export default TeamParticipant;
