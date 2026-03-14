import Link from "next/link";
import { getScoringMeta } from "@/lib/data";
import MetricCard from "@/components/cards/MetricCard";

export default function OverviewPage() {
  const meta = getScoringMeta();

  return (
    <div className="h-[calc(100vh-52px)] flex flex-col justify-between max-w-[1000px] mx-auto px-10 py-10 overflow-hidden">

      {/* Thesis */}
      <section>
        <h2 className="font-display text-[38px] font-semibold leading-[1.1] tracking-tight">
          Regenerative Viticulture<br />
          <span className="italic text-text-muted font-normal text-[34px]">Technology Landscape</span>
        </h2>
        <p className="mt-3 font-sans text-[14px] text-text-muted max-w-xl leading-relaxed">
          Thesis-driven landscape mapping, scoring, and shortlist research across {meta.totalCompanies} investable companies.
        </p>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-4 gap-6">
        <MetricCard icon="corporate_fare" label="Companies Mapped"   value={meta.totalCompanies}
          description="Investable entities across the regenerative viticulture value chain" />
        <MetricCard icon="category"       label="Value Chain Segments" value={12}
          description="Partner-authored 12-segment framework across 6 grouped categories" />
        <MetricCard icon="stars"          label="Most Investable"    value={meta.topShortlist}
          description="Top 20 ranked by composite investor score across 5 weighted dimensions" />
        <MetricCard icon="flag"           label="Immediate Outreach" value={10}
          description="Top 10 immediate investor outreach priorities from the partner scoring model" />
      </section>

      {/* Context blocks */}
      <section className="grid grid-cols-2 gap-8">
        <div className="border-l-4 border-primary pl-6 py-1">
          <h3 className="font-display text-[18px] italic text-text-muted mb-1">Why this matters</h3>
          <p className="font-sans text-[13px] text-text-main leading-relaxed">
            Viticulture is being reshaped by climate stress, water pressure, disease risk, and shifting
            regulatory and buyer expectations. This research workflow maps the technology landscape,
            applies a structured investor model, and identifies the most relevant companies for further diligence.
          </p>
        </div>
        <div className="border-l-4 border-border-color pl-6 py-1">
          <h3 className="font-display text-[18px] italic text-text-muted mb-1">How the workflow works</h3>
          <p className="font-sans text-[13px] text-text-main leading-relaxed">
            The research process maps a company landscape, enriches missing data, applies a five-part
            scoring model, and then narrows the field to a ranked top 20. From that shortlist, a final
            top 3 is selected for deeper research after additional investability review.
          </p>
        </div>
      </section>

      {/* CTAs */}
      <section className="grid grid-cols-4 gap-4">
        {[
          { label: "Explore Landscape",  href: "/landscape",     icon: "travel_explore" },
          { label: "Review Scoring",     href: "/scoring",       icon: "analytics" },
          { label: "Open Shortlist",     href: "/shortlist",     icon: "stars" },
          { label: "Read Deep Research", href: "/deep-research", icon: "biotech" },
        ].map(({ label, href, icon }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 border border-border-color bg-surface px-4 py-3 rounded-sm hover:border-primary/40 hover:shadow-sm transition-all group">
            <span className="material-symbols-outlined text-primary text-[18px]">{icon}</span>
            <span className="font-sans text-[13px] font-medium group-hover:text-primary transition-colors">{label}</span>
            <span className="material-symbols-outlined text-[14px] text-text-muted ml-auto">arrow_forward</span>
          </Link>
        ))}
      </section>

    </div>
  );
}
