'use client'

import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Button from "@/components/button/Button";
import Link from "next/link";
import { RxCode } from "react-icons/rx";

export const Question = ({ question: que, eventEndDate }) => {
  const question = JSON.parse(que)
  const currentDate = new Date();
  const [activeQuestion, setActiveQuestion] = useState("");

  const questionRef = useRef();

  useEffect(() => {
    const handleOutClick = (e) => {
      if (!questionRef.current.contains(e.target)) {
        setActiveQuestion("");
      }
    };

    document.addEventListener("click", handleOutClick);
    return () => document.removeEventListener("click", handleOutClick);
  });

  const toggleQuestion = () => {
    if (activeQuestion === "") setActiveQuestion(question._id);
    else setActiveQuestion("");
  };

  const difficultyColor = () => {
    switch (question.difficulty) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-orange-500";
      default:
        return "text-red-600";
    }
  };

  return (
    <div
      ref={questionRef}
      className={`flex flex-col ${activeQuestion === question._id ? "gap-4 bg-white/5 rounded-3xl" : "gap-0"
        } p-4 `}
    >
      <button
        className="flex justify-between items-center w-full transition-all"
        onClick={toggleQuestion}
      >
        <h3 className="text-xl font-medium">{question.name}</h3>
        <IoChevronDownOutline
          className={`${activeQuestion === question._id ? "-rotate-180" : ""
            } transition-all`}
        />
      </button>

      <div
        className={`${activeQuestion === question._id
          ? "h-auto opacity-1 pointer-events-auto"
          : "h-0 overflow-hidden opacity-0 pointer-events-none"
          } transition-all flex flex-col text-left gap-4 `}
      >
        <div className="flex gap-6 ml-auto">
          <h4
            className={`font-medium capitalize ${difficultyColor()} font-medium`}
          >
            {question.difficulty}
          </h4>
          <p className="text-primary-light/80 font-medium">
            {question.point} Point
          </p>
        </div>

        <div className="p-4 rounded-sm">
          <h4 className="font-medium underline mb-2 text-lg">
            Problem Statement:
          </h4>
          <p className="text-primary-light/80">{question.desc}</p>
        </div>
        <div className="ml-auto">
          <Link href={question.link} target="_blank">
            <Button>
              <RxCode />
              Solve
            </Button>
          </Link>
        </div>

        {/* <div className="bg-white/5 p-4 rounded-sm">
          <h4 className="font-medium underline mb-2 text-lg">Input Format:</h4>
          {question.inputFormat.split(",").map((ip, index) => {
            return (
              <p key={index} className="text-primary-light/80">
                {ip}
              </p>
            );
          })}
        </div>

        <div className="bg-white/5 p-4 rounded-sm">
          <h4 className="font-medium underline mb-2 text-lg">Output Format:</h4>
          {question.outputFormat.split(",").map((of, index) => {
            return (
              <p key={index} className="text-primary-light/80">
                {of}
              </p>
            );
          })}
        </div>

        <div className="bg-white/5 p-4 rounded-sm">
          <h4 className="font-medium underline mb-2 text-lg">Constraints:</h4>
          {question.constraints.split(",").map((cons, index) => {
            return (
              <p key={index} className="text-primary-light/80">
                {cons}
              </p>
            );
          })}
        </div>

        {question.testCases.map((testCase, index) => {
          return (
            <div key={testCase._id} className={`bg-white/5 rounded-sm p-4`}>
              <div className="flex justify-between items-center">
                <h4 className="font-medium underline mb-2 text-lg">
                  TestCase {index}:
                </h4>
                {testCase.isPublic ? null : <BsFillEyeSlashFill />}
              </div>
              {testCase.isPublic ? (
                <>
                  <div className="font-medium text-blue-400">Input</div>
                  {testCase.input.split(",").map((inp, index) => {
                    return (
                      <p key={index} className="text-primary-light/80">
                        {inp}
                      </p>
                    );
                  })}
                  <div className="font-medium text-green-400">Output</div>
                  {testCase.output.split(",").map((op, index) => {
                    return (
                      <p key={index} className="text-primary-light/80">
                        {op}
                      </p>
                    );
                  })}
                </>
              ) : currentDate > eventEndDate ? (
                <>
                  <div className="font-medium text-blue-400">Input</div>
                  {testCase.input.split(",").map((inp, index) => {
                    return (
                      <p key={index} className="text-primary-light/80">
                        {inp}
                      </p>
                    );
                  })}
                  <div className="font-medium text-green-400">Output</div>
                  {testCase.output.split(",").map((op, index) => {
                    return (
                      <p key={index} className="text-primary-light/80">
                        {op}
                      </p>
                    );
                  })}
                </>
              ) : null}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
