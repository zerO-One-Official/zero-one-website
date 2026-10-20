"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const topLoader = useTopLoader();
  const pathname = usePathname();

  useEffect(() => {
    const startForHistoryNavigation = () => topLoader.start();
    window.addEventListener("popstate", startForHistoryNavigation);
    return () => window.removeEventListener("popstate", startForHistoryNavigation);
  }, [topLoader]);

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
    <div className="container-70 sticky top-20 z-[90] flex h-12 items-center">
      <button
        type="button"
        onClick={() => {
          if (contextualBack) router.push(contextualBack.href);
          else if (window.history.length > 1) {
            topLoader.start();
            router.back();
          }
          else router.push("/");
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 backdrop-blur-lg  px-3 py-2 text-sm font-medium shadow-lg transition-colors hover:border-accent/50 hover:text-accent"
        aria-label={`Go back from ${pathname}`}
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {contextualBack?.label || "Back"}
      </button>
    </div>
  );
}
