"use client";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CiPlay1 } from "react-icons/ci";
import { BsGear } from "react-icons/bs";
import toast from "react-hot-toast";
import { c, cpp, java, javascript, python } from "./defaultCodeTemplate";
import { atob } from "@/utils/helper";
import { BiLoader } from "react-icons/bi";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const options = {
  mouseWheelZoom: true,
  snippetSuggestions: "bottom",
  suggest: { preview: true },
  wordWrap: "bounded",
  formatOnPaste: true,
  cursorSmoothCaretAnimation: "on",
  cursorBlinking: "phase",
  scrollbar: {
    verticalSliderSize: 10,
    horizontalScrollbarSize: 10,
    horizontalSliderSize: 10,
    verticalScrollbarSize: 10,
  },
  fontSize: 18,
  cursorStyle: "underline",
};

const CodeEditor = ({ code, className, questionId, publicTestCases }) => {
  const editorRef = useRef(null);
  const popUpRef = useRef(null);

  const [settingOpen, setSettingOpen] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState("");
  const [defaultCode, setDefaultCode] = useState(cpp);
  const [executionTime, setExecutionTime] = useState(null);

  useEffect(() => {
    const codeMap = { c, cpp, java, python, javascript };
    setDefaultCode(codeMap[language] || cpp);
  }, [language]);

  function handleEditorDidMount(editor, monaco) {
    monaco.editor.defineTheme("my-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#101010",
      },
    });
    monaco.editor.setTheme("my-theme");
    editorRef.current = editor;
  }

  useEffect(() => {
    const handleOutClick = (e) => {
      if (!popUpRef?.current?.contains(e.target)) {
        setSettingOpen(false);
      }
    };

    document.addEventListener("click", handleOutClick);
    return () => document.removeEventListener("click", handleOutClick);
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "n") {
        runCode();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleChange = (language) => {
    setLanguage(language);
    setSettingOpen(false);
  };

  // Step 2: Polling function to get results
  const getResult = async (token) => {
    try {
      if (!token) return;
      while (true) {
        const response = await fetch(`/api/playground?token=${token}`);
        const result = await response.json();

        if (result?.data?.status?.id >= 3) {
          const finishedAt = new Date(result.data.finished_at);
          const createdAt = new Date(result.data.created_at);
          const diffInS = (finishedAt - createdAt) / 1000;

          setExecutionTime(result.data.time || diffInS);

          const desc = result?.data.status.description;

          if (desc === "Accepted") {
            toast.success(`Code Compiled in ${result.data.time} Seconds`);
          } else toast.error(desc);

          // Status ID >= 3 means completed
          if (result?.data?.compile_output) {
            setOutput(atob(result?.data?.compile_output));
          } else if (result?.data?.stdout) {
            setOutput(atob(result?.data?.stdout));
          } else if (result?.data?.stderr) {
            setOutput(atob(result?.data?.stderr));
          } else {
            setOutput("No Output");
          }
          break;
        }

        // Wait 1 second before polling again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.log("Error fetching result:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const runCode = async () => {
    try {
      setLoading(true);
      setOutput("");
      setExecutionTime(null);

      // Step 1: Submit the code
      const res = await fetch("/api/playground", {
        method: "POST",
        body: JSON.stringify({
          code: editorRef.current.getValue(),
          questionId,
          language,
          input,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const token = data.token;

      // Step 3: Call polling function
      getResult(token);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex flex-col min-h-[calc(100vh-83px-64px-84px-20px)] border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 gap-4 bg-[#101010] rounded-xl py-4">
        <div className="ml-auto flex items-center gap-4 px-4">
          <Button
            disabled={loading}
            ref={popUpRef}
            onClick={() => setSettingOpen((prev) => !prev)}
            type="button"
            size={"icon"}
            className={
              "relative shadow-btn border border-white/5 flex items-center justify-center rounded-full"
            }
          >
            <BsGear className="shrink-0 w-4 h-4 stroke-primary-foreground fill-primary-foreground" />
            {settingOpen ? (
              <div className="absolute top-16 p-6 z-10 backdrop-blur-xl left-1/2 -translate-x-1/2 shadow-cus border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl min-w-56 ">
                <h4 className="text-left font-semibold text-accent">
                  Language
                </h4>
                <section className="space-y-2 mt-4 min-w-max">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="c"
                      checked={language === "c"}
                      id="c"
                      name="langauge"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <label htmlFor="c">C (GCC 9.2.0)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="cpp"
                      checked={language === "cpp"}
                      id="cpp"
                      name="langauge"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <label htmlFor="cpp">C++ (GCC 9.2.0)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="java"
                      checked={language === "java"}
                      id="java"
                      name="langauge"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <label htmlFor="java">Java (OpenJDK 9)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="javascript"
                      checked={language === "javascript"}
                      id="javascript"
                      name="langauge"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <label htmlFor="javascript">
                      JavaScript (Node 12.14.0)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="python"
                      checked={language === "python"}
                      id="python"
                      name="langauge"
                      onChange={(e) => handleChange(e.target.value)}
                    />
                    <label htmlFor="python">Python (3.8.1)</label>
                  </div>
                </section>
              </div>
            ) : null}
          </Button>
          <Button
            size="sm"
            className={"bg-blue-300 hover:bg-blue-300/80 font-semibold"}
            onClick={runCode}
            disabled={loading}
          >
            <CiPlay1 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="bg-green-300 hover:bg-green-300/80 text-primary font-semibold"
            disabled={loading}
          >
            Submit
          </Button>
        </div>
        <div className="min-h-[350px] col-span-6 xl:col-span-6 overflow-hidden">
          <Editor
            // options={options}
            options={options}
            theme="my-theme"
            defaultLanguage="cpp"
            language={language} // java javascript cpp python
            defaultValue={cpp}
            onMount={handleEditorDidMount}
            value={code || defaultCode}
            className="h-full p-0"
            loading={<Skeleton className={"w-full h-full rounded-none"} />}
          />
        </div>
        <div className="col-span-6 h-auto flex gap-4 overflow-hidden">
          {/* <div className="overflow-hidden bg-[#1e1e1e] w-full flex-1 flex flex-col gap-4 p-4 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl">
            <h3 className="text-center font-semibold text-white/40 text-xl">
              Input
            </h3>
            <textarea
              disabled={loading}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="overflow-auto bg-transparent outline-none h-full resize-none font-semibold text-sm"
              rows={4}
            />
          </div> */}
          <div className="overflow-hidden w-full flex-1 flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-left font-semibold text-white/40 text-xl">
                Console
              </h3>
              <span className="ml-auto inline-block text-sm text-green-300">
                {executionTime}
                {executionTime && "s"}
              </span>
            </div>
            {loading ? (
              <div className="w-full h-20 flex items-center justify-center">
                <BiLoader className="animate-spin fill-accent" size={30} />
              </div>
            ) : (
              <>
                <textarea
                  readOnly
                  className="overflow-auto font-semibold bg-transparent outline-none h-full resize-none text-sm"
                  rows={4}
                  value={output}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
