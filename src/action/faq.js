"use server";
import connect from "@/utils/dbConnect";
import Faq from "@/models/Faqs";
import { convertIdsToString } from "@/utils/helper";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const getFaqs = cache(async () => {
  try {
    await connect();

    const faqs = await Faq.find({}).sort({ createdAt: -1 }).lean();
    return {
      faqs: convertIdsToString(faqs),
      type: "success",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
});

export async function createFaq(question, answer) {
  try {
    await connect();

    const alreadyExist = await Faq.findOne({ question });

    if (alreadyExist) {
      return {
        message: "This Question is already added.",
        type: "error",
        success: false,
      };
    }

    await Faq.create({ question, answer });
    revalidatePath("/misc/faqs");
    return {
      message: "FAQ Added Successfully",
      type: "success",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
}

export async function updateFaq(_id, question, answer) {
  try {
    await connect();

    if (!_id) {
      return {
        message: `Please select an FAQ to Update`,
        type: "error",
        success: false,
      };
    }

    const faq = await Faq.findOne({ _id });

    if (!faq) {
      return {
        message: `This FAQ does not exist`,
        type: "error",
        success: false,
      };
    }

    const updatedFaq = await Faq.findByIdAndUpdate(
      _id,
      { question, answer },
      { new: true }
    ).lean();

    revalidatePath("/misc/faqs");
    return {
      faq: convertIdsToString(updatedFaq),
      type: "success",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
}

export async function deleteFaq(_id) {
  try {
    await connect();

    if (!_id) {
      return {
        message: `Please select an FAQ to Delete`,
        type: "error",
        success: false,
      };
    }

    const faq = await Faq.findOne({ _id });

    if (!faq) {
      return {
        message: `This FAQ does not exist`,
        type: "error",
        success: false,
      };
    }

    await Faq.deleteOne({ _id });
    revalidatePath("/misc/faqs");
    return {
      message: "FAQ Deleted Successfully",
      type: "success",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
}
