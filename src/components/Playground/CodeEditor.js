"use client";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import Skeleton from "../skeleton/skeleton";
import Button from "../button/Button";
import { CiPlay1 } from "react-icons/ci";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { BsGear } from "react-icons/bs";
import toast from "react-hot-toast";
import { c, cpp, java, javascript, python } from "./defaultCodeTemplate";
import { atob } from "@/utils/helper";
import { BiLoader } from "react-icons/bi";

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

const CodeEditor = ({ code, submitCode }) => {
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
    <div className="flex flex-col gap-2 ">
      <div className="ml-auto p-4 flex items-center gap-4">
        <button
          disabled={loading}
          ref={popUpRef}
          onClick={setSettingOpen}
          type="button"
          className={
            "relative shadow-btn p-4 border border-white/5 flex items-center justify-center rounded-full"
          }
        >
          <BsGear className="shrink-0 w-5 h-5" />
          {settingOpen ? (
            <div className="absolute top-16 p-6 z-10 backdrop-blur-xl left-1/2 -translate-x-1/2 shadow-cus border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl min-w-56 ">
              <h4 className="text-left font-semibold text-accent">Language</h4>
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
                  <label htmlFor="javascript">JavaScript (Node 12.14.0)</label>
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
        </button>
        <Button className={"shadow-btn"} onClick={runCode} disabled={loading}>
          <CiPlay1 className="w-4 h-4" />
        </Button>
        <Button className={"group"} varrient={"filled"} disabled={loading}>
          <HiOutlinePaperAirplane className="w-4 h-4 stroke-primary  group-hover:stroke-primary-light" />
          Submit
        </Button>
      </div>
      <div className="grid grid-cols-6 min-h-[calc(100vh-83px-64px-84px-20px)] gap-4">
        <div className="bg-[#1e1e1e] py-6 px-2 min-h-[447px] col-span-6 xl:col-span-6 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25  rounded-3xl overflow-hidden">
          <Editor
            // options={options}
            options={options}
            theme="vs-dark"
            defaultLanguage="cpp"
            language={language} // java javascript cpp python
            defaultValue={cpp}
            onMount={handleEditorDidMount}
            value={code || defaultCode}
            loading={<Skeleton className={"w-full h-full"} />}
          />
        </div>
        <div className="col-span-6 h-auto flex gap-4 overflow-hidden">
          <div className="overflow-hidden bg-[#1e1e1e] w-full flex-1 flex flex-col gap-4 p-4 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl">
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
          </div>
          <div className="overflow-hidden bg-[#1e1e1e]  w-full flex-1 flex flex-col gap-4 p-4 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 rounded-3xl">
            <h3 className="text-center font-semibold text-white/40 text-xl">
              Output
            </h3>
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
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
                <span className="ml-auto inline-block text-sm text-green-300">
                  {executionTime}
                  {executionTime && "s"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
