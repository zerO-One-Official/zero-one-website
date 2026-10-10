"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/") return null;

  const alumniMatch = pathname.match(/^\/alumni\/([^/]+)$/);
  const journeyMatch = pathname.match(/^\/user\/([^/]+)\/journey$/);
  const reportMatch = pathname.match(/^\/contest\/([^/]+)\/my-report$/);
  const contextualBack = alumniMatch
    ? { href: "/alumni", label: "Back" }
    : journeyMatch
    ? { href: `/user/${journeyMatch[1]}`, label: "Back" }
    : reportMatch
    ? {
        href: `/contest/${reportMatch[1]}?type=contest&tab=info`,
        label: "Back to contest",
      }
    : null;

  return (
    <button
      type="button"
      onClick={() => {
        if (contextualBack) router.push(contextualBack.href);
        else if (window.history.length > 1) router.back();
        else router.push("/");
      }}
      className="fixed left-[5%] top-24 z-40 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-background/95 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur transition-colors hover:border-accent/50 hover:text-accent sm:left-[7.5%] lg:left-[15%]"
      aria-label={`Go back from ${pathname}`}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      {contextualBack?.label || "Back"}
    </button>
  );
}
