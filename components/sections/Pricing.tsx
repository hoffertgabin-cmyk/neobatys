import { Check } from "lucide-react";
import { pricing } from "@/content/pricing";
import { sectionsCopy } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

type Plan = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: { label: string; href: string };
  featured: boolean;
  badge?: string;
};

function PlanCard({ plan, unit, sub }: { plan: Plan; unit: string; sub: string }) {
  const featured = plan.featured;
  const muted = featured ? "text-ardoise-light" : "text-ardoise";
  return (
    <StaggerItem
      className={cn(
        "relative flex flex-col rounded-3xl p-7 sm:p-8",
        featured
          ? "bg-nuit text-white shadow-lift ring-2 ring-chantier xl:-my-4 xl:py-12"
          : "bg-white text-nuit shadow-soft ring-1 ring-nuit/5",
      )}
    >
      {featured && plan.badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-chantier px-4 py-1 text-xs font-bold whitespace-nowrap text-nuit shadow-glow">
          {plan.badge}
        </span>
      )}
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <p className={cn("mt-2 text-sm", muted)}>{plan.description}</p>

      <div className="mt-6">
        {pricing.pricePrefix && (
          <p className={cn("text-xs font-medium", muted)}>{pricing.pricePrefix}</p>
        )}
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-extrabold whitespace-nowrap tabular-nums">
            {plan.price}
          </span>
          <span className={cn("text-sm font-medium", muted)}>{unit}</span>
        </p>
        <p className={cn("mt-1 text-xs", muted)}>{sub}</p>
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
}

/** Grille complète des formules : affichée sur /tarifs seulement. */
export function Pricing() {
  const { subscriptions } = pricing;
  return (
    <Section theme="sand" pattern aria-labelledby="formules-une-fois">
      <h2 id="formules-une-fois" className="text-center text-2xl font-bold text-nuit">
        {pricing.oneOffTitle}
      </h2>
      <Stagger className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {pricing.plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            unit="HT"
            sub={plan.maintenance || pricing.maintenance}
          />
        ))}
      </Stagger>

      <h2 className="mt-20 text-center text-2xl font-bold text-nuit">{subscriptions.title}</h2>
      <Stagger className="mx-auto mt-10 grid max-w-5xl items-stretch gap-6 lg:grid-cols-3">
        {subscriptions.plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            unit={subscriptions.priceSuffix}
            sub={subscriptions.terms}
          />
        ))}
      </Stagger>

      <p className="mt-10 text-center text-sm text-ardoise-dark">{pricing.note}</p>
    </Section>
  );
}

/** Aperçu des prix avec un lien vers /tarifs, pour l'accueil et les pages d'offre. */
export function PricingTeaser() {
  const copy = sectionsCopy.pricing;
  const { subscriptions } = pricing;
  return (
    <Section theme="sand" pattern aria-labelledby="tarifs-titre">
      <SectionHeading
        id="tarifs-titre"
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />
      <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
        {pricing.plans.map((plan) => (
          <li
            key={plan.id}
            className="flex items-baseline justify-between gap-4 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-nuit/5"
          >
            <span className="font-bold">{plan.name}</span>
            <span className="text-sm whitespace-nowrap text-ardoise-dark">
              {pricing.pricePrefix}{" "}
              <span className="font-display text-xl font-extrabold text-nuit tabular-nums">
                {plan.price}
              </span>{" "}
              HT
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-sm text-ardoise-dark">
        {copy.subscriptionFrom} {subscriptions.plans[0].price} {subscriptions.priceSuffix}.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/tarifs" size="lg" arrow>
          {copy.cta}
        </Button>
      </div>
    </Section>
  );
}
