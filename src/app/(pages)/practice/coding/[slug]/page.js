import { getCodingQuestion, getCodingQuestions } from "@/action/codingQuestion";
import { Playground } from "@/components/codeEditor";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const { question } = await getCodingQuestion(slug);
  return {
    title: question?.name || "Problem Not Found",
    description:
      question?.description ||
      "Practice coding problems with ZERO ONE Coding Club.",
  };
};

export const generateStaticParams = async () => {
  const { questions } = await getCodingQuestions();

  return questions.map((question) => ({
    slug: question.slug,
  }));
};

const PracticeCodingQuestionPage = async ({ params }) => {
  const { slug } = await params;
  const { question } = await getCodingQuestion(slug);

  if (!question) notFound();
  return <Playground problem={question} />;
};

export default PracticeCodingQuestionPage;
