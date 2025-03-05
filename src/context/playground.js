"use client";
import React, { createContext, useContext, useState } from "react";
import { atob } from "@/utils/helper";

const initialState = {
  theme: "github",
  setTheme: () => {},
  code: "github",
  setCode: () => {},
  language: "cpp",
  testCases: [],
  setTestCases: () => {},
  setLanguage: () => {},
  output: "",
  loading: false,
  executionTime: null,
  runCode: async () => {},
  error: "",
};

const PlaygroundContext = createContext(initialState);

export const PlaygroundProvider = ({ children }) => {
  const [language, setLanguage] = useState("cpp");
  const [error, setError] = useState("cpp");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [theme, setTheme] = useState("github");
  const [code, setCode] = useState("");

  const getResult = async (tokens) => {
    try {
      if (!tokens || !tokens.length) return;
      tokens.map(async (token) => {
        while (true) {
          const response = await fetch(`/api/playground?token=${token}`);
          const result = await response.json();

          if (result?.data?.status?.id >= 3) {
            const finishedAt = new Date(result.data.finished_at);
            const createdAt = new Date(result.data.created_at);
            const diffInS = (finishedAt - createdAt) / 1000;

            setExecutionTime(result.data.time || diffInS);

            const message = result?.data.status.description;

            if (message !== "Accepted") setError(message);

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
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const runCode = async (testCases) => {
    try {
      setLoading(true);
      setOutput("");
      setExecutionTime(null);

      if (!code) {
        throw new Error("Can't Run empty Code.");
      }

      // Step 1: Submit the code
      const res = await fetch("/api/playground", {
        method: "POST",
        body: JSON.stringify({
          code,
          language,
          testCases,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      const tokens = data;

      // Step 3: Call polling function
      getResult(tokens);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlaygroundContext.Provider
      value={{
        code,
        setCode,
        language,
        theme,
        setTheme,
        setLanguage,
        output,
        loading,
        executionTime,
        runCode,
        error,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};

export const usePlayground = () => {
  return useContext(PlaygroundContext);
};
