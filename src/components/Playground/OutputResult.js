"use client";
import { usePlayground } from "@/context/playground";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  CheckCircle,
  CheckSquare,
  Clipboard,
  TriangleAlert,
  XCircle,
} from "lucide-react";

const OutputResult = () => {
  const [activeTestCase, setActiveTestCase] = useState(0);
  const { testCases } = usePlayground();

  return (
    <div className="overflow-hidden w-full h-full flex-1 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 p-4 bg-secondary">
        <div className="flex items-center gap-2 font-semibold">
          <CheckSquare className="w-4 h-4 fill-none" />
          <span>Testcase</span>
        </div>
        <span className="ml-auto inline-block font-bold text-sm text-sky-400">
          {testCases[activeTestCase]?.time
            ? `${testCases[activeTestCase].time}s`
            : null}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-2 flex-1">
        <div className="flex gap-2">
          {testCases.map((testCase, index) => {
            return (
              <Button
                size="sm"
                key={index}
                onClick={() => setActiveTestCase(index)}
                className={`rounded-lg ${
                  activeTestCase === index
                    ? "bg-foreground/10 hover:bg-foreground/15"
                    : "bg-transparent hover:bg-foreground/5"
                } ${
                  testCase.status === "Accepted"
                    ? "text-green-400"
                    : testCase.status === "Wrong Answer"
                    ? "text-red-400"
                    : testCase.status === "Compilation Error"
                    ? "text-orange-400"
                    : "text-foreground"
                }`}
              >
                {testCase.status === "Accepted" ? (
                  <CheckCircle className="w-4 h-4 stroke-green-400 fill-none" />
                ) : testCase.status === "Wrong Answer" ? (
                  <XCircle className="w-4 h-4 stroke-red-400 fill-none" />
                ) : testCase.status === "Compilation Error" ? (
                  <TriangleAlert className="w-4 h-4 stroke-orange-400 fill-none" />
                ) : (
                  <Clipboard className="w-4 h-4 stroke-foreground fill-none" />
                )}
                Case {index + 1}
              </Button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 h-full overflow-y-auto">
          {
            // !testCases[activeTestCase]?.status ||
            // testCases[activeTestCase]?.status === "Running" ? (
            //   <Skeleton className={"w-full h-full"} />
            // ) :
            testCases[activeTestCase]?.status === "Compilation Error" ? (
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground/60">Error</p>
                <span className="p-2 text-orange-500 bg-foreground/5 rounded-xl">
                  {testCases[activeTestCase]?.code_output}
                </span>
              </div>
            ) : testCases[activeTestCase]?.status === "Idle" ? (
              <>
                {testCases[activeTestCase]?.stdin !== "" ? (
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-foreground/60">Input</p>
                    <span className="p-2 bg-foreground/5 rounded-xl">
                      {testCases[activeTestCase]?.stdin}
                    </span>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-foreground/60">
                    Expected Output
                  </p>
                  <span className="p-2 bg-foreground/5 rounded-xl">
                    {testCases[activeTestCase]?.expected_output}
                  </span>
                </div>
              </>
            ) : (
              <>
                {testCases[activeTestCase]?.stdin !== "" ? (
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-foreground/60">Input</p>
                    <span className="p-2 bg-foreground/5 rounded-xl">
                      {testCases[activeTestCase]?.stdin}
                    </span>
                  </div>
                ) : null}

                {testCases[activeTestCase]?.expected_output ? (
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-foreground/60">
                      Expected Output
                    </p>
                    <span className="p-2 bg-foreground/5 rounded-xl">
                      {testCases[activeTestCase].expected_output}
                    </span>
                  </div>
                ) : null}
                {testCases[activeTestCase]?.code_output ? (
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-foreground/60">
                      Your Output
                    </p>
                    <span
                      className={`p-2 ${
                        testCases[activeTestCase]?.status === "Accepted"
                          ? "text-green-400"
                          : "text-red-400"
                      } bg-foreground/5 rounded-xl`}
                    >
                      {testCases[activeTestCase].code_output}
                    </span>
                  </div>
                ) : null}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default OutputResult;
