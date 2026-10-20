import { redirect } from "next/navigation";

export const metadata = {
  title: "Contest Report",
  description: "View your contest report and submitted answers.",
};

const LegacyContestReportPage = async ({ params }) => {
  const { slug } = await params;
  redirect(`/contest/${slug}/my-report`);
};

export default LegacyContestReportPage;
