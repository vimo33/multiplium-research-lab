// frontend/components/layout/PageContainer.tsx
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "editorial" | "wide" | "full";
  className?: string;
}

export default function PageContainer({ children, variant = "editorial", className }: Props) {
  return (
    <div
      className={cn(
        "mx-auto px-8 pb-24 pt-20",
        variant === "editorial" && "max-w-[800px]",
        variant === "wide"     && "max-w-[1200px]",
        variant === "full"     && "px-0 pt-0",
        className
      )}
    >
      {children}
    </div>
  );
}
