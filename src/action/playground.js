"use server";
// import dbConnect from "@/lib/dbConnect";
import Question from "@/models/CodingQuestion";
import { cache } from "react";

export const getQuestions = cache(async () => {
  try {
    // dbConnect();
    const questions = await Question.find()
      .select("_id name slug difficulty askedIn desc point")
      .lean();
    return questions.map((question) => ({
      ...question,
      _id: question._id.toString(), // Convert _id to string
      title: question.name,
    }));
  } catch (error) {
    throw new Error(error);
  }
});

export const getQuestion = cache(async (slug) => {
  try {
    // dbConnect();
    const question = await Question.findOne({ slug }).lean();

    const publicTestCases = question.testCases.filter(
      (testCase) => testCase.isPublic
    );
    question.testCases = publicTestCases;
    return {
      ...question,
      _id: question._id.toString(), // Convert _id to string
      title: question.name,
    };
  } catch (error) {
    throw new Error(error);
  }
});
