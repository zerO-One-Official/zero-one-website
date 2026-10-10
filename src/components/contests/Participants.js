import { HiOutlineUserCircle } from "react-icons/hi2";
import { Medal } from "@/components/Medal";
import Image from "next/image";
import Link from "next/link";
import { getDate, getTime } from "@/utils/helper";

export const Participant = ({
  participant,
  rank,
  registeredAt,
  isWinner = rank <= 5,
  showParticipantStatus = false,
}) => {
  const placeClass =
    !isWinner
      ? "border-white/5"
      : rank === 1
      ? "border-yellow-400/30 bg-yellow-400/10"
      : rank === 2
      ? "border-slate-300/30 bg-slate-300/10"
      : rank === 3
      ? "border-orange-400/30 bg-orange-400/10"
      : "border-accent/30 bg-accent/10";
  const registeredDate = registeredAt ? new Date(registeredAt) : null;
  const hasRegistrationDate =
    registeredDate && Number.isFinite(registeredDate.getTime());

  const participantContent = (
    <>
      {rank != null ? (
        <p className="text-lg sm:text-2xl font-bold scale-110 text-primary-light/30">
          {rank}
        </p>
      ) : null}
      {participant?.profilePic ? (
        <Image
          src={participant.profilePic}
          width={56}
          height={56}
          alt={participant.firstName || "Participant"}
          className="w-14 h-14 rounded-full object-cover"
        />
      ) : (
        <div className="w-14 h-14">
          <HiOutlineUserCircle className="w-full h-full flex items-center justify-center bg-white/5 rounded-full" />
        </div>
      )}
      <div>
        <h2 className="capitalize text-base sm:text-xl font-medium">
          {participant?.firstName} {participant?.lastName}
        </h2>
        {participant?.roll ? (
          <p className="capitalize text-sm font-medium text-primary-light/50">
            {participant.roll}
          </p>
        ) : null}
        {participant?.teamName ? (
          <p className="text-sm text-primary-light/60">
            Team: {participant.teamName}
          </p>
        ) : null}
        {hasRegistrationDate ? (
          <p className="mt-1 text-sm text-primary-light/50">
            Registered {getDate(registeredDate)} at {getTime(registeredDate)}
          </p>
        ) : null}
      </div>
      {isWinner ? (
        <span className="ml-auto rounded-full bg-black/10 px-3 py-1 text-sm font-semibold text-accent">
          Rank {rank} · Winner
        </span>
      ) : showParticipantStatus ? (
        <span className="ml-auto rounded-full bg-white/5 px-3 py-1 text-sm font-semibold text-primary-light/60">
          Participant
        </span>
      ) : null}
      {isWinner && rank <= 3 ? (
        <Medal
          className={`h-12 w-12 shrink-0 ${
            rank === 1
              ? "fill-yellow-400 text-yellow-400"
              : rank === 2
              ? "fill-slate-300 text-slate-300"
              : "fill-amber-700 text-amber-700"
          }`}
        />
      ) : null}
    </>
  );

  return (
    <li className={`rounded-2xl border ${placeClass}`}>
      {participant?.username ? (
        <Link
          href={`/user/${participant.username}`}
          className="flex flex-wrap items-center gap-6 p-4 sm:gap-4"
        >
          {participantContent}
        </Link>
      ) : (
        <div className="flex flex-wrap items-center gap-6 p-4 sm:gap-4">
          {participantContent}
        </div>
      )}
    </li>
  );
};
