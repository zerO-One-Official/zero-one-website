import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";
import { options } from "../auth/[...nextauth]/options";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  profilePicUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await getServerSession(options);
      const id = session?.user?._id;
      if (!session || !id) throw new UploadThingError("Unauthorized");
      return { userId: id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
};
