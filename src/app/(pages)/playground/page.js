import { getQuestions } from "@/action/playground";
// import QuestionTable from "@/components/Playground/questionTable";

const Playground = async () => {
  // const questions = await getQuestions();

  return (
    <div className="container-70 py-4 h-auto">
      {/* {questions?.length > 0 ? (
        <QuestionTable questions={questions} />
      ) : (
        <h2 className="text-xl font-bold">No questions found</h2>
        )} */}
      <h2 className="text-xl font-bold">No questions found</h2>
    </div>
  );
};

export default Playground;
