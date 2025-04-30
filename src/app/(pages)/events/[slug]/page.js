import { getEvent } from "@/action/event";
import ContestPage from "./contestPage";
import QuizPage from "./quizPage";

const EventPage = async ({ params, searchParams }) => {
  const { slug } = await params;

  const event = await getEvent(slug);

  if (event?.type === "contest")
    return <ContestPage event={event} searchParams={await searchParams} />;
  if (event?.type === "quiz") {
    return <QuizPage event={event} searchParams={await searchParams} />;
  }
};

export default EventPage;
