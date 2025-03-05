"use client";
import { Editor } from "@monaco-editor/react";
import { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { defaultCode } from "./defaultCodeTemplate";
import { cn } from "@/lib/utils";
import { usePlayground } from "@/context/playground";
import { monacoThemes } from "./monacoThemes";
import { Inika } from "next/font/google";
const inika = Inika({ subsets: ["latin"], weight: ["400"] });

const options = {
  fontSize: 20,
  acceptSuggestionOnEnter: "smart",
  autoClosingBrackets: "languageDefined",
  autoClosingQuotes: "languageDefined",
  fontLigatures: true,
  automaticLayout: true,
  bracketPairColorization: {
    enabled: true,
  },
  autoIndent: "brackets",
  copyWithSyntaxHighlighting: true,
  cursorBlinking: "phase",
  cursorSmoothCaretAnimation: true,
  cursorWidth: 3,
  inlayHints: {
    enabled: true,
  },
  formatOnPaste: true,
  inlineSuggest: {
    enabled: true,
  },
  matchBrackets: "always",
  mouseWheelZoom: true,
  snippetSuggestions: "bottom",
  suggest: { preview: true },
  wordWrap: "bounded",
  fontFamily: "inika",
  cursorStyle: "underline",
};

const CodeEditor = ({ className }) => {
  const editorRef = useRef(null);

  const { language, theme, setCode, code } = usePlayground();

  function handleEditorDidMount(editor, monaco) {
    monacoThemes.forEach((theme) => {
      // Define the Monkai theme
      monaco.editor.defineTheme(theme.name, theme.value);
    });
    // Set the theme
    monaco.editor.setTheme(theme);
    editorRef.current = editor;

    setCode(editor.getValue());
  }

  return (
    <div
      className={cn(
        `bg-[#0d0d0d] rounded-xl flex flex-col w-full h-full flex-1 ${inika.className}`,
        className
      )}
    >
      <Editor
        options={options}
        height={"100%"}
        theme={theme}
        defaultLanguage="cpp"
        language={language}
        defaultValue={defaultCode.cpp}
        onChange={setCode}
        onMount={handleEditorDidMount}
        value={code}
        className={`p-0`}
        loading={<Skeleton className={"w-full h-full rounded-none"} />}
      />
    </div>
  );
};

export default CodeEditor;
