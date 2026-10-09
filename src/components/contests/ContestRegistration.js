"use client";

import { registerForContest } from "@/action/contest";
import { Button } from "@/components/ui/button";
import { getDate, getTime } from "@/utils/helper";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const getUserId = (user) =>
  String(typeof user === "object" ? user?._id || "" : user || "");

const ContestRegistration = ({
  contestSlug,
  status,
  registrationOpen,
  lastRegistrationDate,
  participants,
}) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [registeredAfterSubmit, setRegisteredAfterSubmit] = useState(false);
  const userId = getUserId(session?.user?._id);
  const registeredParticipant = participants.find(
    (participant) => getUserId(participant.user) === userId && userId
  );
  const isRegistered = Boolean(registeredParticipant || registeredAfterSubmit);
  const callbackUrl = `/contest/${contestSlug}?type=contest&tab=info`;
  const registeredAt = registeredParticipant?.registeredAt
    ? new Date(registeredParticipant.registeredAt)
    : null;
  const hasRegistrationDate =
    registeredAt && Number.isFinite(registeredAt.getTime());

  const handleRegistration = () => {
    startTransition(async () => {
      const result = await registerForContest(contestSlug);
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setRegisteredAfterSubmit(true);
      toast.success(result.message);
      router.refresh();
    });
  };

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/5 bg-white/5 p-5">
      <div>
        <h2 className="text-lg font-semibold text-accent">Contest registration</h2>
        {isRegistered ? (
          <p className="mt-1 text-sm text-foreground/70">
            You are registered
            {hasRegistrationDate
              ? ` on ${getDate(registeredAt)} at ${getTime(registeredAt)}`
              : ""}
            .
          </p>
        ) : registrationOpen ? (
          <p className="mt-1 text-sm text-foreground/70">
            Register before {getDate(new Date(lastRegistrationDate))} at{" "}
            {getTime(new Date(lastRegistrationDate))}.
          </p>
        ) : (
          <p className="mt-1 text-sm text-foreground/70">
            {status === "LIVE"
              ? "Registration is closed."
              : "Registration is not open for this contest."}
          </p>
        )}
      </div>

      {isRegistered ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-300">
            Registered
          </span>
          {status === "LIVE" ? (
            <Button asChild>
              <Link href={`/contest/${contestSlug}/attempt`}>
                Start or resume contest
              </Link>
            </Button>
          ) : null}
        </div>
      ) : registrationOpen && sessionStatus === "loading" ? (
        <Button type="button" disabled>
          Checking account...
        </Button>
      ) : registrationOpen && !session ? (
        <Button asChild>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign in to register
          </Link>
        </Button>
      ) : registrationOpen ? (
        <Button
          type="button"
          onClick={handleRegistration}
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register for contest"}
        </Button>
      ) : null}
    </section>
  );
};

export default ContestRegistration;
