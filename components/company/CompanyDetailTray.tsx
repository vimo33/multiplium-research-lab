"use client";
import { useEffect } from "react";
import Link from "next/link";
import { formatScore } from "@/lib/utils";
import type { CompanyIndexItem } from "@/lib/types";

interface Props {
  company: CompanyIndexItem;
  onClose: () => void;
}

const SCORE_PILLARS = [
  { label: "Segment",         key: "segmentScore"         },
  { label: "Technology",      key: "technologyScore"      },
  { label: "Maturity",        key: "maturityScore"        },
  { label: "Impact",          key: "impactScore"          },
  { label: "Differentiation", key: "differentiationScore" },
] as const;

export default function CompanyDetailTray({ company: co, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Tray */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-surface border-l border-border-color z-50 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border-color shrink-0">
          <div className="min-w-0 pr-4">
            {co.rank && (
              <p className="font-mono text-[11px] text-text-muted mb-1">Rank #{co.rank}</p>
            )}
            <h2 className="font-display text-[22px] font-semibold leading-tight">{co.company}</h2>
            <p className="font-sans text-[13px] text-text-muted mt-1">{co.country} · {co.normalizedSegment}</p>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-main transition-colors mt-1 shrink-0">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Score + meta */}
          <div className="flex items-end gap-6">
            <div>
              <p className="font-mono text-[36px] text-primary leading-none">{formatScore(co.weightedTotalScore)}</p>
              <p className="font-sans text-[11px] text-text-muted mt-1">Weighted Score</p>
            </div>
            <div className="space-y-0.5 pb-1">
              <p className="font-sans text-[12px] text-text-muted capitalize">{co.scoreConfidence} confidence</p>
              <p className="font-sans text-[12px] text-text-muted">{co.technologyModel}</p>
              {co.teamSizeBucket && (
                <p className="font-sans text-[12px] text-text-muted">{co.teamSizeBucket}</p>
              )}
            </div>
          </div>

          {/* Score breakdown bars */}
          {SCORE_PILLARS.some(p => co[p.key] != null) && (
            <div>
              <p className="font-sans text-[11px] uppercase tracking-wider text-text-muted mb-3">Score Breakdown</p>
              <div className="space-y-2.5">
                {SCORE_PILLARS.filter(p => co[p.key] != null).map(p => (
                  <div key={p.key} className="flex items-center gap-3">
                    <span className="font-sans text-[12px] text-text-muted w-28 shrink-0">{p.label}</span>
                    <div className="flex-1 h-1 bg-border-color rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${((co[p.key] as number) / 5) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono text-[12px] text-primary w-8 text-right shrink-0">
                      {formatScore(co[p.key] as number)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {co.summary && (
            <div>
              <p className="font-sans text-[11px] uppercase tracking-wider text-text-muted mb-2">Summary</p>
              <p className="font-sans text-[13px] text-text-main leading-relaxed">{co.summary}</p>
            </div>
          )}

          {/* Scoring notes */}
          {co.scoringNotes && (
            <div>
              <p className="font-sans text-[11px] uppercase tracking-wider text-text-muted mb-2">Scoring Notes</p>
              <p className="font-sans text-[13px] text-text-muted leading-relaxed italic">{co.scoringNotes}</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-border-color shrink-0">
          <Link
            href={`/company/${co.slug}`}
            className="flex items-center justify-center gap-2 w-full border border-primary text-primary px-4 py-3 rounded-sm hover:bg-primary hover:text-surface transition-colors font-sans text-[13px] font-medium"
          >
            View Full Profile
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </>
  );
}
