"use server";

import { validateContestForm } from "@/lib/validators";
import CodingQuestion from "@/models/CodingQuestion";
import Contest from "@/models/Contest";
import QuizQuestion from "@/models/QuizQuestion";
import User from "@/models/User";
import connect from "@/utils/dbConnect";
import { convertIdsToString } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getContests = cache(async () => {
  try {
    await connect();

    const contests = await Contest.find({ status: { $ne: "DRAFT" } })
      .select(
        "name slug description status startDate lastRegistrationDate durationMinutes"
      )
      .lean()
      .sort({ startDate: -1 });

    return {
      contests: convertIdsToString(contests),
      message: "Contest fetched successfully",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Failed to fetch contests:", error);
    return { message: error.message, type: "error", success: false };
  }
});

export const getContest = cache(async (slug) => {
  try {
    await connect();

    const contest = await Contest.findOne({ slug })
      .populate({
        path: "participants.user",
        model: User,
        select: "firstName lastName profilePic username branch roll",
      })
      .populate({
        path: "sections.questions.question",
      })
      .lean()
      .sort({ createdAt: -1 });

    if (!contest) {
      return {
        message: "Contest not found",
        type: "error",
        success: false,
      };
    }
    return {
      contest: convertIdsToString(contest),
      message: "Contest fetched successfully",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Failed to fetch contests:", error);
    return { message: error.message, type: "error", success: false };
  }
});

export const getAllAvailableQuestions = cache(async () => {
  try {
    await connect();

    const quizQuestions = await QuizQuestion.find({})
      .select(
        "_id name slug description questionType answerType difficulty point"
      )
      .lean();
    const codingQuestions = await CodingQuestion.find({})
      .select(
        "_id name slug description inputFormat outputFormat difficulty point"
      )
      .lean();
    return {
      quizQuestions: convertIdsToString(quizQuestions),
      codingQuestions: convertIdsToString(codingQuestions),
      message: "Questions fetched successfully",
      type: "success",
      success: true,
    };
  } catch (error) {
    console.error("Failed to fetch quiz questions:", error);
    return { message: error.message, type: "error", success: false };
  }
});
