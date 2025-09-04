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
      alt={data.user.name}
      className="object-cover object-center w-10 h-10 rounded-full"
    />
  ) : (
    <UserCircle2 className="w-full h-full" />
  );
};

export default ProfilePic;
