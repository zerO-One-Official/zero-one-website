import { notFound } from "next/navigation";
import { getAlumniJourney } from "@/action/alumniJourney";
import { getUser } from "@/action/user";
import { normalizeDesignations } from "@/lib/designations";
import AlumniJourneyEditor from "@/components/alumni/AlumniJourneyEditor";
import AlumniJourneyView from "@/components/alumni/AlumniJourneyView";

export async function generateMetadata({ params }) {
  const { username } = await params;
  const user = await getUser(username);
  return { title: user ? `${user.firstName} ${user.lastName || ""} Alumni Journey` : "Alumni Journey" };
}

export default async function AlumniJourneyPage({ params }) {
  const { username } = await params;
  const profile = await getUser(username);
  if (!profile || !normalizeDesignations(profile.designation).includes("ALUMNI")) notFound();
  const data = await getAlumniJourney(username);
  const name = [data.user.firstName, data.user.lastName].filter(Boolean).join(" ");
  return (
    <main className="container-70 flex min-h-[calc(100vh-88px)] flex-col gap-6 pt-16">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-3xl font-semibold">{name}&apos;s Alumni Journey</h1>
          <p className="text-muted-foreground">Education, career milestones, insights, and advice.</p>
        </div>
      </div>
      {data.canEdit && (
        <section className="rounded-2xl border p-5">
          <h2 className="mb-4 text-xl font-semibold">Edit your journey</h2>
          <AlumniJourneyEditor username={username} initialValue={data.journey} companies={data.companies} institutes={data.institutes} />
        </section>
      )}
      <section className="rounded-2xl border p-5">
        {!data.canEdit && <h2 className="mb-5 text-2xl font-semibold">Alumni journey</h2>}
        <AlumniJourneyView journey={data.journey} />
      </section>
    </main>
  );
}
