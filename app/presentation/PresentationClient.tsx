"use client";
import { useEffect, useState, useCallback } from "react";
import type { SlideData, BulletItem, GridColumn, Card, RankedItem } from "./slides-data";

// ── Design tokens (deck_design_ref palette) ──────────────────────────────────
const T = {
  bg:      "#F9F6F0",
  ink:     "#1A1C19",
  primary: "#6E2D2A",   // deep burgundy
  muted:   "#896361",
  accent:  "#4A5D23",   // vine green
  surface: "#FFFFFF",
  border:  "#DDD8CF",
  faint:   "#F0EBE1",
  dark:    "#1A1C19",   // bottom bar
} as const;

const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const SANS    = "'Chivo', 'Albert Sans', sans-serif";
const MONO    = "'JetBrains Mono', monospace";

interface Props { slides: SlideData[] }

export default function PresentationClient({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent(c => Math.min(c + 1, slides.length - 1)), [slides.length]);
  const goPrev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft")                   { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goNext, goPrev]);

  const slide = slides[current];
  const isCover = slide.body.type === "cover";

  return (
    <>
      {/* Inject deck fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Chivo:wght@300;400;700&display=swap');`}</style>

      <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: T.bg, zIndex: 9999, fontFamily: SANS }}>

        {/* ── Top bar (hidden on cover) ──────────────────────────────────── */}
        {!isCover && (
          <div className="flex items-center justify-between px-12 py-3 shrink-0" style={{ borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontFamily: SANS, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: T.muted }}>
              {slide.section}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width:      i === current ? "20px" : "6px",
                    height:     "6px",
                    borderRadius: "0",
                    background: i === current ? T.primary : T.border,
                    border:     "none",
                    cursor:     "pointer",
                    transition: "all 0.2s",
                    padding:    0,
                  }}
                />
              ))}
            </div>
            <span style={{ fontFamily: MONO, fontSize: "11px", color: T.muted }}>
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* ── Slide content ─────────────────────────────────────────────── */}
        <div key={current} className="flex-1 overflow-y-auto">
          <SlideContent slide={slide} isCover={isCover} />
        </div>

        {/* ── Bottom navigation bar ─────────────────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between px-12 py-4" style={{ background: T.dark, borderTop: `1px solid ${T.primary}33` }}>
          <button
            onClick={goPrev}
            disabled={current === 0}
            style={{
              fontFamily: SANS, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
              color: current === 0 ? "#ffffff30" : "#ffffff80",
              background: "none", border: "none", cursor: current === 0 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: "10px",
            }}
          >
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "currentColor" }} />
            Prev
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                title={s.section}
                style={{
                  width: "6px", height: "6px",
                  borderRadius: "0",
                  background: i === current ? T.primary : "#ffffff20",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={current === slides.length - 1}
            style={{
              fontFamily: SANS, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
              color: current === slides.length - 1 ? "#ffffff30" : "#ffffff80",
              background: "none", border: "none", cursor: current === slides.length - 1 ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: "10px",
            }}
          >
            Next
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: "currentColor" }} />
          </button>
        </div>
      </div>
    </>
  );
}

// ── Slide layout ──────────────────────────────────────────────────────────────

function SlideContent({ slide, isCover }: { slide: SlideData; isCover: boolean }) {
  if (isCover && slide.body.type === "cover") {
    return <CoverSlide slide={slide} meta={slide.body.meta} />;
  }
  return <ContentSlide slide={slide} />;
}

// ── Cover: 40 / 60 editorial split ───────────────────────────────────────────

function CoverSlide({ slide, meta }: { slide: SlideData; meta: string[] }) {
  return (
    <div className="flex min-h-full" style={{ minHeight: "calc(100vh - 56px)" }}>
      {/* Left 40%: logo + whitespace */}
      <div
        className="flex flex-col justify-between"
        style={{
          width: "40%",
          padding: "56px 48px",
          borderRight: `1px solid ${T.border}`,
          background: T.faint,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Multiplium logo mark */}
          <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill={T.primary}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill={T.primary}/>
          </svg>
          <span style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.ink }}>
            Multiplium
          </span>
        </div>
        {/* spacer */}
        <div />
      </div>

      {/* Right 60%: title + meta */}
      <div
        className="flex flex-col justify-center relative"
        style={{ width: "60%", padding: "56px 72px" }}
      >
        <h1 style={{
          fontFamily:   DISPLAY,
          fontSize:     "clamp(40px, 5vw, 68px)",
          fontWeight:   400,
          lineHeight:   1.08,
          letterSpacing: "-0.01em",
          color:         T.ink,
          marginBottom:  "48px",
        }}>
          {slide.title}
        </h1>

        <div style={{ width: "100%", height: "1px", background: T.ink, opacity: 0.15, marginBottom: "28px" }} />

        <div style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted }}>
          {meta.join("  ·  ")}
        </div>

        {/* Begin arrow — bottom right */}
        <div style={{ position: "absolute", bottom: "48px", right: "72px" }}>
          <span style={{
            fontFamily: SANS, fontSize: "12px", fontWeight: 500,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: T.ink, display: "flex", alignItems: "center", gap: "16px",
          }}>
            Begin Report
            <span style={{ display: "inline-block", width: "40px", height: "1px", background: T.ink }} />
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
          </span>
        </div>

        {/* Bottom accent line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, ${T.primary}, transparent)` }} />
      </div>
    </div>
  );
}

// ── Content slide ─────────────────────────────────────────────────────────────

function ContentSlide({ slide }: { slide: SlideData }) {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "52px 48px" }}>
      {/* Eyebrow */}
      <p style={{
        fontFamily: SANS, fontSize: "10px", letterSpacing: "0.2em",
        textTransform: "uppercase", color: T.muted, marginBottom: "16px",
      }}>
        {slide.section}
      </p>

      {/* Title */}
      <h2 style={{
        fontFamily:   DISPLAY,
        fontSize:     "clamp(36px, 4vw, 52px)",
        fontWeight:   400,
        lineHeight:   1.1,
        letterSpacing: "-0.01em",
        color:         T.ink,
        marginBottom:  slide.subtitle ? "12px" : "40px",
      }}>
        {slide.title}
      </h2>

      {slide.subtitle && (
        <p style={{
          fontFamily: SANS, fontSize: "14px", color: T.muted,
          marginBottom: "36px", lineHeight: 1.6,
        }}>
          {slide.subtitle}
        </p>
      )}

      {/* Thin rule */}
      <div style={{ height: "1px", background: T.border, marginBottom: "36px" }} />

      <BodyContent body={slide.body} />
    </div>
  );
}

// ── Body renderers ────────────────────────────────────────────────────────────

function BodyContent({ body }: { body: SlideData["body"] }) {
  switch (body.type) {
    case "cover": return null;

    case "bullets":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {body.lead && (
            <p style={{
              fontFamily: SANS, fontSize: "15px", lineHeight: 1.65,
              color: T.ink, paddingLeft: "20px",
              borderLeft: `3px solid ${T.primary}`,
              marginBottom: "8px",
            }}>
              {body.lead}
            </p>
          )}
          {body.items.map((item: BulletItem, i: number) => (
            <div key={i}>
              <p style={{ fontFamily: SANS, fontSize: "14px", fontWeight: 500, color: T.ink, display: "flex", gap: "10px" }}>
                <span style={{ color: T.primary, flexShrink: 0 }}>—</span>
                {item.text}
              </p>
              {item.sub && (
                <ul style={{ marginTop: "8px", marginLeft: "24px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {item.sub.map((s, j) => (
                    <li key={j} style={{ fontFamily: SANS, fontSize: "12px", color: T.muted, listStyle: "disc", marginLeft: "12px" }}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );

    case "grid": {
      const count = body.columns.length;
      const cols = count <= 3 ? 3 : count === 4 ? 4 : 3;
      return (
        <div>
          {body.lead && <p style={{ fontFamily: SANS, fontSize: "14px", color: T.muted, marginBottom: "24px" }}>{body.lead}</p>}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "16px" }}>
            {body.columns.map((col: GridColumn, i: number) => (
              <div key={i} style={{ border: `1px solid ${T.border}`, background: T.faint, padding: "20px" }}>
                <p style={{
                  fontFamily: SANS, fontSize: "10px", letterSpacing: "0.18em",
                  textTransform: "uppercase", color: T.primary,
                  marginBottom: "12px", fontWeight: 600,
                }}>
                  {col.heading}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {col.items.map((item, j) => (
                    <li key={j} style={{ fontFamily: SANS, fontSize: "13px", color: T.ink }}>{item}</li>
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
          {body.lead && <p style={{ fontFamily: SANS, fontSize: "14px", color: T.muted, marginBottom: "20px" }}>{body.lead}</p>}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${T.ink}` }}>
                {body.headers.map((h: string, i: number) => (
                  <th key={i} style={{
                    textAlign: "left", fontFamily: SANS, fontSize: "10px",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: T.muted, paddingBottom: "10px", paddingRight: "32px",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.rows.map((row: string[], i: number) => (
                <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      fontFamily: j === 0 ? MONO : SANS,
                      fontSize: "13px",
                      color: j === 0 ? T.primary : T.ink,
                      padding: "10px 32px 10px 0",
                    }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "cards": {
      const count = body.cards.length;
      const cols = count <= 3 ? 3 : count === 4 ? 2 : 3;
      return (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "16px" }}>
          {body.cards.map((card: Card, i: number) => (
            <div key={i} style={{
              border: `1px solid ${T.border}`,
              background: T.surface,
              padding: "24px",
              borderTop: `3px solid ${T.primary}`,
            }}>
              <p style={{
                fontFamily: SANS, fontSize: "12px", fontWeight: 600,
                color: T.ink, marginBottom: "10px", lineHeight: 1.4,
              }}>
                {card.title}
              </p>
              <p style={{ fontFamily: SANS, fontSize: "12px", color: T.muted, lineHeight: 1.65 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      );
    }

    case "two-col":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px" }}>
          {[body.left, body.right].map((side, si) => (
            <div key={si} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {side.map((section, i) => (
                <div key={i}>
                  <p style={{
                    fontFamily: SANS, fontSize: "10px", letterSpacing: "0.18em",
                    textTransform: "uppercase", color: T.primary,
                    marginBottom: "12px", fontWeight: 600,
                  }}>
                    {section.heading}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{
                        fontFamily: SANS, fontSize: "13px", color: T.ink,
                        display: "flex", alignItems: "flex-start", gap: "10px",
                      }}>
                        <span style={{ color: T.primary, flexShrink: 0, marginTop: "1px" }}>—</span>
                        {item}
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
          {body.lead && (
            <p style={{ fontFamily: SANS, fontSize: "13px", fontStyle: "italic", color: T.muted, marginBottom: "28px" }}>
              {body.lead}
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {body.items.map((item: RankedItem, idx: number) => (
              <div key={item.rank} style={{
                display: "flex", alignItems: "baseline", gap: "24px",
                padding: "14px 0",
                borderBottom: `1px solid ${T.border}`,
                background: idx % 2 === 0 ? "transparent" : T.faint,
                paddingLeft: idx % 2 !== 0 ? "8px" : "0",
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: "22px", fontWeight: 400,
                  color: T.primary, minWidth: "36px", flexShrink: 0,
                }}>
                  {String(item.rank).padStart(2, "0")}
                </span>
                <div>
                  <p style={{ fontFamily: DISPLAY, fontSize: "18px", fontWeight: 600, color: T.ink }}>
                    {item.name}
                  </p>
                  {item.note && (
                    <p style={{ fontFamily: SANS, fontSize: "12px", color: T.muted, marginTop: "2px" }}>
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default: return null;
  }
}
