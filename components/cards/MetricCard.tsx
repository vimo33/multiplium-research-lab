const T = {
  ink:     "#1A1C19",
  primary: "#6E2D2A",
  muted:   "#896361",
  border:  "#DDD8CF",
  faint:   "#F9F6F0",
  surface: "#FFFFFF",
} as const;

const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const SANS    = "'Chivo', 'Albert Sans', sans-serif";

interface Props {
  icon: string;
  label: string;
  value: string | number;
  description?: string;
}

export default function MetricCard({ label, value, description }: Props) {
  return (
    <div style={{
      border: `1px solid ${T.border}`,
      borderTop: `3px solid ${T.primary}`,
      background: T.surface,
      padding: "24px 24px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}>
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
    </div>
  );
}
