import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";
import { options } from "../auth/[...nextauth]/options";

const f = createUploadthing();


export const ourFileRouter = {
    profilePicUploader: f({ image: { maxFileSize: "512KB", maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            const session = await getServerSession(options);
            const id = session?.user?._id;
            if (!session || !id) return null;
            return { userId: id }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);

            return { uploadedBy: metadata.userId };
        }),
};
