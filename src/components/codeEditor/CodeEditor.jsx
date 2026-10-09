"use client";

import { useEffect, useRef } from "react";
import AceEditor from "react-ace";
import { languageConfigs } from "./editorConfigs";
import "./editorConfigs";
import {
  useCodeEditorCode,
  useCodeEditorLanguage,
  useCodeEditorLoading,
  useCodeEditorSetCode,
  useCodeEditorRunCode,
  useCodeEditorResetCode,
  useCodeEditorInitialize,
  useCodeEditorAnnotations,
  useCodeEditorMarkers,
  useCodeEditorShowLineNumbers,
  useCodeEditorShowGutter,
  useCodeEditorHighlightActiveLine,
  useCodeEditorShowPrintMargin,
  useCodeEditorSubmitCode,
} from "../../stores/codeEditorStore";

// Import language modes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

// Import extensions
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";

const CodeEditor = ({
  // Props from Playground
  initialCode = "",
  allowedLanguages,
  // Editor config
  fontSize = 14,
  readOnly = false,
  autoComplete = true,
  value,
  onChange,
  language: languageOverride,
  // Styling
  className = "",
  height = "100%",
}) => {
  // Get state directly from Zustand store
  const code = useCodeEditorCode();
  const language = useCodeEditorLanguage();
  const loading = useCodeEditorLoading();

  // Get annotations and markers from store
  const annotations = useCodeEditorAnnotations();
  const markers = useCodeEditorMarkers();
  const showLineNumbers = useCodeEditorShowLineNumbers();
  const showGutter = useCodeEditorShowGutter();
  const highlightActiveLine = useCodeEditorHighlightActiveLine();
  const showPrintMargin = useCodeEditorShowPrintMargin();

  // Get actions from store
  const setCode = useCodeEditorSetCode();
  const runCode = useCodeEditorRunCode();
  const submitCode = useCodeEditorSubmitCode();
  const resetCode = useCodeEditorResetCode();
  const initializeEditor = useCodeEditorInitialize();
  const isControlled = typeof value === "string" && typeof onChange === "function";
  const allowedLanguagesKey = JSON.stringify(allowedLanguages);
  const allowedLanguagesRef = useRef(allowedLanguages);
  allowedLanguagesRef.current = allowedLanguages;
  const editorLanguage = languageOverride || language;
  const editorMode =
    languageConfigs[editorLanguage]?.mode ||
    (editorLanguage === "html" || editorLanguage === "css"
      ? editorLanguage
      : "javascript");

  // Initialize the editor store when component mounts or props change
  useEffect(() => {
    if (!isControlled) initializeEditor(initialCode, allowedLanguagesRef.current);
  }, [
    initialCode,
    allowedLanguagesKey,
    initializeEditor,
    language,
    isControlled,
  ]);

  return (
    <div
      className={`border border-border/30 bg-background rounded-lg overflow-hidden ${className}`}
    >
      <AceEditor
        mode={editorMode}
        theme="ZERO_ONE"
        value={isControlled ? value : code}
        onChange={isControlled ? onChange : setCode}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        onLoad={(editor) => {
          if (!autoComplete) {
            editor.completers = [];
            editor.commands.removeCommand("startAutocomplete");
          }
        }}
        fontSize={fontSize}
        width="100%"
        height={height}
        readOnly={readOnly || (!isControlled && loading)}
        annotations={isControlled ? [] : annotations}
        markers={isControlled ? [] : markers}
        setOptions={{
          enableBasicAutocompletion: autoComplete && !readOnly,
          enableLiveAutocompletion: autoComplete && !readOnly,
          enableSnippets: autoComplete && !readOnly,
          showLineNumbers: showLineNumbers,
          tabSize: 4,
          useWorker: false,
          wrap: true,
          highlightActiveLine: highlightActiveLine,
          highlightSelectedWord: true,
          cursorStyle: "smooth",
          mergeUndoDeltas: true,
          autoScrollEditorIntoView: undefined,
          copyWithEmptySelection: false,
          printMargin: showPrintMargin,
        }}
        showGutter={showGutter}
        commands={isControlled ? [] : [
          {
            name: "runCode",
            bindKey: { win: "Ctrl-R", mac: "Cmd-R" },
            exec: () => {
              if (!loading) {
                runCode();
              }
            },
          },
          {
            name: "submitCode",
            bindKey: { win: "Ctrl-S", mac: "Cmd-S" },
            exec: () => {
              if (!loading) {
                submitCode();
              }
            },
          },
          {
            name: "resetCode",
            bindKey: { win: "Ctrl-Shift-R", mac: "Cmd-Shift-R" },
            exec: () => {
              if (!loading) {
                resetCode();
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default CodeEditor;
