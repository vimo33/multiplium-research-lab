// frontend/components/layout/TopNav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Overview",      href: "/overview",          newTab: false },
  { label: "Landscape",     href: "/landscape",         newTab: false },
  { label: "Cluster View",  href: "/landscape/cluster", newTab: false },
  { label: "Scoring",       href: "/scoring",           newTab: false },
  { label: "Shortlist",     href: "/shortlist",         newTab: false },
  { label: "Deep Research", href: "/deep-research",     newTab: false },
  { label: "Evidence",      href: "/evidence",          newTab: false },
  { label: "Presentation",  href: "/presentation",      newTab: true  },
];

export default function TopNav() {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between border-b border-border-color bg-surface px-10 py-4 sticky top-0 z-50">
      <Link href="/overview" className="flex items-center gap-4 text-text-main hover:opacity-80 transition-opacity">
        <span className="material-symbols-outlined text-xl text-primary">biotech</span>
        <h1 className="font-display text-xl font-semibold leading-tight tracking-tight">
          Multiplium Research Lab
        </h1>
      </Link>
      <nav className="flex items-center gap-8">
        {NAV_LINKS.map(({ label, href, newTab }) => {
          const active = !newTab && (pathname === href || (href !== "/overview" && pathname.startsWith(href)));
          return (
            <Link
              key={href}
              href={href}
              target={newTab ? "_blank" : undefined}
              rel={newTab ? "noopener noreferrer" : undefined}
              className={cn(
                "text-[13px] font-sans font-medium uppercase tracking-wider transition-colors",
                active
                  ? "text-primary border-b-2 border-primary pb-px"
                  : "text-text-muted hover:text-text-main"
              )}
            >
              {label}
              {newTab && <span className="ml-1 text-[10px] opacity-40">↗</span>}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
