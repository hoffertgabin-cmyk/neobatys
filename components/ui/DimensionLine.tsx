import { cn } from "@/lib/utils";

/** Ligne de cote façon plan technique : |←——→| */
export function DimensionLine({ className, label }: { className?: string; label?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex h-3 items-center text-current", className)}
    >
      <span className="absolute inset-y-0 left-0 w-px bg-current opacity-70" />
      <span className="absolute inset-y-0 right-0 w-px bg-current opacity-70" />
      <span className="h-px w-full bg-current opacity-50" />
      {label && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-wider whitespace-nowrap opacity-70">
          {label}
        </span>
      )}
    </span>
  );
}
