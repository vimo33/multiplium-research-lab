import Link from "next/link";
import ConfidenceBadge from "@/components/badges/ConfidenceBadge";
import SegmentPill from "@/components/badges/SegmentPill";
import { formatScore } from "@/lib/utils";
import type { CompanyIndexItem } from "@/lib/types";

interface Props { company: CompanyIndexItem; onClose: () => void; }

export default function ClusterSidePanel({ company: co, onClose }: Props) {
  return (
    <aside className="w-80 border-l border-border-color bg-surface p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <SegmentPill segment={co.normalizedSegment} />
        <button onClick={onClose} className="text-text-muted hover:text-text-main">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <h3 className="font-display text-[21px] font-semibold mb-1">{co.company}</h3>
      <p className="font-mono text-[24px] text-primary mb-1">{formatScore(co.weightedTotalScore)}</p>
      <div className="mb-4"><ConfidenceBadge confidence={co.scoreConfidence} /></div>
      {co.country && (
        <p className="font-sans text-[13px] text-text-muted mb-2">
          <span className="material-symbols-outlined text-[14px] mr-1">location_on</span>
          {co.country}
        </p>
      )}
      <p className="font-sans text-[13px] text-text-muted leading-relaxed mb-6">{co.summary}</p>
      <div className="space-y-3">
        <Link
          href={`/company/${co.slug}`}
          className="flex items-center justify-between font-sans text-[13px] text-primary hover:underline"
        >
          Company Detail
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
        {co.shortlistFlag && (
          <Link
            href={`/deep-research/${co.slug}`}
            className="flex items-center justify-between font-sans text-[13px] text-text-muted hover:text-primary transition-colors"
          >
            View Deep Research
            <span className="material-symbols-outlined text-[16px]">biotech</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
