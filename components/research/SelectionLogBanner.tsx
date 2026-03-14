import type { SelectionLog } from "@/lib/types";

export default function SelectionLogBanner({ log }: { log: SelectionLog }) {
  return (
    <div className="border border-border-color bg-surface rounded-sm p-6 mb-8">
      <div className="flex items-start gap-3 mb-4">
        <span className="material-symbols-outlined text-primary">info</span>
        <div>
          <p className="font-sans text-[13px] font-medium text-text-main mb-1">
            {log.selectionRule}
          </p>
          <p className="font-sans text-[13px] text-text-muted">
            Two substitutions were made before finalizing the deep-research set.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2">Excluded</p>
          {log.excluded.map(e => (
            <div key={e.company} className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[14px] text-red-500">cancel</span>
                <span className="font-sans text-[13px] font-medium">{e.company}</span>
                <span className="font-mono text-[10px] text-text-muted uppercase">#{e.originalRank}</span>
              </div>
              <p className="font-sans text-[12px] text-text-muted pl-6">{e.reason}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2">Added</p>
          {log.replacements.map(r => (
            <div key={r.company} className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                <span className="font-sans text-[13px] font-medium">{r.company}</span>
                <span className="font-mono text-[10px] text-text-muted uppercase">#{r.originalRank}</span>
              </div>
              <p className="font-sans text-[12px] text-text-muted pl-6">{r.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
