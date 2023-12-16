import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

export const deleteFile = async (file) => {
    if (!file) throw new Error('no file specified');

    const key = file?.split('https://utfs.io/f/');
    await utapi.deleteFiles(key[1]);
}
