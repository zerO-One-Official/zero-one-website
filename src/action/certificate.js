"use server";
import dbConnect from "@/lib/dbConnect";
import Certificate from "@/models/Certificate";
import Template from "@/models/Template";
import User from "@/models/Users";
import { convertIdsToString } from "@/utils/helper";
import { deleteFile, isValidMongooseId } from "@/utils/server";
import { revalidatePath } from "next/cache";

dbConnect();

export const getTemplates = async () => {
  try {
    const templates = await Template.find().lean();

    return templates;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getTemplate = async (_id) => {
  try {
    if (!isValidMongooseId(_id))
      return {
        template: null,
        type: "error",
        message: "Invalid template ID",
      };

    const template = await Template.findOne({ _id }).lean();

    return template;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getCertificates = async () => {
  try {
    const certificates = await Certificate.find({})
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

    return certificates;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getCertificate = async (certificateNumber) => {
  try {
    const certificate = await Certificate.findOne({ certificateNumber })
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
};
export const getUserCertificates = async (_id) => {
  try {
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

    return certificates;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const uploadCertificateTemplate = async (data) => {
  try {
    await Template.create(data);
    revalidatePath("/misc/certificates/templates");
    return {
      type: "success",
      message: "Template uploaded successfully",
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
    };
  }
};
export const uploadCertificate = async (data) => {
  try {
    await Certificate.create(data);
    revalidatePath("/misc/certificates");
    return {
      type: "success",
      message: "Certificate uploaded successfully",
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
    };
  }
};
export const deleteCertificate = async (_id) => {
  try {
    await Certificate.deleteOne({ _id });
    revalidatePath("/misc/certificates");
    return {
      type: "success",
      message: "Certificate deleted successfully",
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
    };
  }
};
export const deleteTemplate = async (_id) => {
  try {
    const template = await Template.findOne({ _id });
    await deleteFile(template.url);
    await Template.deleteOne({ _id });
    await Certificate.deleteMany({ template: _id });
    revalidatePath("/misc/certificates/templates");
    revalidatePath("/misc/certificates");
    return {
      type: "success",
      message: "Template deleted successfully",
    };
  } catch (error) {
    return {
      type: "error",
      message: error.message,
    };
  }
};
