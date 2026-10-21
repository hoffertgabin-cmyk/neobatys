import { cn } from "@/lib/utils";

/** Cadre de navigateur dessiné en code. */
export function BrowserMockup({
  url = "votre-entreprise.fr",
  children,
  className,
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-white shadow-[0_40px_80px_-24px_rgb(0_0_0/0.5)] ring-1 ring-nuit/10",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-nuit/8 bg-sable/70 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex h-6 w-full max-w-[60%] items-center justify-center rounded-md bg-white px-3 text-[10px] text-ardoise-dark ring-1 ring-nuit/8">
          <span className="truncate">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
