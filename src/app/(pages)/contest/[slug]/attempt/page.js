import { getContestAttemptContext } from "@/action/contestAttempt";
import ContestAttempt from "@/components/contests/ContestAttempt";

export const metadata = {
  title: "Contest Attempt",
  description: "Attempt a ZERO ONE Coding Club contest.",
};

export const dynamic = "force-dynamic";

const ContestAttemptPage = async ({ params }) => {
  const { slug } = await params;
  const context = await getContestAttemptContext(slug);
  return <ContestAttempt context={context} />;
};

export default ContestAttemptPage;
