"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DossierSection } from "@/lib/types";

const T = {
  ink:     "#1A1C19",
  primary: "#6E2D2A",
  muted:   "#896361",
  border:  "#DDD8CF",
  faint:   "#F0EBE1",
} as const;

const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const SANS    = "'Chivo', 'Albert Sans', sans-serif";
const MONO    = "'JetBrains Mono', monospace";

interface Props { sections: DossierSection[]; }

export default function DossierArticle({ sections }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {sections.map((section, i) => (
        <section key={i} style={{ borderTop: `1px solid ${T.border}`, paddingTop: "36px", paddingBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "20px" }}>
            <span style={{
              fontFamily: MONO, fontSize: "11px", color: T.primary,
              flexShrink: 0, minWidth: "20px",
            }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 style={{
              fontFamily: DISPLAY, fontSize: "24px", fontWeight: 400,
              lineHeight: 1.2, color: T.ink, letterSpacing: "-0.01em",
            }}>
              {section.title}
            </h3>
          </div>
          <div style={{ paddingLeft: "36px" }}>
            <div
              className="
                [&>p]:font-[Chivo,Albert_Sans,sans-serif] [&>p]:text-[14px] [&>p]:leading-[1.75] [&>p]:mb-4
                [&>ul]:mb-4 [&>ul>li]:mb-1.5 [&>ul>li]:text-[14px] [&>ul>li]:leading-[1.7]
                [&>h4]:text-[15px] [&>h4]:font-semibold [&>h4]:mt-5 [&>h4]:mb-2
                [&>blockquote]:pl-5 [&>blockquote]:border-l-[3px] [&>blockquote]:border-[#6E2D2A]
                [&>blockquote]:italic [&>blockquote]:text-[#896361] [&>blockquote]:my-4
                [&>table]:w-full [&>table]:text-[13px] [&>table]:border-collapse [&>table]:mb-4
                [&>table_th]:text-left [&>table_th]:font-semibold [&>table_th]:pb-2 [&>table_th]:border-b-2 [&>table_th]:border-[#1A1C19]
                [&>table_td]:py-2 [&>table_td]:border-b [&>table_td]:border-[#DDD8CF]
              "
              style={{ fontFamily: SANS, fontSize: "14px", color: T.ink, lineHeight: 1.75 }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
