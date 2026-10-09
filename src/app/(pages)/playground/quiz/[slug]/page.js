import { getQuizQuestion } from "@/action/quizQuestion";
import QuizPlayground from "@/components/contests/QuizPlayground";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { question } = await getQuizQuestion(slug);

  return {
    title: question?.name || "Question not found",
    description: question?.description || "Quiz question",
  };
}

const QuizPlaygroundPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { contest: contestSlug } = (await searchParams) || {};
  if (contestSlug) redirect(`/contest/${contestSlug}/attempt`);
  const { question } = await getQuizQuestion(slug);

  if (!question) notFound();
  return <QuizPlayground question={question} contestSlug={contestSlug} />;
};

export default QuizPlaygroundPage;
