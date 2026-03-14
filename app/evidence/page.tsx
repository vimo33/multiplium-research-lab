import { getScoringMeta } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import PipelineFileList from "@/components/evidence/PipelineFileList";

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

      {/* Source files */}
      <div>
        <h3 className="font-sans text-[13px] uppercase tracking-wider text-text-muted mb-4">Pipeline Outputs Backing This App</h3>
        <PipelineFileList />
      </div>
    </PageContainer>
  );
}
