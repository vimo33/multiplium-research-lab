import { cn, confidenceColor } from "@/lib/utils";
import type { ScoreConfidence } from "@/lib/types";

export default function ConfidenceBadge({ confidence }: { confidence: ScoreConfidence }) {
  return (
    <span className={cn("text-[11px] font-mono font-medium px-2 py-0.5 rounded uppercase tracking-wider", confidenceColor(confidence))}>
      {confidence}
    </span>
  );
}
