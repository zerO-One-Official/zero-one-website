"use client";

import CodeEditor from "@/components/Playground/CodeEditor";
import { Question } from "@/components/Playground/Question";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const Playground = ({ question }) => {
  return (
    <PanelGroup
      autoSaveId="playground-question"
      direction="horizontal"
      className=""
    >
      <Panel>
        <Question question={question} />
      </Panel>
      <PanelResizeHandle className="bg-transparent relative  w-[3px] before:w-[1px] before:h-inherit hover:before:bg-accent before:rounded-full before:transition-colors shrink-0" />
      <Panel>
        <CodeEditor
          className={"sticky top-0"}
          publicTestCases={question.testCases}
          questionId={question._id}
        />
      </Panel>
    </PanelGroup>
  );
};

export default Playground;
