import { notFound } from "next/navigation";
import { getDossier } from "@/lib/data";
import DossierArticle from "@/components/research/DossierArticle";
import { formatScore } from "@/lib/utils";

// Presentation design tokens
const T = {
  bg:      "#F9F6F0",
  ink:     "#1A1C19",
  primary: "#6E2D2A",
  muted:   "#896361",
  border:  "#DDD8CF",
  faint:   "#F0EBE1",
} as const;

const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const SANS    = "'Chivo', 'Albert Sans', sans-serif";
const MONO    = "'JetBrains Mono', monospace";

const SIGNAL_LABEL: Record<string, string> = {
  HIGH:   "High Conviction",
  MEDIUM: "Medium Conviction",
};

export function generateStaticParams() {
  return ["biome-makers", "biorizon-biotech", "agrology"].map(slug => ({ slug }));
}

export default async function DossierPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let dossier;
  try { dossier = getDossier(slug); }
  catch { notFound(); }

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: SANS }}>
      {/* Burgundy accent line at top */}
      <div style={{ height: "2px", background: T.primary, opacity: 0.3, position: "sticky", top: "57px", zIndex: 40 }} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "72px 48px 96px" }}>

        {/* Breadcrumb */}
        <p style={{
          fontFamily: SANS, fontSize: "10px", letterSpacing: "0.2em",
          textTransform: "uppercase", color: T.muted, marginBottom: "40px",
        }}>
          Deep Research &nbsp;/&nbsp; {dossier.company}
        </p>

        {/* Score + Signal row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
          <span style={{
            fontFamily: MONO, fontSize: "42px", fontWeight: 400, color: T.primary, lineHeight: 1,
          }}>
            {formatScore(dossier.score)}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {dossier.signal && (
              <span style={{
                fontFamily: SANS, fontSize: "9px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: T.primary,
                border: `1px solid ${T.primary}`,
                padding: "3px 8px",
                display: "inline-block",
              }}>
                {SIGNAL_LABEL[dossier.signal] ?? dossier.signal}
              </span>
            )}
            <span style={{ fontFamily: MONO, fontSize: "11px", color: T.muted }}>
              Rank #{dossier.rank}
            </span>
          </div>
        </div>

        {/* Company name */}
        <h1 style={{
          fontFamily: DISPLAY,
          fontSize: "clamp(40px, 5vw, 60px)",
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: T.ink,
          marginBottom: "24px",
        }}>
          {dossier.company}
        </h1>

        {/* Rationale lead */}
        <p style={{
          fontFamily: SANS, fontSize: "15px", lineHeight: 1.7,
          color: T.muted, maxWidth: "640px", marginBottom: "36px",
        }}>
          {dossier.shortlistRationale}
        </p>

        {/* Thin rule */}
        <div style={{ height: "1px", background: T.border, marginBottom: "36px" }} />

        {/* Risk card */}
        {dossier.majorRisk && (
          <div style={{
            border: `1px solid ${T.border}`,
            borderTop: `3px solid ${T.primary}`,
            background: "#fff",
            padding: "20px 24px",
            marginBottom: "48px",
          }}>
            <p style={{
              fontFamily: SANS, fontSize: "9px", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: T.primary, marginBottom: "8px",
            }}>
              Major Risk
            </p>
            <p style={{ fontFamily: SANS, fontSize: "13px", color: T.ink, lineHeight: 1.65 }}>
              {dossier.majorRisk}
            </p>
          </div>
        )}

        {/* Dossier sections */}
        <DossierArticle sections={dossier.sections} />
      </div>
    </div>
  );
}
