"use server";

import { validateCodingQuestionForm } from "@/lib/validators";
import CodingQuestion from "@/models/CodingQuestion";
import connect from "@/utils/dbConnect";
import { convertIdsToString } from "@/utils/helper";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getCodingQuestions = cache(async () => {
  try {
    await connect();

    const questions = await CodingQuestion.find({})
      .sort({ updated_at: -1 })
      .lean();

    return {
      questions: convertIdsToString(questions),
      type: "success",
      success: true,
    };
  } catch (error) {
    console.log(`Error in fetching questions: ${error}`);
    return { message: error.message, type: "error", success: false };
  }
});

export const getCodingQuestion = cache(async (slug) => {
  try {
    await connect();

    const questions = await CodingQuestion.findOne({ slug })
      .sort({ updated_at: -1 })
      .lean();

    return {
      questions: convertIdsToString(questions),
      type: "success",
      success: true,
    };
  } catch (error) {
    console.log(`Error in fetching questions: ${error}`);
    return { message: error.message, type: "error", success: false };
  }
});
