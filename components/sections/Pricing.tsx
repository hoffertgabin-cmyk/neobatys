"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { Check } from "lucide-react";
import { pricing } from "@/content/pricing";
import { sectionsCopy } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

type Billing = "monthly" | "yearly";

function BillingToggle({ value, onChange }: { value: Billing; onChange: (v: Billing) => void }) {
  const options: { value: Billing; label: string }[] = [
    { value: "monthly", label: "Mensuel" },
    { value: "yearly", label: "Annuel" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Période de facturation"
      className="inline-flex rounded-full bg-white p-1 shadow-soft ring-1 ring-nuit/5"
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative h-10 rounded-full px-5 text-sm font-semibold transition-colors",
              active ? "text-white" : "text-ardoise-dark hover:text-nuit",
            )}
          >
            {active && (
              <m.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-full bg-nuit"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <Section id="tarifs" theme="sand" pattern aria-labelledby="tarifs-titre">
      <SectionHeading
        id="tarifs-titre"
        eyebrow={sectionsCopy.pricing.eyebrow}
        title={sectionsCopy.pricing.title}
        subtitle={sectionsCopy.pricing.subtitle}
      />
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <BillingToggle value={billing} onChange={setBilling} />
        <span className="rounded-full bg-chantier/15 px-3 py-1 text-xs font-semibold text-chantier-dark">
          Annuel : {pricing.yearlyDiscountLabel}
        </span>
      </div>

      <Stagger className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
        {pricing.plans.map((plan) => {
          const price = billing === "monthly" ? plan.monthly : plan.yearly;
          const featured = plan.featured;
          return (
            <StaggerItem
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl p-7 sm:p-8",
                featured
                  ? "bg-nuit text-white shadow-lift ring-2 ring-chantier lg:-my-4 lg:py-12"
                  : "bg-white text-nuit shadow-soft ring-1 ring-nuit/5",
              )}
            >
              {featured && "badge" in plan && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-chantier px-4 py-1 text-xs font-bold whitespace-nowrap text-nuit shadow-glow">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className={cn("mt-2 text-sm", featured ? "text-ardoise-light" : "text-ardoise")}>
                {plan.description}
              </p>

              <div className="mt-6">
                <p className={cn("text-sm", featured ? "text-ardoise-light" : "text-ardoise")}>
                  <span className={cn("font-semibold", featured ? "text-white" : "text-nuit")}>
                    {plan.setup}
                  </span>{" "}
                  {plan.setupLabel}
                </p>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <m.span
                    key={`${plan.id}-${billing}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-5xl font-extrabold tabular-nums"
                  >
                    {price}
                  </m.span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      featured ? "text-ardoise-light" : "text-ardoise",
                    )}
                  >
                    {plan.unit}
                  </span>
                </p>
                <p className={cn("mt-1 text-xs", featured ? "text-ardoise-light" : "text-ardoise")}>
                  {billing === "yearly" ? "facturé annuellement, " : ""}
                  {plan.unitSub}
                </p>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-chantier" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href={plan.cta.href}
                variant={featured ? "light" : "primary"}
                size="lg"
                arrow
                className="mt-8 w-full"
              >
                {plan.cta.label}
              </Button>
            </StaggerItem>
          );
        })}
      </Stagger>
      <p className="mt-10 text-center text-sm text-ardoise-dark">{pricing.note}</p>
    </Section>
  );
}
