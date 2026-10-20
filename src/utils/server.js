import User from "@/models/User";
import mongoose from "mongoose";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({});

export const deleteFile = async (file) => {
  try {
    if (typeof file !== "string" || !file) return false;
    const match = file.match(/^https:\/\/(?:utfs\.io|[a-z0-9-]+\.ufs\.sh)\/f\/([^/?#]+)(?:[?#].*)?$/i);
    if (!match) return false;
    const result = await utapi.deleteFiles(match[1]);
    if (result?.success === false) throw new Error("UploadThing did not delete the file.");
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadFile = async (file) => {
  if (!file) return null;

  try {
    const formattedFile = new File([file], file.name, { type: file.type });

    const { data, error } = await utapi.uploadFiles(formattedFile);
    if (error) {
      throw new Error(error);
    }
    return data.ufsUrl;
  } catch (error) {
    console.error("File upload failed:", error);
    throw new Error(error.message);
  }
};

export const isValidMongooseId = (str) => {
  return mongoose.Types.ObjectId.isValid(str);
};

export async function checkDuplicateUser(field, value, excludeUserId) {
  const duplicate = await User.findOne({
    [field]: value,
    ...(excludeUserId ? { _id: { $ne: excludeUserId } } : {}),
  }).select([field]);
  return duplicate;
}
