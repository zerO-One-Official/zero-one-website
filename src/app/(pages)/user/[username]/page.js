import Image from "next/image";
import { BiEdit, BiLogoLinkedinSquare } from "react-icons/bi";
import { HiEnvelope } from "react-icons/hi2";
import { IoLogoGithub, IoSchool } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { PiGenderIntersexBold } from "react-icons/pi";
import { DiCodeigniter } from "react-icons/di";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { getUser } from "@/action/user";
import BottomGlitter from "@/components/StyledText/BottomGlitter";
import { getUserCertificates } from "@/action/certificate";
import FilledCertificate from "@/components/certificates/FilledCertificate";
import { getUserEvents } from "@/action/event";

function capitalizeFirstChar(str) {
  if (str.length === 0) return str; // Handle empty string case
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function generateMetadata({ params }) {
  // read route params
  const { username } = await params;
  const user = await getUser(username);
  const name = user
    ? `${capitalizeFirstChar(user.firstName)} ${capitalizeFirstChar(
        user.lastName
      )}`
    : "User not Found";

  return {
    title: name,
  };
}

const UserPage = async ({ params }) => {
  const session = await getServerSession(options);

  const loggedInUser = session?.user.username;

  const { username } = await params;

  const user = await getUser(username);

  const userEvents = await getUserEvents(user?._id);

  const certificates = await getUserCertificates(user?._id);

  return user ? (
    <div className="container-70 flex flex-col gap-4 min-h-[calc(100vh-88px)] pt-16">
      <section className="flex flex-col items-center gap-6 border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25 shadow-cus  p-6 rounded-3xl relative">
        <div className="flex w-full md:gap-6 gap-10 items-center sm:flex-col">
          <div className="p-2 border-4 md:border-2 border-accent rounded-full shrink-0">
            <Image
              src={user?.profilePic}
              width={160}
              height={160}
              alt={user?.firstName}
              className="md:w-20 md:h-20 lg:w-32 lg:h-32 w-36 h-36 object-cover rounded-full shadow"
            />
          </div>
          <div className="p-4 ">
            <h1 className="capitalize text-4xl md:text-3xl font-semibold sm:text-center">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-zinc-500 capitalize text-xl sm:text-lg sm:text-center font-semibold">
              {user.branch}
            </p>
            <p className="text-zinc-500 text-lg font-bold flex items-center sm:justify-center">
              <MdAlternateEmail className="fill-white/40 md:w-4 md:h-4 w-6 h-6 mr-1" />
              {user.username}
            </p>

            <p className="capitalize text-accent text-lg font-bold flex items-center sm:justify-center">
              {user.position}
            </p>
          </div>
          {username === loggedInUser ? (
            <Link
              href={`/user/${loggedInUser}/edit`}
              className="group block rounded-full absolute top-4 right-4 p-4 shadow-btn border border-l-white/5 border-t-white/5 border-r-black/25 border-b-black/25"
            >
              <BiEdit className="w-4 h-4 fill-foreground/50 group-hover:fill-foreground" />
            </Link>
          ) : null}
        </div>
        <div className="flex gap-6 xl:flex-col w-full">
          {user?.bio ? (
            <>
              <div className="flex-1 p-4 space-y-2">
                <p className="text-zinc-500 flex items-baseline font-semibold">
                  <DiCodeigniter className="w-4 h-4 fill-zinc-500 mr-2" />
                  Bio
                </p>
                <p
                  className="text-foreground/80 flex items-center"
                  title={user.bio}
                >
                  {user.bio.slice(0, 100)}
                  {user.bio.length > 100 ? "..." : ""}
                </p>
              </div>

              <div className="xl:w-full xl:h-[2px] w-[2px] h-inherit bg-white/10 rounded-md" />
            </>
          ) : null}

          <div className="flex-1 p-4 space-y-2">
            <p className="text-zinc-500 flex items-center">
              <PiGenderIntersexBold className="fill-zinc-500 md:w-4 md:h-4 w-6 h-6 mr-2" />
              {user.gender}
            </p>
            <p className="text-zinc-500 flex items-center">
              <IoSchool className="fill-zinc-500 md:w-4 md:h-4 w-6 h-6 mr-2" />
              {user.roll}
            </p>
          </div>

          <div className="xl:w-full xl:h-[2px] w-[2px] h-inherit bg-white/10 rounded-md" />

          <div className="flex-1 p-4 space-y-2">
            <div className="flex items-center">
              <HiEnvelope className="fill-zinc-500 text-zinc-500 md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0" />
              <a
                href={`mailto:${user.email}`}
                className="text-zinc-500 overflow-hidden text-ellipsis"
              >
                {user.email}
              </a>
            </div>
            {user.gitHub ? (
              <div className="flex items-center">
                <IoLogoGithub className="fill-zinc-500  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0" />
                <a
                  href={user.gitHub}
                  className="text-zinc-500 overflow-hidden text-ellipsis"
                >
                  {user.gitHub}
                </a>
              </div>
            ) : null}
            {user.linkedIn ? (
              <div className="flex items-center">
                <BiLogoLinkedinSquare className="fill-zinc-500  md:w-4 md:h-4 w-6 h-6 mr-2 shrink-0" />
                <a
                  href={user.linkedIn}
                  className="text-zinc-500 overflow-hidden text-ellipsis"
                >
                  {user.linkedIn}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>
      <div className="flex gap-5 xl:gap-2 xl:flex-col flex-row">
        <section className="mt-2 space-y-2 flex-1">
          {certificates.length > 0 ? (
            <>
              <BottomGlitter text={"Certificates"} className={"max-w-fit"} />
              <div className="gap-2 grid grid-cols-[repeat(auto-fit,minmax(230px,240px))]">
                {certificates.map((certificate, index) => (
                  <Link
                    href={`/certificate?cn=${certificate.certificateNumber}`}
                    className="flex flex-col card p-4"
                    key={index}
                  >
                    <FilledCertificate
                      certificate={JSON.stringify(certificate)}
                    />
                    <h3 className="text-lg pt-2 font-semibold ">
                      {certificate.template.eventName}
                    </h3>
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </section>
        <section className="mt-2 space-y-2 xl:ml-0 ml-auto">
          {userEvents.length > 0 ? (
            <>
              <BottomGlitter text={"Activities"} className={"max-w-fit"} />
              <div className="gap-2 grid grid-cols-1 xl:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
                {userEvents.map((event, index) => (
                  <Link
                    href={`/events/${event.name}`}
                    className="card flex items-center justify-center h-16"
                    key={index}
                  >
                    <h3 className="text-lg pt-2 font-semibold ">
                      {event.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  ) : (
    <section className="container-70">
      <div className="mt-16 flex flex-col items-center gap-6 border border-white/5 shadow-cus  p-6 rounded-3xl relative">
        <h2 className="text-xl">User Not Found</h2>
      </div>
    </section>
  );
};

export default UserPage;
