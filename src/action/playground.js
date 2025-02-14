"use server";
import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Questions";

export const getQuestions = async () => {
  try {
    dbConnect();
    const questions = await Question.find()
      .select("name slug difficulty askedIn desc, point")
      .lean(); // Returns plain objects instead of Mongoose documents

    return questions.map((question) => ({
      ...question,
      _id: question._id.toString(), // Convert _id to string
      title: question.name,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuestion = async (slug) => {
  try {
    dbConnect();
    const question = await Question.findOne({ slug })
      .select("name slug difficulty askedIn desc point")
      .lean(); // Returns plain objects instead of Mongoose documents

    return {
      ...question,
      _id: question._id.toString(), // Convert _id to string
      title: question.name,
    };
  } catch (error) {
    throw new Error(error);
  }
};
