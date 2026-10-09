import { getServerSession } from "next-auth";
import Link from "next/link";
import { getUserContests } from "@/action/user";
import ContestCollection from "@/components/contests/ContestCollection";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Contests",
  description: "View contests you have joined.",
};

const MyContestsPage = async () => {
  const session = await getServerSession(options);
  const contests = session?.user?._id
    ? await getUserContests(session.user._id)
    : [];

  const emptyMessage = session?.user?._id ? (
    "You haven't joined any contests yet."
  ) : (
    <>
      <Link href="/login" className="text-accent hover:underline">
        Log in
      </Link>{" "}
      to see the contests you have joined.
    </>
  );

  return (
    <ContestCollection
      contests={contests}
      emptyMessage={emptyMessage}
      isMyContests
    />
  );
};

export default MyContestsPage;
