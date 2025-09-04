import User from "@/models/User";
import mongoose from "mongoose";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({});

export const deleteFile = async (file) => {
  try {
    if (!file) return;

    const prefixes = ["https://utfs.io/f/", "https://t8ycfkr4pi.ufs.sh/f/"];

    const prefix = prefixes.find((p) => file.startsWith(p));
    if (!prefix) return;

    const key = file.replace(prefix, ""); // remove the matched prefix
    await utapi.deleteFiles(key);
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

export async function checkDuplicateUser(field, value) {
  const duplicate = await User.findOne({ [field]: value }).select([field]);
  return duplicate;
}
