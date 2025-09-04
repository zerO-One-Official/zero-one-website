"use server";
import Certificate from "@/models/Certificate";
import Template from "@/models/Template";
import User from "@/models/User";
import connect from "@/utils/dbConnect";
import { convertIdsToString } from "@/utils/helper";
import { deleteFile, isValidMongooseId } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getTemplates = cache(async () => {
  try {
    await connect();
    const templates = await Template.find().lean();

    return convertIdsToString(templates);
  } catch (error) {
    console.log(error);
    return [];
  }
});
export const getTemplate = cache(async (_id) => {
  try {
    await connect();
    if (!isValidMongooseId(_id))
      return {
        template: null,
        type: "error",
        message: "Invalid template ID",
      };

    const template = await Template.findOne({ _id }).lean();

    return convertIdsToString(template);
  } catch (error) {
    console.log(error);
    return null;
  }
});
export const getCertificates = cache(async () => {
  try {
    await connect();
    const certificates = await Certificate.find({})
      .sort({ createdAt: -1 })
      .populate([
        {
          model: Template,
          path: "template",
        },
        {
          model: User,
          path: "user",
        },
      ])
      .lean();

    return convertIdsToString(certificates);
  } catch (error) {
    console.log(error);
    return [];
  }
});
export const getCertificate = cache(async (certificateNumber) => {
  try {
    await connect();
    const certificate = await Certificate.findOne({ certificateNumber })
      .sort({ createdAt: -1 })
      .populate([
        {
          model: Template,
          path: "template",
        },
        {
          model: User,
          path: "user",
        },
      ])
      .lean();

    return convertIdsToString(certificate);
  } catch (error) {
    console.log(error);
    return null;
  }
});
export const getUserCertificates = cache(async (_id) => {
  try {
    await connect();
    if (!isValidMongooseId(_id))
      return {
        template: null,
        type: "error",
        message: "Invalid UserID",
      };

    const certificates = await Certificate.find({ user: _id })
      .populate([
        {
          model: Template,
          path: "template",
        },
        {
          model: User,
          path: "user",
        },
      ])
      .lean();

    return convertIdsToString(certificates);
  } catch (error) {
    console.log(error);
    return [];
  }
});
