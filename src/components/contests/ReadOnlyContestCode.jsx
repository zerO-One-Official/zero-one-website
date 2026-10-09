"use client";

import CodeEditor from "@/components/codeEditor/CodeEditor";

const ignoreChange = () => {};

const ReadOnlyContestCode = ({ value, language }) => (
  <CodeEditor
    value={value}
    onChange={ignoreChange}
    language={language}
    autoComplete={false}
    readOnly
    height="280px"
    className="w-full"
  />
);

export default ReadOnlyContestCode;
