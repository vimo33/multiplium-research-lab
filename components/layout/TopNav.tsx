// frontend/components/layout/TopNav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Overview",      href: "/overview",          external: false },
  { label: "Landscape",     href: "/landscape",         external: false },
  { label: "Cluster View",  href: "/landscape/cluster", external: false },
  { label: "Scoring",       href: "/scoring",           external: false },
  { label: "Shortlist",     href: "/shortlist",         external: false },
  { label: "Deep Research", href: "/deep-research",     external: false },
  { label: "Evidence",      href: "/evidence",          external: false },
  { label: "Presentation",  href: "/presentation",      external: true  },
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
        {NAV_LINKS.map(({ label, href, external }) => {
          const active = !external && (pathname === href || (href !== "/overview" && pathname.startsWith(href)));
          const cls = cn(
            "text-[13px] font-sans font-medium uppercase tracking-wider transition-colors",
            active
              ? "text-primary border-b-2 border-primary pb-px"
              : "text-text-muted hover:text-text-main"
          );
          if (external) {
            return (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {label}
                <span className="ml-1 text-[10px] opacity-40">↗</span>
              </a>
            );
          }
          return (
            <Link key={href} href={href} className={cls}>
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
