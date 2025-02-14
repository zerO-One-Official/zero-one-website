import { getQuestion } from "@/action/playground";
import CodeEditor from "@/components/Playground/CodeEditor";
import { Badge } from "@/components/ui/badge";

export const generateMetadata = async ({ params }) => {
  const { questionSlug } = await params;
  const question = await getQuestion(questionSlug);
  return {
    title: question.title,
    description: question.desc,
  };
};

const QuestionPage = async ({ params }) => {
  const { questionSlug } = await params;
  const question = await getQuestion(questionSlug);

  return (
    <div className="grid grid-cols-2 w-full min-h-screen p-6 sm:p-2 sm:gap-4 gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-accent">{question.title}</h2>
        <article className="font-semibold text-justify">
          {question.desc}
        </article>
        <div className="ml-auto fles flex-col items-center justify-center text-center font-semibold gap-1">
          <Badge
            variant="default"
            className={`capitalize mx-auto ${
              question.difficulty === "easy"
                ? "bg-green-300 hover:bg-green-300/90"
                : question.difficulty === "medium"
                ? "bg-blue-300 hover:bg-blue-300/90"
                : "bg-red-300 hover:bg-red-300/90"
            } text-black ml-auto`}
          >
            {question.difficulty}
          </Badge>
          <div className="">{question.point} Pts</div>
        </div>
      </div>

      <CodeEditor />
    </div>
  );
};

export default QuestionPage;
