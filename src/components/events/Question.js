"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import Button from "@/components/button/Button";
import Link from "next/link";
import { RxCode } from "react-icons/rx";
import Markdown from "react-markdown";

export const Question = ({ question }) => {
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
    if (activeQuestion === "") setActiveQuestion(question?._id);
    else setActiveQuestion("");
  };

  const difficultyColor = () => {
    switch (question?.difficulty) {
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
      className={`flex flex-col ${
        activeQuestion === question?._id
          ? "gap-4 bg-white/5 rounded-3xl"
          : "gap-0"
      } p-4  border-b border-white/5`}
    >
      <button
        className="flex justify-between items-center w-full transition-all "
        onClick={toggleQuestion}
      >
        <h3 className="text-xl font-medium">{question?.name}</h3>
        <IoChevronDownOutline
          className={`${
            activeQuestion === question?._id ? "-rotate-180" : ""
          } transition-all`}
        />
      </button>

      <div
        className={`${
          activeQuestion === question?._id
            ? "h-auto opacity-1 pointer-events-auto"
            : "h-0 overflow-hidden opacity-0 pointer-events-none"
        } transition-all flex flex-col text-left gap-4 `}
      >
        <div className="flex gap-6 ml-auto">
          <h4
            className={`font-medium capitalize ${difficultyColor()} font-medium`}
          >
            {question?.difficulty}
          </h4>
          <p className="text-primary-light/80 font-medium">
            {question?.point} Point
          </p>
        </div>

        <div className="p-4 rounded-xl">
          <h4 className="font-medium underline mb-2 text-lg">
            Problem Statement:
          </h4>
          <div className="text-primary-light/80">
            <Markdown>{question?.desc}</Markdown>
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          {/* <Link href={question?.link} target="_blank">
            <Button>
              <RxCode />
              HackerRank
            </Button>
          </Link> */}
          <Link href={`/playground/${question?.slug}`} target="_blank">
            <Button>
              <RxCode />
              Solve
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
