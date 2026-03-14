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

  const featured = withSignal.slice(0, 4);
  const rest     = withSignal.slice(4);

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

      <div className="mb-12">
        <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-6">Featured Targets</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map(co => <ShortlistCard key={co.slug} company={co} />)}
        </div>
      </div>

      {/* Full ranked shortlist */}
      <section>
        <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-4">Full Ranked Shortlist</p>
        <ShortlistRankedTable companies={top20} />
        <p className="font-sans text-[12px] text-text-muted mt-4 italic">
          The shortlist is a scored ranking, not an investment recommendation. Final deep research selection also considers investability constraints.
        </p>
      </section>
    </PageContainer>
  );
}
