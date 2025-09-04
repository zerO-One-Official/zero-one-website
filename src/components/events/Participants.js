import { HiOutlineUserCircle } from "react-icons/hi2";
import { Medal } from "@/components/Medal";
import Image from "next/image";
import Link from "next/link";

export const Participant = ({ participant, rank }) => {
  return (
    <li className="">
      <Link
        href={`/user/${participant.username}`}
        className="flex items-center gap-6 sm:gap-4 p-4 border-b border-white/5 "
      >
        <p className="text-2xl sm:text-lg font-bold scale-110 text-primary-light/30">
          {rank}
        </p>
        {participant?.profilePic ? (
          <Image
            src={participant?.profilePic}
            width={56}
            height={56}
            alt={participant?.firstName}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14">
            <HiOutlineUserCircle className="w-full h-full flex items-center justify-center bg-white/5 rounded-full" />
          </div>
        )}
        <div className="">
          <h2 className="capitalize text-xl sm:text-base font-medium">
            {participant?.firstName} {participant?.lastName}
          </h2>
          <p className="capitalize text-xl sm:text-base font-medium text-primary-light/50">
            {participant?.roll}{" "}
          </p>
        </div>
        <div className="ml-auto">
          {rank <= 3 ? (
            <Medal
              className={`h-14 w-14 -translate-y-4 sm:-translate-y-[23px] sm:w-10 sm:h-10 ${
                rank === 1
                  ? "fill-yellow-400 text-yellow-400"
                  : rank === 2
                  ? "fill-slate-300 text-slate-300"
                  : "fill-amber-700 text-amber-700"
              }`}
            />
          ) : null}
        </div>
      </Link>
    </li>
  );
};
