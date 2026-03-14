// frontend/components/layout/TopNav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Overview",       href: "/overview" },
  { label: "Landscape",      href: "/landscape" },
  { label: "Cluster View",   href: "/landscape/cluster" },
  { label: "Scoring",        href: "/scoring" },
  { label: "Shortlist",      href: "/shortlist" },
  { label: "Deep Research",  href: "/deep-research" },
  { label: "Evidence",       href: "/evidence" },
];

export default function TopNav() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between border-b border-border-color bg-surface px-10 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-4 text-text-main">
        <span className="material-symbols-outlined text-xl text-primary">biotech</span>
        <h1 className="font-display text-xl font-semibold leading-tight tracking-tight">
          Multiplium Research Lab
        </h1>
      </div>
      <nav className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href || (href !== "/overview" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-[13px] font-sans font-medium uppercase tracking-wider transition-colors",
                active
                  ? "text-primary border-b-2 border-primary pb-px"
                  : "text-text-muted hover:text-text-main"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
