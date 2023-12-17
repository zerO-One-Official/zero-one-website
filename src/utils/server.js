import mongoose from "mongoose";
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

export const deleteFile = async (file) => {
    if (!file) return;
    const key = file?.split('https://utfs.io/f/');
    await utapi.deleteFiles(key[1]);
}

export const isValidMongooseId = (string) => {
    return mongoose.Types.ObjectId.isValid(string)
}