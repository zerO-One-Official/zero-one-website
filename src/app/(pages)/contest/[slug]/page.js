import { getContest } from "@/action/contest";
import { getContestAttemptSummary } from "@/action/contestAttempt";
import ContestDetails from "@/components/contests/ContestDetails";
import RemoveMarkdown from "remove-markdown";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { contest } = await getContest(slug);

  if (!contest) {
    return {
      title: "Contest not Found",
      description: "Contest not Found",
    };
  }

  return {
    title: contest.name,
    description: RemoveMarkdown(contest.description),
  };
}

const ContestPage = async ({ params }) => {
  const { slug } = await params;
  const [{ contest }, attemptSummaryResult] = await Promise.all([
    getContest(slug),
    getContestAttemptSummary(slug),
  ]);

  if (!contest) notFound();
  return (
    <ContestDetails
      contest={contest}
      attemptSummaryResult={attemptSummaryResult}
    />
  );
};

export default ContestPage;
