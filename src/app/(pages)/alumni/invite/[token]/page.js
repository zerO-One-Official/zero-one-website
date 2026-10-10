import { notFound } from "next/navigation";
import { getAlumniJourneyByInvite } from "@/action/alumniJourney";
import AlumniJourneyEditor from "@/components/alumni/AlumniJourneyEditor";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: "Complete your alumni journey | ZERO ONE",
    robots: { index: false, follow: false },
  };
}

export default async function AlumniJourneyInvitePage({ params }) {
  const { token } = await params;
  const data = await getAlumniJourneyByInvite(token);
  if (!data) notFound();

  const name = [data.user.firstName, data.user.lastName].filter(Boolean).join(" ");
  return (
    <main className="container-70 flex min-h-[calc(100vh-88px)] flex-col gap-6 pt-16">
      <header>
        <h1 className="text-3xl font-semibold">{name}&apos;s Alumni Journey</h1>
        <p className="mt-2 text-muted-foreground">
          Complete your education and career timeline, journey, insights, and advice. This secure invitation expires in 30 days.
        </p>
      </header>
      <section className="rounded-2xl border p-5">
        <AlumniJourneyEditor
          username={data.user.username}
          inviteToken={token}
          initialValue={data.journey}
          companies={data.companies}
          institutes={data.institutes}
        />
      </section>
    </main>
  );
}
