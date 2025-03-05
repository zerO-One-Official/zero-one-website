"use client";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./CodeEditor";
import CodeExecuter from "./CodeExecuter";
import { Question } from "./Question";
import { PlaygroundProvider, usePlayground } from "@/context/playground";
import OutputResult from "./OutputResult";

const Playground = ({ question }) => {
  const { setTestCases } = usePlayground();

  question.testCases.map((testCase) => {
    setTestCases((prev) => [
      ...prev,
      {
        stdin: testCase.input,
        expected_output: testCase.output,
        code_output: "",
        status: "idle",
      },
    ]);
  });

  return (
    <PlaygroundProvider>
      <div className="h-full p-2">
        {/* Ensure the Playground takes full height */}
        <PanelGroup
          autoSaveId="question-editor"
          direction="horizontal"
          className="h-full gap-1"
        >
          <Panel
            className="h-[calc(100vh-84px-16px)] rounded-2xl overflow-hidden bg-white/5 border border-white/5"
            defaultSize={50}
          >
            <Question question={question} />
          </Panel>
          <PanelResizeHandle className="bg-transparent relative w-[3px] before:w-[1px] before:h-inherit hover:before:bg-accent before:rounded-full before:transition-colors shrink-0" />
          <Panel defaultSize={50}>
            <PanelGroup
              autoSaveId="editor-output"
              direction="vertical"
              className="h-full gap-1"
            >
              <Panel
                className="bg-white/5 border border-white/5 rounded-2xl"
                defaultSize={70}
              >
                <CodeExecuter questionId={question._id} />
                <CodeEditor />
              </Panel>
              <PanelResizeHandle className="bg-transparent relative h-[3px] before:h-[1px] before:h-inherit hover:before:bg-accent before:rounded-full before:transition-colors shrink-0" />

              <Panel
                className="bg-white/5 border border-white/5 rounded-2xl"
                defaultSize={30}
              >
                <OutputResult />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </PlaygroundProvider>
  );
};

export default Playground;
