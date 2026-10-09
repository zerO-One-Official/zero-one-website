import { getContestAttemptContext } from "@/action/contestAttempt";
import ContestAttempt from "@/components/contests/ContestAttempt";

export const dynamic = "force-dynamic";

const ContestAttemptPage = async ({ params }) => {
  const { slug } = await params;
  const context = await getContestAttemptContext(slug);
  return <ContestAttempt context={context} />;
};

export default ContestAttemptPage;
