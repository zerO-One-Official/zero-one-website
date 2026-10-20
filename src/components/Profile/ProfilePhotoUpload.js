"use client";

import Image from "next/image";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { BiEdit } from "react-icons/bi";
import { toast } from "sonner";

const ProfilePhotoUpload = ({ profilePic }) => {
  const { update } = useSession();
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(profilePic);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageUrl?.startsWith("blob:")) return undefined;
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  const { startUpload, permittedFileInfo } = useUploadThing(
    "profilePicUploader",
    {
      onClientUploadComplete: async (res) => {
        setLoading(false);

        const uploadedProfilePic = res[0]?.ufsUrl || res[0]?.url;
        if (!uploadedProfilePic) {
          setImageUrl(profilePic);
          toast.error("The uploaded photo URL is missing.");
          return;
        }

        try {
          setLoading(true);
          const response = await fetch("/api/profile", {
            method: "PATCH",
            body: JSON.stringify({
              profilePic: uploadedProfilePic,
            }),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            setImageUrl(profilePic);
            toast[data.type || "error"](data.message || "Could not update profile photo.");
            return;
          }

          setImageUrl(uploadedProfilePic);
          await update({ user: { profilePic: uploadedProfilePic } });
          router.refresh();
          toast[data.type](data.message);
        } catch (error) {
          setImageUrl(profilePic);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      },
      onUploadError: (error) => {
        setLoading(false);
        setImageUrl(profilePic);
        toast.error(error.message);
      },
      onUploadBegin: () => {
        setLoading(true);
      },
    }
  );
  const uploadSelectedFile = useCallback((file) => {
    if (!file) return;
    if (file.size > 1024 * 1024) {
      toast.error("Image must be less than 1MB");
      return;
    }
    setImageUrl(URL.createObjectURL(file));
    setLoading(true);
    startUpload([file]);
  }, [startUpload]);

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: (acceptedFiles) => uploadSelectedFile(acceptedFiles[0]),
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div
      className={`select-none bg-white/10 w-32 h-32 rounded-full overflow-hidden border border-white/25 relative ${
        loading ? "animate-pulse " : "cursor-pointer group"
      }`}
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        type="file"
        disabled={loading}
      />

      <span className="group-hover:visible invisible transition-opacity z-50 bg-primary/70 absolute w-full h-full left-0 top-0 flex items-center justify-center pointer-events-none">
        <BiEdit className="w-6 h-6 " />
      </span>

      {imageUrl ? (
        <Image
          className="aspect-square h-full w-full rounded-full object-cover"
          style={{ userDrag: "none" }}
          width={150}
          height={150}
          sizes="128px"
          src={imageUrl}
          alt="Profile photo"
        />
      ) : (
        <span className="z-50 bg-white/10 absolute w-full h-full left-0 top-0 flex items-center justify-center pointer-events-none">
          <HiOutlineUserCircle className="w-full h-full" />
        </span>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;
