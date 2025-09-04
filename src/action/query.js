"use server";
import connect from "@/utils/dbConnect";
import Query from "@/models/Query";
import { convertIdsToString } from "@/utils/helper";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const getQueries = cache(async () => {
  try {
    await connect();

    const queries = await Query.find({}).sort({ createdAt: -1 }).lean();
    return {
      queries: convertIdsToString(queries),
      type: "success",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
});
export const addQuery = async ({ name, email, roll, message }) => {
  try {
    await connect();

    const queries = await Query.create({ name, email, roll, message });
    return {
      message: "Your Query has been submitted. We will get back to you soon.",
      type: "success",
      success: true,
    };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
};

export async function maerkQueryResolved(_id) {
  try {
    await connect();

    if (!_id) {
      return {
        message: `Please select a Query to Resolve`,
        type: "error",
        success: false,
      };
    }

    const query = await Query.findOne({ _id });

    if (!query) {
      return {
        message: `This Query does not exist`,
        type: "error",
        success: false,
      };
    }

    await Query.updateOne({ _id }, { resolved: true });
    revalidatePath("/misc/queries");

    return { message: "Query Resolved", type: "success", success: true };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
}

export async function deleteQuery(_id) {
  try {
    await connect();

    if (!_id) {
      return {
        message: `Please select a Query to Delete`,
        type: "error",
        success: false,
      };
    }

    const query = await Query.findOne({ _id });

    if (!query) {
      return {
        message: `This Query does not exist`,
        type: "error",
        success: false,
      };
    }

    await Query.deleteOne({ _id });

    return { message: "Query Deleted", type: "success", success: true };
  } catch (error) {
    return { message: error.message, type: "error", success: false };
  }
}
