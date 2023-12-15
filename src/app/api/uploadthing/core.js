import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();


export const ourFileRouter = {
    profilePicUploader: f({ image: { maxFileSize: "512KB", maxFileCount: 1 } })
        // .middleware(async ({ req }) => {
        //     return { userId: user.id };
        // })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);

            return { uploadedBy: metadata.userId };
        }),
};
