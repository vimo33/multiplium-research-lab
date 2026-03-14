import Link from "next/link";
import { getScoringMeta } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import MetricCard from "@/components/cards/MetricCard";

const STEPS = [
  { icon: "travel_explore", label: "Landscape",  desc: "98 entities mapped" },
  { icon: "science",        label: "Enrichment", desc: "Deep profile data" },
  { icon: "analytics",      label: "Scoring",    desc: "5-pillar model" },
  { icon: "stars",          label: "Shortlist",  desc: "Top 20 ranked" },
  { icon: "biotech",        label: "Deep Research", desc: "Top 3 dossiers" },
];

export default function OverviewPage() {
  const meta = getScoringMeta();

  return (
    <PageContainer variant="editorial">
      {/* Thesis */}
      <section className="mb-20 text-center">
        <h2 className="font-display text-[48px] font-semibold leading-[1.1] tracking-tight">
          Regenerative Viticulture:<br />
          <span className="italic text-text-muted font-normal text-[42px]">A 2025 Mandate.</span>
        </h2>
        <p className="mt-6 font-sans text-[15px] text-text-muted max-w-2xl mx-auto leading-relaxed">
          Evaluating {meta.totalCompanies} sustainable agtech entities through strict evidence standards,
          transforming dense agronomic data into high-signal investor insights.
        </p>
      </section>

      {/* Process ribbon */}
      <section className="mb-24 relative">
        <div className="absolute top-[14px] left-[10%] right-[10%] h-px bg-border-color -z-10" />
        <div className="absolute top-[14px] left-[10%] w-[10%] h-[2px] bg-primary -z-10" />
        <div className="flex justify-between">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-3 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-background-light z-10 ${
                i === 0 ? "bg-primary text-surface" : "bg-border-color text-text-muted"
              }`}>
                <span className="material-symbols-outlined text-[14px]">
                  {i === 0 ? "check" : step.icon}
                </span>
              </div>
              <div className="text-center">
                <p className={`font-sans text-[13px] font-medium ${i === 0 ? "text-primary" : "text-text-muted"}`}>
                  {step.label}
                </p>
                <p className="font-sans text-[11px] text-text-muted">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="mb-20 grid grid-cols-4 gap-8">
        <MetricCard icon="corporate_fare" label="Companies Mapped" value={meta.totalCompanies}
          description="Across 8 segments of the regenerative viticulture value chain" />
        <MetricCard icon="stars" label="Top Shortlist" value={meta.topShortlist}
          description="Ranked by composite investor score across 5 weighted dimensions" />
        <MetricCard icon="biotech" label="Deep Research" value={meta.deepResearch}
          description="Investor-grade dossiers on the highest-ranked eligible companies" />
        <MetricCard icon="analytics" label="Scoring Dimensions" value={5}
          description="Five-pillar investor model applied uniformly across the company universe" />
      </section>

      {/* Why this matters */}
      <section className="mb-20 border-l-4 border-primary pl-8 py-2">
        <h3 className="font-display text-[21px] italic text-text-muted mb-2">Why this matters</h3>
        <p className="font-sans text-[15px] text-text-main leading-relaxed">
          Viticulture is being reshaped by climate stress, water pressure, disease risk, and shifting
          regulatory and buyer expectations. This research workflow maps the technology landscape,
          applies a structured investor model, and identifies the most relevant companies for further diligence.
        </p>
      </section>

      {/* How the workflow works */}
      <section className="mb-20 border-l-4 border-border-color pl-8 py-2">
        <h3 className="font-display text-[21px] italic text-text-muted mb-2">How the workflow works</h3>
        <p className="font-sans text-[15px] text-text-main leading-relaxed">
          The research process maps a company landscape, enriches missing data, applies a five-part
          scoring model, and then narrows the field to a ranked top 20. From that shortlist, a final
          top 3 is selected for deeper research after additional investability review.
        </p>
      </section>

      {/* CTAs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Explore Landscape", href: "/landscape", icon: "travel_explore" },
          { label: "Review Scoring",    href: "/scoring",   icon: "analytics" },
          { label: "Open Shortlist",    href: "/shortlist", icon: "stars" },
          { label: "Read Deep Research", href: "/deep-research", icon: "biotech" },
        ].map(({ label, href, icon }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 border border-border-color bg-surface px-5 py-4 rounded-sm hover:border-primary/40 hover:shadow-sm transition-all group">
            <span className="material-symbols-outlined text-primary">{icon}</span>
            <span className="font-sans text-[13px] font-medium group-hover:text-primary transition-colors">{label}</span>
            <span className="material-symbols-outlined text-[16px] text-text-muted ml-auto">arrow_forward</span>
          </Link>
        ))}
      </section>
    </PageContainer>
  );
}
