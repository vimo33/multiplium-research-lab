import { getTop20 } from "@/lib/data";
import PageContainer from "@/components/layout/PageContainer";
import CompanyTable from "@/components/tables/CompanyTable";
import Link from "next/link";

export default function LandscapePage() {
  const top20 = getTop20();

  return (
    <PageContainer variant="wide">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-widest text-text-muted mb-3">Landscape</p>
          <h2 className="font-display text-[40px] font-semibold leading-tight">Landscape Explorer</h2>
          <p className="font-sans text-[15px] text-text-muted mt-2">
            High-density data triage. Currently showing top-20 shortlisted entities.
          </p>
        </div>
        <Link
          href="/landscape/cluster"
          className="flex items-center gap-2 font-sans text-[13px] text-text-muted hover:text-primary border border-border-color px-4 py-2 rounded-sm transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">bubble_chart</span>
          Cluster View
        </Link>
      </div>
      <CompanyTable data={top20} />
    </PageContainer>
  );
}
