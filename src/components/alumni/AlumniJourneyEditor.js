"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { saveAlumniJourney, saveAlumniJourneyByInvite } from "@/action/alumniJourney";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import MarkdownEditorField from "@/components/alumni/MarkdownEditorField";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const markdownFields = [
  { key: "journey", label: "My journey", description: "Share your journey, decisions, challenges and milestones.", maxLength: 20000 },
  { key: "insights", label: "Insights", description: "What did you learn along the way?", maxLength: 12000 },
  { key: "advice", label: "Advice for others", description: "Suggestions, mistakes to avoid and resources for others.", maxLength: 12000 },
];

function toEditorStep(step) {
  return {
    year: String(step.year),
    month: String(step.month || 1),
    company: step.company?._id || step.company || "",
    institute: step.institute?._id || step.institute || "",
    roleOrProgram: step.roleOrProgram || "",
    gateScore: step.gateScore == null ? "" : String(step.gateScore),
    details: step.details || "",
  };
}

function initialTimeline(steps) {
  return (steps || []).flatMap((step) => step.company && step.institute
    ? [
      toEditorStep({ ...step, institute: "" }),
      toEditorStep({ ...step, company: "", roleOrProgram: "", gateScore: "", details: "" }),
    ]
    : [toEditorStep(step)]);
}

export default function AlumniJourneyEditor({ username, initialValue, companies, institutes, inviteToken }) {
  const [value, setValue] = useState({
    timeline: initialTimeline(initialValue.timeline),
    journey: initialValue.journey || "",
    insights: initialValue.insights || "",
    advice: initialValue.advice || "",
  });
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const updateStep = (index, key, next) => setValue((current) => ({
    ...current,
    timeline: current.timeline.map((step, i) => i === index ? { ...step, [key]: next } : step),
  }));
  const setOrganization = (index, selected) => {
    const [type, id] = selected.split(":");
    updateStep(index, type === "company" ? "company" : "institute", id);
    updateStep(index, type === "company" ? "institute" : "company", "");
  };
  const save = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      const result = inviteToken
        ? await saveAlumniJourneyByInvite(inviteToken, value)
        : await saveAlumniJourney(username, value);
      toast[result.type](result.message);
      if (result.success) router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-8">
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Timeline</h2>
          <p className="text-sm text-muted-foreground">Each milestone covers one month and one company or institute. Add optional Markdown notes to each milestone.</p>
        </div>
        {value.timeline.map((step, index) => {
          const organization = step.company ? `company:${step.company}` : step.institute ? `institute:${step.institute}` : "";
          return (
            <fieldset key={index} disabled={busy} className="grid gap-4 rounded-xl border p-4 md:grid-cols-2">
              <legend className="px-2 font-medium">Milestone {index + 1}</legend>
              <div className="space-y-2">
                <label htmlFor={`journey-month-${index}`} className="text-sm font-medium">Month</label>
                <Select value={step.month} onValueChange={(month) => updateStep(index, "month", month)}>
                  <SelectTrigger id={`journey-month-${index}`} aria-label={`Month for milestone ${index + 1}`}><SelectValue /></SelectTrigger>
                  <SelectContent>{MONTHS.map((month, monthIndex) => <SelectItem key={month} value={String(monthIndex + 1)}>{month}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor={`journey-year-${index}`} className="text-sm font-medium">Year</label>
                <Input id={`journey-year-${index}`} type="number" min="1950" max="2100" required value={step.year}
                  onChange={(event) => updateStep(index, "year", event.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Company or institute</label>
                <Select value={organization} onValueChange={(selected) => setOrganization(index, selected)}>
                  <SelectTrigger aria-label={`Organization for milestone ${index + 1}`}><SelectValue placeholder="Select one company or institute" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Companies</SelectLabel>
                      {companies.map((company) => <SelectItem key={company._id} value={`company:${company._id}`}>{company.name}</SelectItem>)}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Institutes</SelectLabel>
                      {institutes.map((institute) => <SelectItem key={institute._id} value={`institute:${institute._id}`}>{institute.name} ({institute.type})</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor={`journey-role-${index}`} className="text-sm font-medium">Program or role (optional)</label>
                <Input id={`journey-role-${index}`} maxLength={120} placeholder="M.Tech, Data Engineer..." value={step.roleOrProgram}
                  onChange={(event) => updateStep(index, "roleOrProgram", event.target.value)} />
              </div>
              <div className="space-y-2">
                <label htmlFor={`journey-gate-${index}`} className="text-sm font-medium">GATE score (optional)</label>
                <Input id={`journey-gate-${index}`} type="number" min="0" max="1000" step="1" value={step.gateScore}
                  onChange={(event) => updateStep(index, "gateScore", event.target.value)} />
              </div>
              <div className="md:col-span-2">
                <MarkdownEditorField
                  label="Milestone notes (optional)"
                  description="Add bullet points, details, or achievements for this month."
                  value={step.details}
                  onChange={(details) => updateStep(index, "details", details)}
                  maxLength={6000}
                  disabled={busy}
                  rows={4}
                />
              </div>
              <Button type="button" variant="destructive" className="md:col-span-2 md:justify-self-end"
                onClick={() => setValue((current) => ({ ...current, timeline: current.timeline.filter((_, i) => i !== index) }))}>
                <Trash2 /> Remove milestone
              </Button>
            </fieldset>
          );
        })}
        <Button type="button" variant="outline" disabled={busy || value.timeline.length >= 30}
          onClick={() => {
            const now = new Date();
            setValue((current) => ({
              ...current,
              timeline: [...current.timeline, {
                year: String(now.getFullYear()), month: String(now.getMonth() + 1), company: "", institute: "",
                roleOrProgram: "", gateScore: "", details: "",
              }],
            }));
          }}>
          <Plus /> Add milestone
        </Button>
      </section>
      {markdownFields.map(({ key, label, description, maxLength }) => (
        <MarkdownEditorField
          key={key}
          label={label}
          description={`${description} This section applies to the overall journey.`}
          value={value[key]}
          onChange={(next) => setValue((current) => ({ ...current, [key]: next }))}
          maxLength={maxLength}
          disabled={busy}
        />
      ))}
      <Button disabled={busy}>{busy ? "Saving journey..." : "Save journey"}</Button>
    </form>
  );
}
