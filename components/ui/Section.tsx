import { cn } from "@/lib/utils";
import { Container } from "./Container";

export type SectionTheme = "light" | "sand" | "dark";

type SectionProps = {
  id?: string;
  theme?: SectionTheme;
  pattern?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
};

const themes: Record<SectionTheme, string> = {
  light: "bg-white text-nuit",
  sand: "bg-sable text-nuit",
  dark: "bg-nuit text-white",
};

/** Section de page : gère le thème clair/sombre, l'espacement et le motif « plan d'architecte ». */
export function Section({
  id,
  theme = "light",
  pattern = false,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme}
      className={cn(
        "relative isolate overflow-hidden py-20 sm:py-28 lg:py-32",
        themes[theme],
        className,
      )}
      {...rest}
    >
      {pattern && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 mask-fade",
            theme === "dark" ? "bg-blueprint-dark" : "bg-blueprint",
          )}
        />
      )}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
