import { getTop20 } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import ShortlistCard from "@/components/cards/ShortlistCard";
import ShortlistRankedTable from "@/components/shortlist/ShortlistRankedTable";
import type { CompanyIndexItem } from "@/lib/types";

export default function ShortlistPage() {
  const top20 = getTop20();
  const withSignal: CompanyIndexItem[] = top20.map((co, i) => ({
    ...co,
    investorSignal: i < 3 ? "HIGH" as const : i < 8 ? "MEDIUM" as const : undefined,
  }));

  const OUTREACH_NAMES = ["Arable", "Biome Makers", "WiseConn", "Naïo Technologies", "Sencrop", "Elaisian", "Deep Planet", "VineView", "Green Atlas", "VitiBot"];
  const outreach10 = OUTREACH_NAMES.map(name => withSignal.find(co => co.company === name)).filter(Boolean);

  return (
    <PageContainer variant="wide">
      <div className="mb-12 border-b border-border-color pb-8">
        <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-3">Computed Shortlist</p>
        <h2 className="font-display text-[40px] font-semibold leading-tight mb-4">
          Top 20 Shortlist
        </h2>
        <p className="font-sans text-[15px] text-text-muted max-w-2xl leading-relaxed">
          Highest-ranked companies from the scored regenerative viticulture landscape.
        </p>
      </div>

      {/* Top 10 Immediate Investor Outreach */}
      <div className="mb-12">
        <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-2">Immediate Investor Outreach</p>
        <h3 className="font-sans text-[18px] font-semibold text-text-main mb-2">Top 10 Immediate Outreach Priorities</h3>
        <p className="font-sans text-[13px] text-text-muted max-w-2xl mb-6 leading-relaxed">
          From the partner scoring model: strongest combination of scalable technology, impact alignment, and growth-stage maturity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outreach10.map(co => co && <ShortlistCard key={co.slug} company={co} />)}
        </div>
      </div>

      {/* Full ranked shortlist */}
      <section>
        <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-4">Top 20 Most Investable Companies</p>
        <ShortlistRankedTable companies={top20} />
        <p className="font-sans text-[12px] text-text-muted mt-4 italic">
          The shortlist is a scored ranking, not an investment recommendation. Final deep research selection also considers investability constraints.
        </p>
      </section>
    </PageContainer>
  );
}
