"use server";

import connect from "@/lib/dbConnect"; // Ensure correct path to DB connection
import Resources from "@/models/Resources"; // Ensure correct path to Resource model
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

    const existingResources = await Resources.findOne({
      $or: [
        { domain },
        {
          domain: { $regex: new RegExp("^" + domain + "$", "i") },
        },
      ],
    });

    if (existingResources) {
      return {
        success: false,
        message: "Resource already exists",
        type: "error",
      };
    }

    const newResource = await Resources.create({
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

export async function getResource() {
  try {
    await connect();
    const resources = await Resources.find();
    return resources;
  } catch (error) {
    return [];
  }
}

export async function getTopics(slug) {
  try {
    await connect();
    const domain = await Resources.find({ slug });
    return domain.topics || [];
  } catch (error) {
    return [];
  }
}

export async function getSubTopics(domainSlug, topicSlug) {
  try {
    await connect();
    const domain = await Resources.find({
      $and: [{ slug: domainSlug }, { "topics.slug": topicSlug }],
    });

    return domain.topics || [];
  } catch (error) {
    return [];
  }
}
