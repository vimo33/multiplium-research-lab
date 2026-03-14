"use client";
import { useState } from "react";
import DocViewerModal from "./DocViewerModal";

const PIPELINE_FILES = [
  "output_sanitized/02_scoring/02_top20.csv",
  "output_sanitized/02_scoring/02_scoring_report.md",
  "output_sanitized/03_top3/03_top3_summary.csv",
  "output_sanitized/03_top3/03_top3_comparison.md",
  "output_sanitized/03_top3/03_top3_red_flags.md",
  "output_sanitized/03_top3/dossiers/biome-makers.md",
  "output_sanitized/03_top3/dossiers/biorizon-biotech.md",
  "output_sanitized/03_top3/dossiers/agrology.md",
  "output_sanitized/04_memo/04_revised_investor_memo.md",
  "output_sanitized/04_memo/04_source_register.csv",
];

export default function PipelineFileList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[12px] text-text-muted">
        {PIPELINE_FILES.map(f => (
          <button
            key={f}
            onClick={() => setOpen(f)}
            className="flex items-center gap-2 p-3 border border-border-color rounded-sm bg-surface hover:border-primary hover:text-text-main transition-colors text-left w-full"
          >
            <span className="material-symbols-outlined text-[14px] text-primary shrink-0">description</span>
            <span className="truncate">{f}</span>
          </button>
        ))}
      </div>
      {open && <DocViewerModal filePath={open} onClose={() => setOpen(null)} />}
    </>
  );
}
