import Markdown from "react-markdown";

export const Question = ({ question }) => {
  const difficultyColor = () => {
    switch (question?.difficulty) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-orange-500";
      default:
        return "text-red-600";
    }
  };

  return (
    <div className={`flex flex-col h-full gap-4 p-2 overflow-y-auto`}>
      <div
        className={`h-auto opacity-1 pointer-events-auto transition-all flex flex-col text-left gap-4`}
      >
        <h1>{question?.name}</h1>
        <div className="p-4 rounded-xl">
          <h4 className="font-medium underline mb-2 text-lg">
            Problem Statement:
          </h4>
          <div className="text-primary-light/80">
            <Markdown>{question?.desc}</Markdown>
          </div>
        </div>
        <div className="flex gap-6 ml-auto">
          <h4
            className={`font-medium capitalize ${difficultyColor()} font-medium`}
          >
            {question?.difficulty}
          </h4>
          <p className="text-primary-light/80 font-medium">
            {question?.point} Point
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h4 className="font-medium underline mb-2 text-lg">Input Format:</h4>

          <div className="text-primary-light/80">
            <Markdown>{question?.inputFormat}</Markdown>
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h4 className="font-medium underline mb-2 text-lg">Output Format:</h4>
          <div className="text-primary-light/80">
            <Markdown>{question?.outputFormat}</Markdown>
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <h4 className="font-medium underline mb-2 text-lg">Constraints:</h4>
          <div className="text-primary-light/80">
            <Markdown>{question?.constraints}</Markdown>
          </div>
        </div>

        {question?.testCases.map((testCase, index) => {
          return (
            <div key={index} className={`bg-white/5 rounded-xl p-4`}>
              <div className="flex justify-between items-center">
                <h4 className="font-medium underline mb-2 text-lg">
                  Example {index + 1}:
                </h4>
                {testCase.isPublic ? null : <BsFillEyeSlashFill />}
              </div>
              <div className="font-medium text-blue-400">Input</div>
              {testCase?.input ? (
                <div className="text-primary-light/80">
                  <Markdown>{testCase.input}</Markdown>
                </div>
              ) : (
                <p key={index} className="text-primary-light/80">
                  No Input
                </p>
              )}
              <div className="font-medium text-green-400">Output</div>
              {testCase?.output ? (
                <div className="text-primary-light/80">
                  <Markdown>{testCase.output}</Markdown>
                </div>
              ) : (
                <p key={index} className="text-primary-light/80">
                  No Output
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
