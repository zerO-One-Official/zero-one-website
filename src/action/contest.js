"use server";

import CodingQuestion from "@/models/CodingQuestion";
import Contest from "@/models/Contest";
import QuizQuestion from "@/models/QuizQuestion";
import User from "@/models/User";
import connect from "@/utils/dbConnect";
import { convertIdsToString } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { cache } from "react";

export const getContests = cache(async () => {
  try {
    await connect();

    const contests = await Contest.find({ status: { $ne: "DRAFT" } })
      .select(
        "name slug description status startDate lastRegistrationDate durationMinutes"
      )
      .lean()
      .sort({ startDate: 1 });

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

    const contest = await Contest.findOne({ slug, status: { $ne: "DRAFT" } })
      .populate({
        path: "participants.user",
        model: User,
        select: "firstName lastName profilePic username branch roll",
      })
      .populate({
        path: "winners.user",
        model: User,
        select: "firstName lastName profilePic username branch roll",
      })
      .populate({
        path: "sections.questions.question",
        select:
          "name slug description questionType answerType difficulty point",
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

export const registerForContest = async (slug) => {
  try {
    const session = await getServerSession(options);
    const userId = session?.user?._id;
    if (!userId) {
      return {
        message: "Sign in to register for this contest.",
        type: "error",
        success: false,
      };
    }

    await connect();
    const now = new Date();
    const contest = await Contest.findOneAndUpdate(
      {
        slug,
        status: "LIVE",
        startDate: { $gt: now },
        lastRegistrationDate: { $gt: now },
        "participants.user": { $ne: userId },
      },
      {
        $push: {
          participants: {
            user: userId,
            registeredAt: now,
          },
        },
      },
      { new: true, runValidators: true }
    )
      .select("_id")
      .lean();

    if (!contest) {
      const existingContest = await Contest.findOne({ slug })
        .select("status startDate lastRegistrationDate participants.user")
        .lean();

      if (!existingContest) {
        return {
          message: "Contest not found.",
          type: "error",
          success: false,
        };
      }

      if (
        existingContest.participants?.some(
          (participant) => String(participant.user) === String(userId)
        )
      ) {
        return {
          message: "You are already registered for this contest.",
          type: "success",
          success: true,
          alreadyRegistered: true,
        };
      }

      if (
        existingContest.status !== "LIVE" ||
        new Date(existingContest.lastRegistrationDate) <= now ||
        new Date(existingContest.startDate) <= now
      ) {
        return {
          message: "Registration is closed for this contest.",
          type: "error",
          success: false,
        };
      }

      return {
        message: "Could not register for this contest. Please try again.",
        type: "error",
        success: false,
      };
    }

    revalidatePath(`/contest/${slug}`);
    revalidatePath("/contests");
    revalidatePath("/my-contests");

    return {
      message: "You are registered for this contest.",
      type: "success",
      success: true,
      registeredAt: now.toISOString(),
    };
  } catch (error) {
    console.error("Failed to register for contest:", error);
    return {
      message: error.message,
      type: "error",
      success: false,
    };
  }
};

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
