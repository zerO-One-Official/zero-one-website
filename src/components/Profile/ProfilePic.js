"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";

const ProfilePic = ({ quality = 80 }) => {
  const { data } = useSession();

  const image = useMemo(
    () => (data?.user?.profilePic ? data.user.profilePic : null),
    [data]
  );

  return image ? (
    <Image
      src={image}
      quality={quality}
      fill={true}
      alt={data.user.name}
      className="rounded-full object-cover object-center"
    />
  ) : (
    <HiOutlineUserCircle className="w-full h-full" />
  );
};

export default ProfilePic;
