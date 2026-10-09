import { getContests } from "@/action/contest";
import ContestCollection from "@/components/contests/ContestCollection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Contests",
  description: "Browse all Zero One coding contests.",
};

const AllContestsPage = async () => {
  const { contests = [] } = await getContests();

  return (
    <ContestCollection
      contests={contests}
      emptyMessage="There are no contests to show right now."
    />
  );
};

export default AllContestsPage;
