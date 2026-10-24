import { Check, X } from "lucide-react";
import { softwareOnboarding, softwareWeek } from "@/content/software";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Comparaison d'une semaine type, sans et avec le logiciel. */
export function SoftwareWeek() {
  const columns = [
    { ...softwareWeek.without, good: false },
    { ...softwareWeek.with, good: true },
  ];
  return (
    <Section theme="light" aria-labelledby="semaine-titre">
      <SectionHeading
        id="semaine-titre"
        eyebrow={softwareWeek.eyebrow}
        title={softwareWeek.title}
        subtitle={softwareWeek.subtitle}
      />
      <Stagger className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
        {columns.map((c) => (
          <StaggerItem
            key={c.title}
            className={cn(
              "rounded-3xl p-6 sm:p-8",
              c.good ? "bg-nuit text-white shadow-lift" : "bg-sable ring-1 ring-nuit/5",
            )}
          >
            <h3 className="text-xl font-bold">{c.title}</h3>
            <ul className="mt-6 space-y-4">
              {c.items.map((it) => (
                <li key={it.task} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
                      c.good ? "bg-chantier text-white" : "bg-nuit/8 text-ardoise-dark",
                    )}
                  >
                    {c.good ? (
                      <Check aria-hidden="true" className="size-3.5" />
                    ) : (
                      <X aria-hidden="true" className="size-3.5" />
                    )}
                  </span>
                  <span
                    className={cn("flex-1", c.good ? "text-ardoise-light" : "text-ardoise-dark")}
                  >
                    {it.task}
                  </span>
                  <span className="font-semibold whitespace-nowrap tabular-nums">{it.time}</span>
                </li>
              ))}
            </ul>
            <p
              className={cn(
                "mt-6 flex items-baseline justify-between border-t pt-5",
                c.good ? "border-white/10" : "border-nuit/10",
              )}
            >
              <span className={c.good ? "text-ardoise-light" : "text-ardoise-dark"}>
                Par semaine
              </span>
              <span
                className={cn(
                  "font-display text-4xl font-semibold tracking-tight",
                  c.good && "text-chantier-light",
                )}
              >
                {c.total}
              </span>
            </p>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-6 text-center text-sm text-ardoise">{softwareWeek.note}</p>
    </Section>
  );
}

/** Mise en place en 4 étapes. */
export function SoftwareOnboarding() {
  return (
    <Section theme="sand" aria-labelledby="mise-en-place-titre">
      <SectionHeading
        id="mise-en-place-titre"
        eyebrow={softwareOnboarding.eyebrow}
        title={softwareOnboarding.title}
        subtitle={softwareOnboarding.subtitle}
      />
      <Stagger as="ol" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {softwareOnboarding.steps.map((s, i) => (
          <StaggerItem
            as="li"
            key={s.title}
            className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-nuit/5"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-nuit font-display text-lg font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-ardoise-dark">{s.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
