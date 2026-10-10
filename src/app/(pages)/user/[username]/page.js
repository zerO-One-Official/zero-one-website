import { normalizeDesignations } from "@/lib/designations";
import { getUserBatch } from "@/lib/userBatch";
import ProfilePhotoPreview from "@/components/Profile/ProfilePhotoPreview";
import { BiEdit, BiLogoLinkedinSquare } from "react-icons/bi";
import { HiEnvelope } from "react-icons/hi2";
import { IoLogoGithub, IoSchool } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { PiGenderIntersexBold } from "react-icons/pi";
import { DiCodeigniter } from "react-icons/di";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { getUser, getUserContests, getUsers } from "@/action/user";
import BottomGlitter from "@/components/StyledText/BottomGlitter";
import { getUserCertificates } from "@/action/certificate";
import FilledCertificate from "@/components/certificates/FilledCertificate";
import { capitalizeFirstLetter } from "@/utils/helper";
import { notFound } from "next/navigation";
import { UserCircle2 } from "lucide-react";

function ProfileDetail({ icon: Icon, label, children }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-1 break-words text-sm text-foreground/90">{children}</div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  // read route params
  const { username } = await params;
  const user = await getUser(username);
  const name = user
    ? capitalizeFirstLetter(`${user.firstName} ${user.lastName}`)
    : "User not Found";

  return {
    title: name,
  };
}

export const generateStaticParams = async () => {
  const users = await getUsers();
  return users?.map((user) => {
    return {
      username: user.username,
    };
  });
};

const UserPage = async ({ params }) => {
  const { username } = await params;

  if (!username) notFound();

  const session = await getServerSession(options);

  const loggedInUser = session?.user?.username;

  const user = await getUser(username);
  const isAlumni = normalizeDesignations(user?.designation).includes("ALUMNI");
  const canViewAlumniProfile = isAlumni && (user.showOnWebsite === true || loggedInUser === username);

  const userEvents = await getUserContests(user?._id);

  const certificates = await getUserCertificates(user?._id);

  return user ? (
    <div className="container-70 flex flex-col gap-4 min-h-[calc(100vh-88px)] pt-16">
      <section className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.02] p-4 shadow-cus sm:gap-6 sm:p-6">
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="shrink-0 rounded-full border-2 border-accent p-1.5 sm:border-4 sm:p-2">
            {user?.profilePic && user?.profilePic !== "" ? (
              <ProfilePhotoPreview
                src={user.profilePic}
                alt={`${user.firstName} ${user.lastName || ""} profile photo`}
                className="h-20 w-20 rounded-full object-cover shadow sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              />
            ) : (
              <UserCircle2 aria-hidden="true" className="h-20 w-20 rounded-full text-muted-foreground sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
            )}
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-semibold capitalize sm:text-4xl">
              {user.firstName} {user.lastName}
            </h1>
            {user.branch && <p className="mt-1 text-base font-medium text-muted-foreground">{user.branch}</p>}
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
              <MdAlternateEmail aria-hidden="true" className="h-4 w-4 shrink-0" />
              {user.username}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              {normalizeDesignations(user.designation).map((designation) => (
                <span key={designation} className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                  {designation}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-2 sm:justify-end">
            {canViewAlumniProfile && (
              <Link
                href={`/alumni/${username}`}
                className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
              >
                <IoSchool aria-hidden="true" className="h-4 w-4 shrink-0" />
                Alumni profile
              </Link>
            )}
            {username === loggedInUser && (
            <Link
              href={`/user/${loggedInUser}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <BiEdit aria-hidden="true" className="h-4 w-4 shrink-0" />
              Edit profile
            </Link>
            )}
          </div>
        </div>
        <div className="grid w-full gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 xl:grid-cols-3">
          {user?.bio ? (
            <ProfileDetail icon={DiCodeigniter} label="Bio">
              <span title={user.bio}>
                {user.bio.slice(0, 140)}{user.bio.length > 140 ? "..." : ""}
              </span>
            </ProfileDetail>
          ) : null}
          {user.gender && (
            <ProfileDetail icon={PiGenderIntersexBold} label="Gender">
              <span className="capitalize">{user.gender.toLowerCase()}</span>
            </ProfileDetail>
          )}
          {user.roll && (
            <ProfileDetail icon={IoSchool} label="Roll and batch">
              {user.roll}
              {getUserBatch(user) && <> · {getUserBatch(user)} batch{user.lateralEntry ? " · Lateral entry" : ""}</>}
            </ProfileDetail>
          )}
          {user.email && (
            <ProfileDetail icon={HiEnvelope} label="Email">
              <a href={`mailto:${user.email}`} className="break-all hover:text-accent">
                {user.email}
              </a>
            </ProfileDetail>
          )}
          {user.gitHub && (
            <ProfileDetail icon={IoLogoGithub} label="GitHub">
              <a href={user.gitHub} target="_blank" rel="noopener noreferrer" className="break-all hover:text-accent">
                {user.gitHub}
              </a>
            </ProfileDetail>
          )}
          {user.linkedIn && (
            <ProfileDetail icon={BiLogoLinkedinSquare} label="LinkedIn">
              <a href={user.linkedIn} target="_blank" rel="noopener noreferrer" className="break-all hover:text-accent">
                {user.linkedIn}
              </a>
            </ProfileDetail>
          )}
        </div>
      </section>
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-5">
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
                    <FilledCertificate certificate={certificate} />
                    <h3 className="text-lg pt-2 font-semibold ">
                      {certificate.template.eventName}
                    </h3>
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </section>
        <section className="mt-2 ml-0 xl:ml-auto space-y-2">
          {userEvents.length > 0 ? (
            <>
              <BottomGlitter text={"Activities"} className={"max-w-fit"} />
              <div className="gap-2 grid grid-cols-1 xl:grid-cols-[repeat(auto-fill,minmax(230px,1fr))]">
                {userEvents.map((event, index) => (
                  <Link
                    href={`/contest/${event.slug}`}
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
