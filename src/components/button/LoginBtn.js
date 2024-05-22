"use client";
import Button from "../button/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { MdLogin } from "react-icons/md";
import ProfilePic from "../Profile/ProfilePic";

const LoginBtn = ({ unmount = () => { } }) => {
  const [active, setActive] = useState(false);


  const path = usePathname();
  const { data } = useSession();
  const username = data?.user?.username

  const popUpRef = useRef(null);

  useEffect(() => {
    const handleOutClick = (e) => {
      if (!popUpRef?.current?.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("click", handleOutClick);
    return () => document.removeEventListener("click", handleOutClick);
  });

  return path === "/login" ? null : data?.user ? (
    <div className="relative w-10 h-10">
      <button
        className="w-full h-full relative rounded-full  border border-white/20 cursor-pointer flex items-center justify-center overflow-hidden"
        onClick={() => setActive((prev) => !prev)}
      >
        <ProfilePic />
      </button>
      {active && (
        <div
          ref={popUpRef}
          className="absolute -right-[1rem] top-[75px] w-96 shadow-cus border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25  rounded-3xl flex flex-col gap-4 items-center p-4"
        >
          <h3 className="font-semibold">{data.user.email}</h3>
          <div className="flex flex-col items-center mx-auto gap-2">
            <div className="relative w-32 h-32 border border-white/10 rounded-full flex items-center justify-center">
              <ProfilePic />
            </div>
            <h2 className="capitalize text-lg font-bold">
              Hi, {data.user.name}
            </h2>
          </div>
          <div className="flex xs:flex-col gap-1 w-full">
            <Link
              href={`/user/${username}`}
              onClick={() => setActive(false)}
              className="flex-1 bg-white/5 p-2 py-3 flex justify-center rounded-l-2xl xs:rounded-2xl hover:bg-white/10 transition-all items-center"
            >
              Profile
            </Link>
            <button
              onClick={signOut}
              className="flex-1 bg-red-500 p-2 py-3 flex justify-center rounded-r-2xl xs:rounded-2xl hover:bg-red-600 transition-all items-center"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link href="/login" className="flex rounded-full" onClick={unmount}>
      <Button varrient={"filled"}>
        <MdLogin className="fill-inherit" />
        Login
      </Button>
    </Link>
  );
};

export default LoginBtn;
