// frontend/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { InvestorSignal, ScoreConfidence } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return score.toFixed(2);
}

export function scoreToPercent(score: number, max = 5): number {
  return Math.round((score / max) * 100);
}

export function signalColor(signal: InvestorSignal): string {
  return {
    HIGH:      "text-primary bg-primary/10 border-primary/30",
    MEDIUM:    "text-accent bg-accent/10 border-accent/30",
    LOW:       "text-text-muted bg-text-muted/10 border-text-muted/20",
    WATCHLIST: "text-amber-700 bg-amber-50 border-amber-200",
  }[signal] ?? "text-text-muted bg-text-muted/10";
}

export function confidenceColor(conf: ScoreConfidence): string {
  return {
    high:   "text-primary bg-primary/10",
    medium: "text-accent bg-accent/10",
    low:    "text-text-muted bg-text-muted/10",
  }[conf];
}

export function heatColor(score: number, max = 5): string {
  const pct = score / max;
  if (pct >= 0.9) return "rgba(74,93,35,1.0)";
  if (pct >= 0.8) return "rgba(74,93,35,0.8)";
  if (pct >= 0.6) return "rgba(74,93,35,0.6)";
  if (pct >= 0.4) return "rgba(74,93,35,0.4)";
  if (pct >= 0.2) return "rgba(74,93,35,0.2)";
  return "rgba(74,93,35,0.1)";
}

export function segmentShort(segment: string): string {
  const MAP: Record<string, string> = {
    "Precision viticulture / vineyard management": "Precision Viti",
    "Soil health / biologicals":                   "Soil Health",
    "Carbon MRV / traceability":                   "Carbon MRV",
    "Irrigation optimisation":                     "Irrigation",
    "Pest management":                             "Pest Mgmt",
    "Wine production technologies":                "Wine Production",
    "Packaging / recycling":                       "Packaging",
    "Marketing / distribution":                    "Marketing",
    "Consumption platforms":                       "Consumption",
  };
  return MAP[segment] ?? segment;
}
