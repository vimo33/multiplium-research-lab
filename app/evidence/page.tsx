import { getSelectionLog, getScoringMeta } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";

const METHODOLOGY_CARDS = [
  {
    term: "Scoreability Class",
    definition: "Whether a company has enough field data to be scored at all. Four levels: scoreable_high (all 6 key fields + segment + business-model info present), scoreable_medium (4-5 fields), scoreable_low (2-3), not_scoreable (<2 usable fields).",
    icon: "data_check",
  },
  {
    term: "Score Confidence",
    definition: "How confident we are in the resulting score after normalization and judgment calls. Distinct from scoreability. High = minimal inference required. Medium = some fields inferred from context. Low = material missingness affects the score.",
    icon: "verified",
  },
  {
    term: "Research Completeness",
    definition: "Computed from exactly 8 fields: Country, Summary, Team Size, Sector, KPI Alignment, Direct Competitors, Differentiation, Sources. High = 6-8 valid fields. Medium = 3-5. Low = 0-2.",
    icon: "fact_check",
  },
];

export default function EvidencePage() {
  const log  = getSelectionLog();
  const meta = getScoringMeta();

  return (
    <PageContainer variant="wide">
      <div className="mb-10">
        <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-3">Evidence & Transparency</p>
        <h2 className="font-display text-[40px] font-semibold leading-tight mb-4">Research Methodology</h2>
        <p className="font-sans text-[15px] text-text-muted max-w-2xl leading-relaxed">
          Every score, ranking, and dossier is backed by an auditable research chain.
          This page explains the standards used and what could — and could not — be verified.
        </p>
      </div>

      {/* Methodology cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {METHODOLOGY_CARDS.map(card => (
          <div key={card.term} className="border border-border-color bg-surface p-6 rounded-sm">
            <span className="material-symbols-outlined text-primary mb-3 block">{card.icon}</span>
            <h3 className="font-sans text-[14px] font-medium text-text-main mb-2">{card.term}</h3>
            <p className="font-sans text-[13px] text-text-muted leading-relaxed">{card.definition}</p>
          </div>
        ))}
      </div>

      {/* Scoring formula */}
      <div className="border border-border-color bg-surface p-8 rounded-sm mb-12">
        <h3 className="font-sans text-[13px] uppercase tracking-wider text-text-muted mb-4">Scoring Formula</h3>
        <p className="font-mono text-[15px] text-primary">{meta.formula}</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {meta.pillars.map(p => (
            <div key={p.name} className="text-center">
              <p className="font-mono text-[24px] text-primary">{p.weightLabel}</p>
              <p className="font-sans text-[11px] text-text-muted mt-1 leading-tight">{p.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selection substitutions */}
      <div className="mb-12">
        <h3 className="font-sans text-[13px] uppercase tracking-wider text-text-muted mb-6">
          Top-3 Selection Adjustments
        </h3>
        <div className="space-y-4">
          {log.excluded.map(e => (
            <div key={e.company} className="border border-red-100 bg-red-50/50 p-4 rounded-sm flex gap-4">
              <span className="material-symbols-outlined text-red-500 mt-0.5">cancel</span>
              <div>
                <p className="font-sans text-[13px] font-medium text-text-main">
                  {e.company} <span className="font-mono text-[11px] text-text-muted">(scored #{e.originalRank})</span>
                </p>
                <p className="font-sans text-[13px] text-text-muted mt-1">{e.reason}</p>
              </div>
            </div>
          ))}
          {log.replacements.map(r => (
            <div key={r.company} className="border border-primary/20 bg-primary/5 p-4 rounded-sm flex gap-4">
              <span className="material-symbols-outlined text-primary mt-0.5">swap_horiz</span>
              <div>
                <p className="font-sans text-[13px] font-medium text-text-main">
                  {r.company} added <span className="font-mono text-[11px] text-text-muted">(original rank #{r.originalRank})</span>
                </p>
                <p className="font-sans text-[13px] text-text-muted mt-1">{r.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Source files */}
      <div>
        <h3 className="font-sans text-[13px] uppercase tracking-wider text-text-muted mb-4">Pipeline Outputs Backing This App</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[12px] text-text-muted">
          {[
            "output/02_scoring/02_top20.csv",
            "output/02_scoring/02_scoring_report.md",
            "output/03_top3/03_top3_summary.csv",
            "output/03_top3/03_top3_comparison.md",
            "output/03_top3/03_top3_red_flags.md",
            "output/03_top3/dossiers/biome-makers.md",
            "output/03_top3/dossiers/biorizon-biotech.md",
            "output/03_top3/dossiers/agrology.md",
            "output/04_memo/04_revised_investor_memo.md",
            "output/04_memo/04_source_register.csv",
          ].map(f => (
            <div key={f} className="flex items-center gap-2 p-3 border border-border-color rounded-sm bg-surface">
              <span className="material-symbols-outlined text-[14px] text-primary">description</span>
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
