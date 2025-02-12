"use server";

import connect from "@/lib/dbConnect"; // Ensure correct path to DB connection
import Resource from "@/models/Resouces"; // Ensure correct path to Resource model
import { revalidatePath } from "next/cache";

// ✅ Server Action for adding a new resource (POST)
export async function addResource(formData) {
  try {
    await connect();

    console.log("Received FormData:", formData); // Debugging

    // Validate input
    if (!formData.domains || formData.domains.length === 0 || !formData.domains[0].title) {
      return { success: false, message: "At least one domain is required" };
    }

    for (const newDomain of formData.domains) {
      // Check if any document contains this domain
      let existingResource = await Resource.findOne({
        "domains.title": { $regex: new RegExp(`^${newDomain.title}$`, "i") }, // Case-insensitive search
      });

      if (existingResource) {
        // ✅ If the domain exists, update the existing document
        let existingDomain = existingResource.domains.find(
          (domain) => domain.title.toLowerCase() === newDomain.title.toLowerCase()
        );

        if (existingDomain) {
          // ✅ If domain exists, merge topics and subtopics
          newDomain.topics.forEach((newTopic) => {
            let existingTopic = existingDomain.topics.find(
              (topic) => topic.title.toLowerCase() === newTopic.title.toLowerCase()
            );

            if (existingTopic) {
              // ✅ If topic exists, merge subtopics
              newTopic.subtopics.forEach((newSubtopic) => {
                let existingSubtopic = existingTopic.subtopics.find(
                  (subtopic) => subtopic.title.toLowerCase() === newSubtopic.title.toLowerCase()
                );

                if (!existingSubtopic) {
                  // Add new subtopic if it doesn't exist
                  existingTopic.subtopics.push(newSubtopic);
                }
              });
            } else {
              // Add new topic if it doesn't exist
              existingDomain.topics.push(newTopic);
            }
          });
        }

        // Save the updated document
        await existingResource.save();
      } else {
        // ✅ If domain is new, create a new document in the collection
        const newResource = new Resource({
          domains: [newDomain], // Create a new collection for the domain
        });

        await newResource.save();
      }
    }

    // ✅ Update the total number of resources based on subtopics count
    await updateResourceCount();

    // Revalidate the resources page to reflect changes
    revalidatePath("/resources");

    return { success: true, message: "Resource added successfully!" };
  } catch (error) {
    console.error("Error adding resource:", error);
    return { success: false, message: "Failed to add resource" };
  }
}

// ✅ Server Action to fetch all resources (GET)
export async function getResources() {
  try {
    await connect();

    // Fetch all resources from the database
    const resources = await Resource.find();

    console.log("Fetched Resources:", resources); // Debugging log

    return resources || []; // ✅ Always return an array
  } catch (error) {
    console.error("Error fetching resources:", error);
    return []; // ✅ Return an empty array on error
  }
}

// ✅ Function to update total number of resources (Total subtopics count)
async function updateResourceCount() {
  try {
    const resources = await Resource.find();
    let totalSubtopics = 0;

    resources.forEach((resource) => {
      resource.domains.forEach((domain) => {
        domain.topics.forEach((topic) => {
          totalSubtopics += topic.subtopics.length; // Count subtopics
        });
      });
    });

    // ✅ Update a central document to store the total count (if applicable)
    await Resource.updateOne({}, { numResources: totalSubtopics });

    console.log("Updated numResources:", totalSubtopics);
  } catch (error) {
    console.error("Error updating resource count:", error);
  }
}
