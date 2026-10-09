import { redirect } from "next/navigation";

const LegacyContestReportPage = async ({ params }) => {
  const { slug } = await params;
  redirect(`/contest/${slug}/my-report`);
};

export default LegacyContestReportPage;
