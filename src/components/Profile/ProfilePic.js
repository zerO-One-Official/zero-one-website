"use client";

import { UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";

const ProfilePic = ({ quality = 80 }) => {
  const { data } = useSession();

  const image = useMemo(
    () => (data?.user?.profilePic ? data.user.profilePic : null),
    [data]
  );

  return image && image !== "" ? (
    <Image
      src={image}
      quality={quality}
      width={48}
      height={48}
      sizes="40px"
      alt={data.user.name}
      className="aspect-square h-10 w-10 rounded-full object-cover object-center"
    />
  ) : (
    <UserCircle2 className="w-full h-full" />
  );
};

export default ProfilePic;
