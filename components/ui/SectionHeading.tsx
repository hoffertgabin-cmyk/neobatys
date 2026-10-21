import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

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
            "mb-5 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
            dark ? "bg-white/10 text-ardoise-light" : "bg-nuit/5 text-ardoise-dark",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display text-[2rem] leading-[1.06] font-semibold tracking-[-0.04em] sm:text-[2.6rem] lg:text-[3.25rem]",
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
