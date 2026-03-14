import { notFound } from "next/navigation";
import { getTop20 } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import ConfidenceBadge from "@/components/badges/ConfidenceBadge";
import SegmentPill from "@/components/badges/SegmentPill";
import { formatScore, scoreToPercent, heatColor } from "@/lib/utils";

export function generateStaticParams() {
  return [];
}

const SCORE_FIELDS = [
  { key: "segmentScore",         label: "Market Segment Attractiveness", weight: "25%" },
  { key: "technologyScore",      label: "Technology & Business Model",   weight: "25%" },
  { key: "maturityScore",        label: "Company Maturity",              weight: "20%" },
  { key: "impactScore",          label: "Impact & ESG Alignment",        weight: "15%" },
  { key: "differentiationScore", label: "Differentiation & Competitive Edge", weight: "15%" },
] as const;

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = getTop20();
  const co  = all.find(c => c.slug === slug);
  if (!co) notFound();

  return (
    <PageContainer variant="wide">
      {/* Breadcrumbs */}
      <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-6">
        Landscape / {co.company}
      </p>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <SegmentPill segment={co.normalizedSegment} />
            <ConfidenceBadge confidence={co.scoreConfidence} />
          </div>
          <h1 className="font-display text-[36px] font-semibold leading-tight mb-2">{co.company}</h1>
          <p className="font-sans text-[15px] text-text-muted max-w-2xl leading-relaxed">{co.summary}</p>
        </div>
        <div className="text-right ml-8">
          <p className="font-mono text-[48px] font-semibold text-primary">{formatScore(co.weightedTotalScore)}</p>
          <p className="font-mono text-[11px] text-text-muted uppercase">Weighted Score</p>
          {co.rank && <p className="font-mono text-[13px] text-text-muted mt-1">Rank #{co.rank}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Scoring breakdown */}
        <div>
          <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-4">Evaluation Pillars</p>
          <div className="space-y-4">
            {SCORE_FIELDS.map(f => {
              const val = (co[f.key as keyof typeof co] as number | undefined) ?? 0;
              const pct = scoreToPercent(val);
              return (
                <div key={f.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sans text-[13px] text-text-main">{f.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-text-muted">{f.weight}</span>
                      <span className="font-mono text-[13px] font-medium text-primary">{val}/5</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-border-color rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: heatColor(val) }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metadata */}
        <div>
          <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-4">Key Metadata</p>
          <dl className="space-y-3">
            {[
              { label: "Country",          value: co.country },
              { label: "Segment",          value: co.normalizedSegment },
              { label: "Technology",       value: co.technologyModel },
              { label: "Team Size",        value: co.teamSizeBucket ?? "—" },
              { label: "Scoreability",     value: co.scoreabilityClass },
              { label: "Score Confidence", value: co.scoreConfidence },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-border-color/50 pb-2">
                <dt className="font-sans text-[13px] text-text-muted">{label}</dt>
                <dd className="font-mono text-[12px] text-text-main">{value}</dd>
              </div>
            ))}
          </dl>
          {co.website && (
            <a href={co.website} target="_blank" rel="noreferrer"
              className="mt-6 flex items-center gap-2 font-sans text-[13px] text-primary hover:underline">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              {co.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      </div>

      {/* Scoring notes */}
      {co.scoringNotes && (
        <div className="mt-10 border-t border-border-color pt-8">
          <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-3">Scoring Notes</p>
          <p className="font-sans text-[13px] text-text-muted leading-relaxed">{co.scoringNotes}</p>
        </div>
      )}
    </PageContainer>
  );
}
