// frontend/components/cards/MetricCard.tsx
interface Props {
  icon: string;
  label: string;
  value: string | number;
  description?: string;
}

export default function MetricCard({ icon, label, value, description }: Props) {
  return (
    <div className="border-t-2 border-text-main pt-6 cursor-pointer hover:bg-surface p-4 -mx-4 rounded-sm transition-colors group">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        <h3 className="font-sans text-[13px] uppercase text-text-muted tracking-wider max-w-[6rem] leading-snug">{label}</h3>
      </div>
      <div className="font-mono text-[32px] text-text-main leading-none">{value}</div>
      {description && (
        <p className="font-sans text-[13px] text-text-muted mt-2 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
