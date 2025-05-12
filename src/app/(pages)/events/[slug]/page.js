import { getContest, getContests } from "@/action/contest";
import RemoveMarkdown from "remove-markdown";

export const generateStaticParams = async () => {
  const { contests } = await getContests();
  return contests?.map((contest) => {
    if (!contest) return null;
    if (!contest?.slug) return null;
    return {
      slug: contest.slug,
    };
  });
};
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { contest } = await getContest(slug);
  if (!contest)
    return {
      title: "Contest not Found",
      description: "Contest not Found",
    };
  return {
    title: contest.name,
    description: RemoveMarkdown(contest.description),
  };
}
const EventPage = async ({ params, searchParams }) => {
  const { slug } = await params;

  const contest = await getContest(slug);
  return contest.name;

  // if (event?.type === "contest")
  //   return <ContestPage event={event} searchParams={await searchParams} />;
  // if (event?.type === "quiz") {
  //   return <QuizPage event={event} searchParams={await searchParams} />;
  // }
};

export default EventPage;
