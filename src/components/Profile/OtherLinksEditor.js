"use client";

import { Link2, Plus, Trash2 } from "lucide-react";
import StyledInput from "@/components/input/StyledInput";

export default function OtherLinksEditor({
  links = [],
  onChange,
  disabled = false,
}) {
  const updateLink = (index, field, value) => {
    onChange(
      links.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    );
  };

  return (
    <section className="mt-6 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <Link2 className="h-4 w-4 text-accent" />
          Other links
        </h3>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm transition hover:border-accent disabled:opacity-50"
          disabled={disabled}
          onClick={() => onChange([...links, { platform: "", link: "" }])}
        >
          <Plus className="h-4 w-4" />
          Add link
        </button>
      </div>
      <p className="text-sm text-white/60">
        Add a platform name and a valid URL for each additional profile link.
      </p>
      {links.length === 0 ? (
        <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm text-white/50">
          No additional links added.
        </p>
      ) : (
        <div className="space-y-2">
          {links.map((link, index) => (
            <div
              key={`${index}-${link.platform}`}
              className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto]"
            >
              <StyledInput
                name={`otherLinks.${index}.platform`}
                label="Platform"
                value={link.platform}
                required
                onChange={(event) =>
                  updateLink(index, "platform", event.target.value)
                }
                disabled={disabled}
              />
              <StyledInput
                type="url"
                name={`otherLinks.${index}.link`}
                label="URL"
                value={link.link}
                placeholder="https://example.com"
                required
                onChange={(event) =>
                  updateLink(index, "link", event.target.value)
                }
                disabled={disabled}
              />
              <button
                type="button"
                className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                aria-label={`Remove link ${index + 1}`}
                title="Remove link"
                disabled={disabled}
                onClick={() =>
                  onChange(links.filter((_, linkIndex) => linkIndex !== index))
                }
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
