"use server";
import Gallery from "@/models/Gallery";
import connect from "@/utils/dbConnect";
import { deleteFile } from "@/utils/server";
import { convertIdsToString } from "@/utils/helper";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const getGalleryImages = cache(async () => {
  try {
    await connect();

    const gallery = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    return convertIdsToString(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return { message: error.message, success: false, type: "error" };
  }
});

export const addGalleryImages = async (eventName, urls) => {
  try {
    await connect();

    if (!eventName || !urls || urls.length === 0) {
      return {
        error: "Event name and at least one image URL are required",
        success: false,
        type: "error",
      };
    }

    const insertingData = urls.map((url) => ({ eventName, url }));
    await Gallery.insertMany(insertingData);

    revalidatePath("/misc/gallery");

    return {
      message: "Images added successfully",
      success: true,
      type: "success",
    };
  } catch (error) {
    console.error("Error adding gallery images:", error);
    return { message: error.message, success: false, type: "error" };
  }
};

export const deleteGalleryImage = async (_id) => {
  try {
    await connect();

    if (!_id) {
      return {
        message: "Please select an image to delete",
        success: false,
        type: "error",
      };
    }

    const image = await Gallery.findOne({ _id });
    if (!image) {
      return {
        message: "This image does not exist",
        success: false,
        type: "error",
      };
    }

    await deleteFile(image.url);
    await Gallery.deleteOne({ _id });
    revalidatePath("/misc/gallery");

    return {
      message: "Image deleted successfully",
      success: true,
      type: "success",
    };
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return { message: error.message, success: false, type: "error" };
  }
};
