import Link from "next/link";
import { notFound } from "next/navigation";
import { Github, GraduationCap, Linkedin, Mail, Phone, UserCircle2 } from "lucide-react";
import { getAlumniJourney } from "@/action/alumniJourney";
import { getUser } from "@/action/user";
import AlumniJourneyView from "@/components/alumni/AlumniJourneyView";
import { normalizeDesignations } from "@/lib/designations";
import { getUserBatch } from "@/lib/userBatch";
import ProfilePhotoPreview from "@/components/profile/ProfilePhotoPreview";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const user = await getUser(username);
  if (!user || !normalizeDesignations(user.designation).includes("ALUMNI") || user.showOnWebsite !== true) {
    return { title: "Alumni profile | ZERO ONE" };
  }
  return { title: `${user.firstName} ${user.lastName || ""} | ZERO ONE Alumni` };
}

export default async function AlumniProfilePage({ params }) {
  const { username } = await params;
  const session = await getServerSession(options);
  const user = await getUser(username);
  if (!user || !normalizeDesignations(user.designation).includes("ALUMNI")) notFound();
  const isOwnProfile = session?.user?.username === username;
  if (user.showOnWebsite !== true && !isOwnProfile) notFound();
  const data = await getAlumniJourney(username);
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const batch = getUserBatch(user);

  return (
    <main className="container-70 flex min-h-[calc(100vh-88px)] flex-col gap-6 pt-16">
      <div className="flex flex-wrap items-center justify-end gap-3">
        {data.canEdit && (
          <Link href={`/user/${username}/journey`} className="rounded-md border px-4 py-2 text-sm hover:bg-secondary">
            Edit alumni journey
          </Link>
        )}
      </div>

      <section className="flex flex-col items-center gap-6 rounded-3xl border p-6 text-center sm:flex-row sm:items-center sm:text-left">
        {user.profilePic
          ? <ProfilePhotoPreview src={user.profilePic} width={144} height={144} alt={`${name} profile photo`} className="h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36" />
          : <UserCircle2 aria-hidden="true" className="h-28 w-28 text-muted-foreground sm:h-36 sm:w-36" />}
        <div className="min-w-0 flex-1 space-y-2">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent sm:justify-start">
            <GraduationCap className="h-4 w-4" /> Alumni profile
          </p>
          <h1 className="text-3xl font-bold capitalize sm:text-4xl">{name}</h1>
          {user.branch && <p className="text-lg text-muted-foreground">{user.branch}</p>}
          {(user.roll || batch) && (
            <p className="text-sm text-muted-foreground">
              {user.roll && <span>Roll {user.roll}</span>}
              {user.roll && batch && <span> · </span>}
              {batch && <span>Batch {batch}{user.lateralEntry ? " (lateral entry)" : ""}</span>}
            </p>
          )}
          {user.bio && <p className="max-w-2xl text-foreground/80">{user.bio}</p>}
        </div>
      </section>

      <section className="grid gap-3 rounded-2xl border p-5 sm:grid-cols-2 lg:grid-cols-4">
        {user.email && (
          <a href={`mailto:${user.email}`} className="flex min-w-0 items-center gap-2 text-sm hover:text-accent">
            <Mail className="h-4 w-4 shrink-0" /><span className="truncate">{user.email}</span>
          </a>
        )}
        {isOwnProfile && user.phone && (
          <a href={`tel:${user.phone}`} className="flex items-center gap-2 text-sm hover:text-accent">
            <Phone className="h-4 w-4 shrink-0" /><span>{user.phone}</span>
          </a>
        )}
        {user.gitHub && (
          <a href={user.gitHub} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 text-sm hover:text-accent">
            <Github className="h-4 w-4 shrink-0" /><span className="truncate">GitHub</span>
          </a>
        )}
        {user.linkedIn && (
          <a href={user.linkedIn} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 text-sm hover:text-accent">
            <Linkedin className="h-4 w-4 shrink-0" /><span className="truncate">LinkedIn</span>
          </a>
        )}
      </section>

      <section className="rounded-3xl border p-5 sm:p-7">
        <h2 className="mb-5 text-2xl font-semibold">Education and career journey</h2>
        <AlumniJourneyView journey={data.journey} />
      </section>
    </main>
  );
}
