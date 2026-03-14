import type { ScoringPillar } from "@/lib/types";

interface Props { pillars: ScoringPillar[]; }

export default function ScoringPillarList({ pillars }: Props) {
  return (
    <div className="space-y-6">
      {pillars.map((p, i) => (
        <div key={i} className="border-l-2 border-primary pl-4 py-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-sans text-[13px] font-medium text-text-main">{p.name}</span>
            <span className="font-mono text-[13px] text-primary font-medium">{p.weightLabel}</span>
          </div>
          <p className="font-sans text-[13px] text-text-muted leading-relaxed">{p.description}</p>
        </div>
      ))}
    </div>
  );
}
