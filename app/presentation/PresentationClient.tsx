// frontend/app/presentation/PresentationClient.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import type { SlideData, BulletItem, GridColumn, Card, RankedItem } from "./slides-data";

interface Props { slides: SlideData[] }

export default function PresentationClient({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent(c => Math.min(c + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrent(c => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft")                   { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const slide = slides[current];

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 9999, background: "var(--color-background, #F9F8F6)" }}
    >
      {/* Top bar: section label + progress dots + counter */}
      <div
        className="flex items-center justify-between px-10 py-4 border-b shrink-0"
        style={{ borderColor: "var(--color-border, #E5E2DC)" }}
      >
        <span className="font-sans text-[11px] uppercase tracking-widest" style={{ color: "var(--color-text-muted, #888)" }}>
          {slide.section}
        </span>

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-200"
              style={{
                width:      i === current ? "16px" : "8px",
                height:     "8px",
                background: i === current
                  ? "var(--color-primary, #4A5D23)"
                  : "var(--color-border, #E5E2DC)",
              }}
            />
          ))}
        </div>

        <span className="font-mono text-[12px]" style={{ color: "var(--color-text-muted, #888)" }}>
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Slide body — scrollable */}
      <div key={current} className="flex-1 overflow-y-auto px-16 py-12 animate-fade-in">
        <SlideContent slide={slide} />
      </div>

      {/* Bottom navigation */}
      <div
        className="flex items-center justify-between px-10 py-5 border-t shrink-0"
        style={{ borderColor: "var(--color-border, #E5E2DC)" }}
      >
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex items-center gap-2 font-sans text-[13px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: "var(--color-text-muted, #888)" }}
        >
          <span>←</span> Previous
        </button>
        <span className="font-sans text-[11px] uppercase tracking-widest" style={{ color: "var(--color-text-muted, #888)" }}>
          ← → or Space to navigate
        </span>
        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          className="flex items-center gap-2 font-sans text-[13px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: "var(--color-text-muted, #888)" }}
        >
          Next <span>→</span>
        </button>
      </div>
    </div>
  );
}

// ── Slide content ────────────────────────────────────────────────────────────

function SlideContent({ slide }: { slide: SlideData }) {
  const muted  = "var(--color-text-muted, #888)";
  const main   = "var(--color-text-main, #1A1A18)";
  const primary = "var(--color-primary, #4A5D23)";
  const border  = "var(--color-border, #E5E2DC)";
  const surface = "var(--color-surface, #fff)";

  if (slide.body.type === "cover") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em]" style={{ color: muted }}>
          Multiplium Research Lab
        </p>
        <h1 className="font-display text-[52px] font-semibold leading-[1.08] tracking-tight max-w-2xl">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="font-display text-[24px] italic font-normal" style={{ color: muted }}>
            {slide.subtitle}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-2">
          {slide.body.meta.map((line, i) => (
            <p key={i} className="font-sans text-[14px]" style={{ color: muted }}>{line}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-[44px] font-semibold leading-tight tracking-tight mb-2">{slide.title}</h2>
      {slide.subtitle && (
        <p className="font-sans text-[15px] italic mb-8" style={{ color: muted }}>{slide.subtitle}</p>
      )}
      <div className={slide.subtitle ? "" : "mt-8"}>
        <BodyContent body={slide.body} muted={muted} main={main} primary={primary} border={border} surface={surface} />
      </div>
    </div>
  );
}

interface Colors { muted: string; main: string; primary: string; border: string; surface: string }

function BodyContent({ body, muted, main, primary, border, surface }: { body: SlideData["body"] } & Colors) {
  switch (body.type) {
    case "cover": return null;

    case "bullets":
      return (
        <div className="space-y-4">
          {body.lead && (
            <p className="font-sans text-[16px] leading-relaxed mb-6 pl-5 py-1"
               style={{ color: main, borderLeft: `4px solid ${primary}` }}>
              {body.lead}
            </p>
          )}
          {body.items.map((item: BulletItem, i: number) => (
            <div key={i}>
              <p className="font-sans text-[15px] font-medium" style={{ color: main }}>— {item.text}</p>
              {item.sub && (
                <ul className="mt-1.5 ml-5 space-y-1">
                  {item.sub.map((s, j) => (
                    <li key={j} className="font-sans text-[13px] list-disc" style={{ color: muted }}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );

    case "grid": {
      const cols = body.columns.length <= 3 ? "grid-cols-3" : body.columns.length === 4 ? "grid-cols-4" : "grid-cols-3";
      return (
        <div>
          {body.lead && <p className="font-sans text-[15px] mb-6" style={{ color: muted }}>{body.lead}</p>}
          <div className={`grid gap-5 ${cols}`}>
            {body.columns.map((col: GridColumn, i: number) => (
              <div key={i} className="border rounded-sm p-5" style={{ borderColor: border, background: surface }}>
                <p className="font-sans text-[11px] uppercase tracking-wider mb-3 font-medium" style={{ color: primary }}>{col.heading}</p>
                <ul className="space-y-1.5">
                  {col.items.map((item, j) => (
                    <li key={j} className="font-sans text-[13px]" style={{ color: main }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div>
          {body.lead && <p className="font-sans text-[15px] mb-4" style={{ color: muted }}>{body.lead}</p>}
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ borderBottom: `2px solid ${border}` }}>
                {body.headers.map((h: string, i: number) => (
                  <th key={i} className="text-left font-sans text-[11px] uppercase tracking-wider pb-3 pr-6" style={{ color: muted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.rows.map((row: string[], i: number) => (
                <tr key={i} style={{ borderBottom: `1px solid ${border}` }}>
                  {row.map((cell, j) => (
                    <td key={j} className="font-sans text-[13px] py-2.5 pr-6" style={{ color: j === 0 ? primary : main }}>
                      {j === 0 ? <span className="font-mono">{cell}</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "cards": {
      const grid = body.cards.length <= 3 ? "grid-cols-3" : body.cards.length === 4 ? "grid-cols-2" : "grid-cols-3";
      return (
        <div className={`grid gap-5 ${grid}`}>
          {body.cards.map((card: Card, i: number) => (
            <div key={i} className="border rounded-sm p-6" style={{ borderColor: border, background: surface }}>
              <p className="font-sans text-[13px] font-semibold mb-3 leading-snug" style={{ color: main }}>{card.title}</p>
              <p className="font-sans text-[13px] leading-relaxed" style={{ color: muted }}>{card.body}</p>
            </div>
          ))}
        </div>
      );
    }

    case "two-col":
      return (
        <div className="grid grid-cols-2 gap-12">
          {[body.left, body.right].map((side, si) => (
            <div key={si} className="space-y-6">
              {side.map((section, i) => (
                <div key={i}>
                  <p className="font-sans text-[11px] uppercase tracking-wider mb-3 font-medium" style={{ color: primary }}>{section.heading}</p>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="font-sans text-[14px] flex items-start gap-2" style={{ color: main }}>
                        <span style={{ color: primary, marginTop: "2px" }}>—</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      );

    case "ranked-list":
      return (
        <div>
          {body.lead && <p className="font-sans text-[14px] italic mb-6" style={{ color: muted }}>{body.lead}</p>}
          <div className="space-y-3">
            {body.items.map((item: RankedItem) => (
              <div key={item.rank} className="flex items-baseline gap-5 pb-3" style={{ borderBottom: `1px solid ${border}` }}>
                <span className="font-mono text-[20px] w-8 shrink-0" style={{ color: primary }}>
                  {String(item.rank).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-[18px] font-semibold" style={{ color: main }}>{item.name}</p>
                  {item.note && <p className="font-sans text-[13px] mt-0.5" style={{ color: muted }}>{item.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default: return null;
  }
}
