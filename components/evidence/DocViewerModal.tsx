"use client";
import { useEffect, useState } from "react";

interface Props {
  filePath: string; // e.g. "output_sanitized/02_scoring/02_top20.csv"
  onClose: () => void;
}

// Map the legacy evidence-meta path to the public URL path
function toPublicPath(filePath: string): string {
  // filePath is like "output_sanitized/02_scoring/02_top20.csv"
  // strip the "output_sanitized/" prefix
  const stripped = filePath.replace(/^output_sanitized\//, "");
  return `/data/docs/${stripped}`;
}

export default function DocViewerModal({ filePath, onClose }: Props) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = toPublicPath(filePath);
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error("Not found");
        return r.text();
      })
      .then(setContent)
      .catch(() => setError(true));
  }, [filePath]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface border border-border-color rounded-sm w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-color shrink-0">
          <span className="font-mono text-[12px] text-text-muted truncate">{filePath}</span>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-main transition-colors ml-4 shrink-0"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        {/* Content */}
        <div className="overflow-auto flex-1 p-5">
          {error ? (
            <p className="font-sans text-[13px] text-text-muted">Could not load file.</p>
          ) : content === null ? (
            <p className="font-sans text-[13px] text-text-muted">Loading…</p>
          ) : (
            <pre className="font-mono text-[12px] text-text-main whitespace-pre-wrap break-words leading-relaxed">
              {content}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
