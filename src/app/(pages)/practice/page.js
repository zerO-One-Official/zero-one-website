import { getCodingQuestions } from "@/action/codingQuestion";
import { getPracticeQuizQuestions } from "@/action/quizQuestion";
import QuestionsTable from "@/components/codeEditor/questionTable";
import { Question } from "@/components/contests/Question";
import PracticeTabs from "@/components/practice/PracticeTabs";

export const metadata = {
  title: "Practice",
  description: "Practice coding problems and quiz questions from ZERO ONE Coding Club.",
};

const Playground = async () => {
  const [codingResult, quizResult] = await Promise.all([
    getCodingQuestions(),
    getPracticeQuizQuestions(),
  ]);
  const codingQuestions = codingResult.questions || [];
  const quizQuestions = quizResult.questions || [];

  const codingContent = codingResult.success ? (
    codingQuestions.length > 0 ? (
      <QuestionsTable questions={codingQuestions} />
    ) : (
      <h2 className="text-xl font-bold">No questions found</h2>
    )
  ) : (
    <p role="alert" className="text-destructive">
      Could not load coding questions: {codingResult.message}
    </p>
  );

  const quizContent = quizResult.success ? (
    quizQuestions.length > 0 ? (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quizQuestions.map((question) => (
          <Question
            key={question._id}
            question={question}
            questionDomain="QuizQuestion"
          />
        ))}
      </div>
    ) : (
      <p className="text-foreground/60">No quiz questions are available for practice.</p>
    )
  ) : (
    <p role="alert" className="text-destructive">
      Could not load quiz questions: {quizResult.message}
    </p>
  );

  return (
    <div className="container-70 py-4 h-[calc(100vh-83px)]">
      <PracticeTabs
        codingContent={codingContent}
        quizContent={quizContent}
      />
    </div>
  );
};

export default Playground;
