import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  h1: ({ children }) => <h1 className="mb-4 mt-7 text-3xl font-bold leading-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-3 mt-6 border-b pb-2 text-2xl font-semibold leading-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 mt-5 text-xl font-semibold leading-snug">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 mt-4 text-lg font-semibold">{children}</h4>,
  p: ({ children }) => <p className="my-3 leading-7">{children}</p>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => <a href={href} className="font-medium text-accent underline underline-offset-4 hover:opacity-80">{children}</a>,
  ul: ({ children }) => <ul className="my-3 list-disc space-y-1 pl-6 marker:text-accent">{children}</ul>,
  ol: ({ children }) => <ol className="my-3 list-decimal space-y-1 pl-6 marker:font-semibold marker:text-accent">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-accent bg-muted/50 py-2 pl-4 pr-3 text-muted-foreground [&>p]:my-1">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => <pre className="my-4 overflow-x-auto rounded-md border bg-muted p-4 font-mono text-sm [&>code]:bg-transparent [&>code]:p-0">{children}</pre>,
  code: ({ children }) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-accent">{children}</code>,
  hr: () => <hr className="my-6 border-border" />,
  table: ({ children }) => (
    <div className="my-4 w-full overflow-x-auto rounded-md border">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
  th: ({ children }) => <th className="border-b px-3 py-2 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-t px-3 py-2 align-top">{children}</td>,
  tr: ({ children }) => <tr className="even:bg-muted/30">{children}</tr>,
  del: ({ children }) => <del className="text-muted-foreground">{children}</del>,
};

export default function MarkdownContent({ children, className = "" }) {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{children}</ReactMarkdown>
    </div>
  );
}
