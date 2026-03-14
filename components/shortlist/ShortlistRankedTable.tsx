"use client";
import { useState } from "react";
import { formatScore } from "@/lib/utils";
import CompanyDetailTray from "@/components/company/CompanyDetailTray";
import type { CompanyIndexItem } from "@/lib/types";

interface Props { companies: CompanyIndexItem[]; }

export default function ShortlistRankedTable({ companies }: Props) {
  const [selected, setSelected] = useState<CompanyIndexItem | null>(null);

  return (
    <>
      <div className="border border-border-color rounded-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-color bg-surface">
              <th className="text-left font-sans text-[11px] uppercase tracking-wider text-text-muted px-4 py-3 w-12">Rank</th>
              <th className="text-left font-sans text-[11px] uppercase tracking-wider text-text-muted px-4 py-3">Company</th>
              <th className="text-left font-sans text-[11px] uppercase tracking-wider text-text-muted px-4 py-3">Country</th>
              <th className="text-left font-sans text-[11px] uppercase tracking-wider text-text-muted px-4 py-3">Segment</th>
              <th className="text-right font-sans text-[11px] uppercase tracking-wider text-text-muted px-4 py-3">Score</th>
              <th className="text-left font-sans text-[11px] uppercase tracking-wider text-text-muted px-4 py-3">Confidence</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {companies.map((co, i) => (
              <tr
                key={co.slug}
                onClick={() => setSelected(co)}
                className={`border-b border-border-color last:border-0 cursor-pointer hover:bg-surface transition-colors ${i < 5 ? "bg-primary/[0.02]" : ""}`}
              >
                <td className="font-mono text-[13px] text-primary px-4 py-3">{co.rank}</td>
                <td className="font-sans text-[13px] font-medium text-text-main px-4 py-3">{co.company}</td>
                <td className="font-sans text-[13px] text-text-muted px-4 py-3">{co.country}</td>
                <td className="font-sans text-[12px] text-text-muted px-4 py-3">{co.normalizedSegment}</td>
                <td className="font-mono text-[13px] text-primary text-right px-4 py-3">{formatScore(co.weightedTotalScore)}</td>
                <td className="font-sans text-[12px] text-text-muted px-4 py-3 capitalize">{co.scoreConfidence}</td>
                <td className="px-2 py-3">
                  <span className="material-symbols-outlined text-[18px] text-text-muted">chevron_right</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <CompanyDetailTray company={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
