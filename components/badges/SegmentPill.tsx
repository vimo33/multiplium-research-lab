import { segmentShort } from "@/lib/utils";

export default function SegmentPill({ segment }: { segment: string }) {
  return (
    <span className="text-[11px] font-sans text-text-muted bg-background-light border border-border-color px-2 py-0.5 rounded">
      {segmentShort(segment)}
    </span>
  );
}
