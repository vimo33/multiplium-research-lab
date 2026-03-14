import { cn, signalColor } from "@/lib/utils";
import type { InvestorSignal } from "@/lib/types";

export default function SignalBadge({ signal }: { signal: InvestorSignal }) {
  return (
    <span className={cn("text-[11px] font-mono font-medium px-2 py-0.5 rounded border uppercase tracking-wider", signalColor(signal))}>
      {signal}
    </span>
  );
}
