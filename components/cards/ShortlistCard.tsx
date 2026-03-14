import Link from "next/link";
import SignalBadge from "@/components/badges/SignalBadge";
import SegmentPill from "@/components/badges/SegmentPill";
import type { CompanyIndexItem } from "@/lib/types";

interface Props { company: CompanyIndexItem; }

export default function ShortlistCard({ company: co }: Props) {
  return (
    <Link
      href={`/company/${co.slug}`}
      className="block border border-border-color bg-surface p-6 rounded-sm hover:border-primary/40 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-[13px] text-text-muted">
          {String(co.rank ?? 0).padStart(2, "0")}
        </span>
        {co.investorSignal && <SignalBadge signal={co.investorSignal} />}
      </div>
      <h3 className="font-display text-[21px] font-semibold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors">
        {co.company}
      </h3>
      <p className="font-sans text-[13px] italic text-text-muted mb-4 leading-relaxed line-clamp-2">
        {co.summary}
      </p>
      <div className="flex items-center justify-between">
        <SegmentPill segment={co.normalizedSegment} />
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
          <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
          <span className="font-mono text-primary font-medium">{co.scoreConfidence.toUpperCase()}</span>
          <span>confidence</span>
        </div>
      </div>
    </Link>
  );
}
