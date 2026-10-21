import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
  variant?: "light" | "sand" | "glass";
  hover?: boolean;
};

const variants = {
  light: "bg-white ring-1 ring-nuit/5 shadow-soft",
  sand: "bg-sable ring-1 ring-nuit/5",
  glass: "glass text-white",
};

export function Card({ className, children, variant = "light", hover = false }: Props) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 sm:p-7",
        variants[variant],
        hover &&
          "transition-[transform,translate,scale,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
