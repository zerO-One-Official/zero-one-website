"use server";

import connect from "@/lib/dbConnect"; // Ensure correct path to DB connection
import Resource from "@/models/Resouces"; // Ensure correct path to Resource model
import { revalidatePath } from "next/cache";

// ✅ Server Action for adding a new resource (POST)
export async function addResource(formData) {
  try {
    await connect();

    const { domain, description, image, topics } = formData;

    // Validate input
    if (!domain) {
      return {
        success: false,
        message: "Domain is required",
        type: "error",
      };
    }

    const existingResources = await Resource.findOne({ domain });

    if (existingResources) {
      return {
        success: false,
        message: "Resource already exists",
        type: "error",
      };
    }

    const newResource = new Resource({
      domain,
      description,
      image,
      topics,
    });

    return {
      success: true,
      message: "Added Successfully",
      type: "success",
      newResource,
    };
  } catch (error) {
    console.error("Error updating resource count:", error);
    return {
      success: false,
      message: error.message || "Internal server error",
      type: "error",
    };
  }
}
