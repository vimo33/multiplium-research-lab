import { getTop20, getScoringMeta } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import ScoringPillarList from "@/components/research/ScoringPillarList";
import ConfidenceBadge from "@/components/badges/ConfidenceBadge";
import { heatColor, formatScore } from "@/lib/utils";

export default function ScoringPage() {
  const top20 = getTop20();
  const meta  = getScoringMeta();

  const SCORE_FIELDS = [
    { key: "segmentScore",       label: "Segment" },
    { key: "technologyScore",    label: "Technology" },
    { key: "maturityScore",      label: "Maturity" },
    { key: "impactScore",        label: "Impact" },
    { key: "differentiationScore", label: "Diff." },
  ] as const;

  return (
    <div className="flex h-[calc(100vh-57px)] overflow-hidden">
      {/* Left: Methodology (40%) */}
      <aside className="w-[40%] border-r border-border-color p-8 overflow-y-auto">
        <div className="mb-8">
          <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-2">Scoring Engine</p>
          <h2 className="font-display text-[28px] font-semibold leading-tight">Five-Pillar<br/>Investor Model</h2>
          <p className="font-sans text-[13px] text-text-muted mt-3 leading-relaxed">
            {meta.formula}
          </p>
        </div>
        <ScoringPillarList pillars={meta.pillars} />
        <div className="mt-6 pt-6 border-t border-border-color">
          <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-2">Model Purpose</p>
          <p className="font-sans text-[13px] text-text-muted leading-relaxed">
            This model is designed to reduce a broad universe of ~100 companies to 15–25 high-priority targets.
            Primary outputs: <strong className="text-text-main">Top 20 Most Investable Companies</strong> and <strong className="text-text-main">Top 10 Immediate Investor Outreach</strong>.
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-border-color">
          <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-3">Score Legend</p>
          <div className="flex items-center gap-2">
            {[0.1,0.3,0.5,0.7,0.9].map(pct => (
              <div key={pct} className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-sm" style={{ background: heatColor(pct * 5) }} />
                <span className="font-mono text-[10px] text-text-muted">{Math.round(pct*5*10)/10}</span>
              </div>
            ))}
            <span className="font-sans text-[11px] text-text-muted ml-2">→ 5.0 max</span>
          </div>
        </div>
      </aside>

      {/* Right: Score Matrix (60%) */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-6">
          <h3 className="font-sans text-[13px] uppercase tracking-widest text-text-muted mb-1">
            Top {top20.length} Ranked Companies
          </h3>
          <p className="font-sans text-[13px] text-text-muted">
            Sorted by Weighted Total Score. All {top20.length} entries are scoreable_high confidence.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-color">
                <th className="font-mono text-[11px] uppercase text-text-muted pb-3 pr-4 w-[200px]">Company</th>
                {SCORE_FIELDS.map(f => (
                  <th key={f.key} className="font-mono text-[11px] uppercase text-text-muted pb-3 px-2 text-center min-w-[80px]">
                    {f.label}
                  </th>
                ))}
                <th className="font-mono text-[11px] uppercase text-text-muted pb-3 px-2 text-center">Total</th>
                <th className="font-mono text-[11px] uppercase text-text-muted pb-3 pl-4">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {top20.map((co) => (
                <tr key={co.slug} className="border-b border-border-color/50 hover:bg-surface transition-colors">
                  <td className="py-2 pr-4">
                    <span className="font-mono text-[11px] text-text-muted mr-2">#{co.rank}</span>
                    <span className="font-sans text-[13px] text-text-main">{co.company}</span>
                  </td>
                  {SCORE_FIELDS.map(f => {
                    const val = (co[f.key as keyof typeof co] as number | undefined) ?? 0;
                    return (
                      <td key={f.key} className="px-2 py-2 text-center">
                        <div
                          className="inline-flex items-center justify-center w-9 h-9 rounded-sm font-mono text-[12px] font-medium"
                          style={{
                            background: heatColor(val),
                            color: val >= 3 ? "#fff" : "#1C1C1A",
                          }}
                        >
                          {val}
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-2 py-2 text-center">
                    <span className="font-mono text-[13px] font-semibold text-primary">
                      {formatScore(co.weightedTotalScore)}
                    </span>
                  </td>
                  <td className="pl-4 py-2">
                    <ConfidenceBadge confidence={co.scoreConfidence} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
