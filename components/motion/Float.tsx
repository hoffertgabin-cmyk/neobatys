import { cn } from "@/lib/utils";

/** Flottement lent et continu en CSS (coupé automatiquement si l'utilisateur réduit les animations). */
export function Float({
  children,
  className,
  amplitude = 10,
  duration = 6,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  return (
    <div
      className={cn("animate-float", className)}
      style={
        {
          "--float-y": `${-amplitude}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
