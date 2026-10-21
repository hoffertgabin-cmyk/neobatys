import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { DimensionLine } from "./DimensionLine";

type Props = {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  theme?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  as: Tag = "h2",
  className,
}: Props) {
  const dark = theme === "dark";
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-sm font-semibold tracking-wide uppercase",
            dark ? "text-chantier-light" : "text-chantier-dark",
          )}
        >
          <DimensionLine className="w-8" />
          {eyebrow}
          {align === "center" && <DimensionLine className="w-8" />}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-nuit",
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-ardoise-light" : "text-ardoise-dark",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
