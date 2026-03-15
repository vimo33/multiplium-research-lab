"use client";
import Link from "next/link";

const T = {
  ink:     "#1A1C19",
  primary: "#6E2D2A",
  muted:   "#896361",
  border:  "#DDD8CF",
  surface: "#FFFFFF",
} as const;

const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const SANS    = "'Chivo', 'Albert Sans', sans-serif";

interface Props {
  icon: string;
  label: string;
  value: string | number;
  description?: string;
  href?: string;
}

export default function MetricCard({ label, value, description, href }: Props) {
  const inner = (
    <>
      <p style={{
        fontFamily: SANS,
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: T.muted,
        margin: 0,
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: DISPLAY,
        fontSize: "52px",
        fontWeight: 400,
        lineHeight: 1,
        color: T.ink,
        margin: 0,
      }}>
        {value}
      </p>
      {description && (
        <p style={{
          fontFamily: SANS,
          fontSize: "12px",
          color: T.muted,
          lineHeight: 1.55,
          margin: 0,
        }}>
          {description}
        </p>
      )}
    </>
  );

  const style = {
    border: `1px solid ${T.border}`,
    borderTop: `3px solid ${T.primary}`,
    background: T.surface,
    padding: "24px 24px 20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    textDecoration: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  };

  if (href) {
    return (
      <Link href={href} style={style}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.primary; (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px ${T.primary}18`; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        {inner}
      </Link>
    );
  }

  return <div style={style}>{inner}</div>;
}
