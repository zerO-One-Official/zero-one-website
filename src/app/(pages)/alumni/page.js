import Image from "next/image";
import Link from "next/link";
import { GraduationCap, UserCircle2 } from "lucide-react";
import { getPublicAlumniDirectory } from "@/action/alumniJourney";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const metadata = {
  title: "Alumni | ZERO ONE",
  description: "Explore ZERO ONE alumni by graduating batch, education, and career timeline.",
};

export const dynamic = "force-dynamic";

export default async function AlumniDirectoryPage() {
  const alumni = await getPublicAlumniDirectory();
  const grouped = new Map();
  for (const person of alumni) {
    const key = person.batch || null;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(person);
  }
  const batches = [...grouped.entries()].sort(([first], [second]) => {
    if (first === null) return 1;
    if (second === null) return -1;
    return second - first;
  });

  return (
    <main className="container-70 flex min-h-[calc(100vh-88px)] flex-col gap-8 pt-16">
      <header className="space-y-2">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
          <GraduationCap className="h-5 w-5" /> ZERO ONE community
        </p>
        <h1 className="text-4xl font-bold">Our Alumni</h1>
        <p className="max-w-2xl text-muted-foreground">
          Browse alumni by graduating batch and explore their education, career milestones, and stories.
        </p>
      </header>

      {!alumni.length && (
        <p className="rounded-xl border p-6 text-muted-foreground">No alumni profiles are available yet.</p>
      )}

      {batches.map(([batch, people]) => (
        <section key={batch ?? "unknown"} className="space-y-4">
          <h2 className="border-b pb-2 text-2xl font-semibold">
            {batch ? `${batch} Batch` : "Batch not specified"}
            <span className="ml-2 text-base font-normal text-muted-foreground">({people.length})</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {people.map((person) => {
              const timeline = [...person.timeline]
                .filter((step) => step.company || step.institute)
                .sort((a, b) => a.year - b.year || (a.month || 1) - (b.month || 1));
              const currentMilestone = timeline[timeline.length - 1];
              return (
                <Link
                  key={person._id}
                  href={`/alumni/${person.username}`}
                  aria-label={`View ${person.firstName} ${person.lastName || ""}'s alumni profile`}
                  className="rounded-2xl border p-4 transition-colors hover:border-accent/50 hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center gap-3">
                    {person.profilePic
                      ? <Image unoptimized src={person.profilePic} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                      : <UserCircle2 aria-hidden="true" className="h-14 w-14 text-muted-foreground" />}
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold capitalize">{person.firstName} {person.lastName || ""}</h3>
                      {person.branch && <p className="line-clamp-1 text-sm text-muted-foreground">{person.branch}</p>}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-accent">{batch ? `Batch ${batch}` : "Batch not specified"}</p>
                  {currentMilestone && (
                    <p className="mt-3 border-t pt-3 text-sm text-muted-foreground">
                      Currently at{" "}
                      <span className="font-medium text-foreground">
                        {currentMilestone.company?.name || currentMilestone.institute?.name}
                      </span>{" "}
                      since {MONTHS[(currentMilestone.month || 1) - 1]} {currentMilestone.year}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
