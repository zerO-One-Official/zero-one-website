import { getQuestion } from "@/action/playground";
import Playground from "@/components/Playground/Playground";
export const generateMetadata = async ({ params }) => {
  const { questionSlug } = await params;
  const question = await getQuestion(questionSlug);
  return {
    title: question.title,
    description: question.desc,
  };
};

const QuestionPage = async ({ params }) => {
  const { slug } = await params;
  const question = await getQuestion(slug);

  return <Playground question={question} />;
};

export default QuestionPage;
