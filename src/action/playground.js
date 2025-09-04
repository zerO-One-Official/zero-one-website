"use server";
// import dbConnect from "@/lib/dbConnect";
import CodingQuestion from "@/models/CodingQuestion";
import { convertIdsToString } from "@/utils/helper";
import { cache } from "react";

export const getQuestions = cache(async () => {
  try {
    // dbConnect();
    const questions = await CodingQuestion.find()
      .select("_id name slug difficulty askedIn desc point")
      .lean();
    return convertIdsToString(questions);
  } catch (error) {
    throw new Error(error);
  }
});

export const getQuestion = cache(async (slug) => {
  try {
    // dbConnect();
    const question = await CodingQuestion.findOne({ slug }).lean();

    const publicTestCases = question.testCases.filter(
      (testCase) => testCase.isPublic
    );
    question.testCases = publicTestCases;
    return convertIdsToString(question);
  } catch (error) {
    throw new Error(error);
  }
});
