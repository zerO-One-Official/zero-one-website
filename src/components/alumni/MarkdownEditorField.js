"use client";

import { useRef, useState } from "react";
import { Bold, Heading2, Italic, Link2, List, ListOrdered, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MarkdownContent from "@/components/alumni/MarkdownContent";

const tools = [
  { id: "heading", label: "Heading", icon: Heading2 },
  { id: "bold", label: "Bold", icon: Bold },
  { id: "italic", label: "Italic", icon: Italic },
  { id: "unordered", label: "Bulleted list", icon: List },
  { id: "ordered", label: "Numbered list", icon: ListOrdered },
  { id: "quote", label: "Quote", icon: Quote },
  { id: "link", label: "Link", icon: Link2 },
];

export default function MarkdownEditorField({ label, description, value, onChange, maxLength, disabled = false, rows = 8 }) {
  const textareaRef = useRef(null);
  const [preview, setPreview] = useState(false);

  const format = (action) => {
    const input = textareaRef.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = value.slice(start, end);
    let nextValue = value;
    let selectionStart = start;
    let selectionEnd = end;

    if (action === "heading") {
      const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
      if (!value.slice(lineStart).startsWith("## ")) {
        nextValue = `${value.slice(0, lineStart)}## ${value.slice(lineStart)}`;
      }
      selectionStart = start + (lineStart <= start && !value.slice(lineStart).startsWith("## ") ? 3 : 0);
      selectionEnd = end + (selectionStart !== start ? 3 : 0);
    } else if (action === "bold" || action === "italic" || action === "link") {
      const before = action === "bold" ? "**" : action === "italic" ? "*" : "[";
      const after = action === "link" ? "](https://)" : before;
      const content = selected || (action === "bold" ? "bold text" : action === "italic" ? "italic text" : "link text");
      nextValue = `${value.slice(0, start)}${before}${content}${after}${value.slice(end)}`;
      selectionStart = start + before.length;
      selectionEnd = selectionStart + content.length;
    } else {
      const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
      const lineEnd = value.indexOf("\n", end);
      const replaceEnd = lineEnd < 0 ? value.length : lineEnd;
      const content = value.slice(lineStart, replaceEnd) || "List item";
      const lines = content.split("\n");
      const prefix = action === "unordered" ? "- " : action === "ordered" ? null : "> ";
      const formatted = lines.map((line, index) => `${prefix === null ? `${index + 1}. ` : prefix}${line}`).join("\n");
      nextValue = `${value.slice(0, lineStart)}${formatted}${value.slice(replaceEnd)}`;
      selectionStart = lineStart;
      selectionEnd = lineStart + formatted.length;
    }

    onChange(nextValue);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  return (
    <section className="space-y-3">
      <div>
        <h3 className="font-semibold">{label}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-1">
        <Button type="button" size="sm" variant={!preview ? "secondary" : "ghost"} disabled={disabled} onClick={() => setPreview(false)}>Write</Button>
        <Button type="button" size="sm" variant={preview ? "secondary" : "ghost"} disabled={disabled} onClick={() => setPreview(true)}>Preview</Button>
        {!preview && (
          <div role="toolbar" aria-label={`${label} formatting`} className="ml-2 flex flex-wrap gap-1 border-l pl-2">
            {tools.map(({ id, label: toolLabel, icon: Icon }) => (
              <Button key={id} type="button" size="icon" variant="ghost" title={toolLabel} aria-label={toolLabel} disabled={disabled} onClick={() => format(id)}>
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        )}
        <span className="ml-auto text-xs text-muted-foreground">{value.length}/{maxLength}</span>
      </div>
      {preview ? (
        <div className="min-h-24 rounded-md border p-4">
          {value ? <MarkdownContent>{value}</MarkdownContent> : <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>}
        </div>
      ) : (
        <Textarea ref={textareaRef} disabled={disabled} maxLength={maxLength} rows={rows} value={value} aria-label={label} onChange={(event) => onChange(event.target.value)} />
      )}
    </section>
  );
}
