import MarkdownContent from "@/components/alumni/MarkdownContent";
import OrganizationLogo from "@/components/alumni/OrganizationLogo";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const sections = [
  ["journey", "My journey"],
  ["insights", "Insights"],
  ["advice", "Advice for others"],
];

export default function AlumniJourneyView({ journey }) {
  const timeline = [...(journey.timeline || [])]
    .filter((step) => step.company || step.institute)
    .sort((a, b) => a.year - b.year || (a.month || 1) - (b.month || 1));
  const markdownSections = sections.filter(([key]) => journey[key]?.trim());
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Timeline</h2>
        {!timeline.length ? <p className="text-muted-foreground">No timeline milestones shared yet.</p> : (
          <ol className="relative ml-3 space-y-6 border-l pl-6">
            {timeline.map((step, index) => {
              const institute = step.institute;
              const company = step.company;
              const organization = company || institute;
              const logo = company?.logo || company?.image || institute?.logo || institute?.image;
              const companyUrl = /^https?:\/\//i.test(company?.url || "") ? company.url : null;
              return (
                <li key={step._id || `${step.year}-${step.month || 1}-${index}`} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
                  <p className="text-sm font-semibold text-accent">{months[(step.month || 1) - 1]} {step.year}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <OrganizationLogo
                      src={logo}
                      alt={`${organization?.name || "Organization"} logo`}
                      organizationType={company ? "company" : "institute"}
                    />
                    <div>
                      <h3 className="font-semibold">
                        {companyUrl
                          ? <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline">{organization?.name || "Organization"}</a>
                          : organization?.name || "Organization"}
                      </h3>
                      <p className="text-xs text-muted-foreground">{company ? "Company" : institute?.type || "Institute"}</p>
                    </div>
                  </div>
                  {step.roleOrProgram && <p className="mt-2 text-sm text-muted-foreground">{step.roleOrProgram}</p>}
                  {step.gateScore > 0 && <p className="mt-1 text-sm">GATE score: {step.gateScore}</p>}
                  {step.details?.trim() && (
                    <MarkdownContent className="mt-3">{step.details}</MarkdownContent>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </section>
      {markdownSections.map(([key, heading]) => (
        <section key={key} className="space-y-3">
          <h2 className="text-2xl font-semibold">{heading}</h2>
          <MarkdownContent>{journey[key]}</MarkdownContent>
        </section>
      ))}
    </div>
  );
}
