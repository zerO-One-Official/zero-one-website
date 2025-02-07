import CodeEditor from "@/components/Playground/CodeEditor";
import { getQuestions } from "@/action/playground";
import Link from "next/link";

const Playground = async () => {
  const { data } = await getQuestions();

  return (
    <div className="container-70 py-4 h-auto">
      {data?.length > 0 ? (
        data.map((question) => (
          <Link
            key={question._id}
            href={`/playground/practice/${question.slug}`}
            className="p-4 my-4 block shadow-cus rounded-lg"
          >
            <h2 className="text-xl font-bold">{question.name}</h2>
          </Link>
        ))
      ) : (
        <h2 className="text-xl font-bold">No questions found</h2>
      )}
    </div>
  );
};

export default Playground;
