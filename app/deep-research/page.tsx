import Link from "next/link";
import { getTop3 } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import SignalBadge from "@/components/badges/SignalBadge";
import { formatScore } from "@/lib/utils";

export default function DeepResearchPage() {
  const top3 = getTop3();

  return (
    <PageContainer variant="wide">
      <div className="mb-8">
        <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-3">Execution-Layer Deep Research</p>
        <h2 className="font-display text-[40px] font-semibold leading-tight mb-4">
          Post-Shortlist Deep Research
        </h2>
        <p className="font-sans text-[15px] text-text-muted max-w-2xl leading-relaxed">
          A later execution-layer narrowing built on top of the partner-authored Top 20 / Top 10 shortlist framework.
          Three companies were selected for investor-grade deep-research dossiers after applying additional investability filters to the ranked shortlist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top3.map((co) => (
          <Link
            key={co.slug}
            href={`/deep-research/${co.slug}`}
            className="block border border-border-color bg-surface p-6 rounded-sm hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[13px] text-text-muted">#{co.rank}</span>
              <SignalBadge signal={co.investorSignal} />
            </div>
            <h3 className="font-display text-[21px] font-semibold mb-2 group-hover:text-primary transition-colors">
              {co.company}
            </h3>
            <p className="font-mono text-[24px] text-primary mb-3">{formatScore(co.weightedTotalScore)}</p>
            <p className="font-sans text-[13px] text-text-muted mb-4 leading-relaxed line-clamp-3">
              {co.shortlistRationale}
            </p>
            <div className="pt-4 border-t border-border-color">
              <p className="font-sans text-[11px] uppercase tracking-wider text-text-muted mb-1">Major Risk</p>
              <p className="font-sans text-[13px] text-text-main line-clamp-2">{co.majorRisk}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
