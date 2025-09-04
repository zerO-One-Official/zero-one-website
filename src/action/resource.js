"use server";

import Resource from "@/models/Resource";
import connect from "@/utils/dbConnect";
import { convertIdsToString } from "@/utils/helper";
import { cache } from "react";

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

    const existingResources = await Resource.findOne({
      $or: [
        { domain },
        {
          $or: [
            { domain: { $regex: new RegExp("^" + domain + "$", "i") } },
            { domain },
          ],
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

    const newResource = await Resource.create({
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

export const getResources = cache(async () => {
  try {
    await connect();

    const resources = await Resource.find({}).lean();

    return convertIdsToString(resources);
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const getResource = cache(async (slug) => {
  try {
    await connect();

    const resource = await Resource.findOne({ slug }).lean();

    return convertIdsToString(resource);
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const getTopics = cache(async (slug) => {
  try {
    await connect();
    const domain = await Resource.findOne({ slug }).lean();
    return domain;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getSubTopics = cache(async (domainSlug, topicSlug) => {
  try {
    await connect();
    // Find the domain and get only the specific topic's data
    const domain = await Resource.findOne(
      { slug: domainSlug, "topics.slug": topicSlug }, // Find matching domain & topic
      { "topics.$": 1 } // Retrieve only the matched topic
    ).lean();

    if (!domain || !domain.topics?.length) {
      return []; // If no data found, return empty array
    }

    // Extract the matched topic's subtopics
    const matchedTopic = domain.topics[0];

    // **Ensure only subtopics belonging to the requested topicSlug are sent**

    return convertIdsToString(matchedTopic);
  } catch (error) {
    console.error("Error fetching subtopics:", error);
    return [];
  }
});

export async function addTopics(topicdata) {
  try {
    await connect();
    const { domain, title, description, image, subtopics } = topicdata;
    if (!title || !domain) {
      return {
        success: false,
        message: "Title and domain are required",
        type: "error",
      };
    }
    const existingDomain = await Resource.findOne(
      { slug: { $regex: new RegExp("^" + domain + "$", "i") } },
      { topics: 1 }
    );
    if (!existingDomain) {
      return {
        success: false,
        message: `Domain "${domain}" not found. Please add the domain first.`,
        type: "error",
      };
    }
    if (!existingDomain.topics) {
      existingDomain.topics = [];
    }
    const titleExists = existingDomain.topics.some(
      (topic) => topic.title === title
    );
    if (titleExists) {
      return {
        success: false,
        message: "Title already exists, please add a new title",
        type: "error",
      };
    }
    existingDomain.topics.push({ title, description, image, subtopics });
    await existingDomain.save();
    return {
      success: true,
      message: "Topic added successfully",
      type: "success",
    };
  } catch (error) {
    console.error("Error adding topic:", error);
    return {
      success: false,
      message: error.message || "Internal server error",
      type: "error",
    };
  }
}

export async function addSubtopic(subtopicdata) {
  try {
    await connect();
    const { domain, topic, title, description, image, resourceUrl } =
      subtopicdata;
    if (!domain || !topic || !title || !resourceUrl) {
      return {
        success: false,
        message: "Domain, topic, title, and resource URL are required",
        type: "error",
      };
    }
    const existDomain = await Resource.findOne(
      {
        domains: { $regex: new RegExp("^" + domain + "$", "i") },
        "topics.title": { $regex: new RegExp("^" + topic + "$", "i") },
      },
      { "topics.$": 1 }
    );
    if (!existDomain) {
      return {
        success: false,
        message: `Topic "${topic}" not found. Please add the topic first.`,
        type: "error",
      };
    }
    const topicData = existDomain.topics[0];
    if (topicData.subtopics.some((subtopic) => subtopic.title === title)) {
      return {
        success: false,
        message: "Subtopic already exists, please add a new subtopic",
        type: "error",
      };
    }
    const result = await Resource.updateOne(
      {
        domain: { $regex: new RegExp("^" + domain + "$", "i") },
        "topics.title": { $regex: new RegExp("^" + topic + "$", "i") },
      },
      {
        $push: {
          "topics.$.subtopics": { title, description, image, resourceUrl },
        },
      }
    );
    if (result.modifiedCount === 0) {
      return {
        success: false,
        message: "Subtopic addition failed. Topic may not exist.",
        type: "error",
      };
    }
    return {
      success: true,
      message: "Subtopic added successfully",
      type: "success",
    };
  } catch (error) {
    console.error("Error adding subtopic:", error);
    return {
      success: false,
      message: error.message || "Internal server error",
      type: "error",
    };
  }
}
