"use server";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Questions";

export const getQuestions = async () => {
  try {
    dbConnect();
    const questions = await Question.find().select(
      "name slug difficulty askedIn desc"
    );

    return questions || [];
  } catch (error) {
    throw new Error(error);
  }
};
