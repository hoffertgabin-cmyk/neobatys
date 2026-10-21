import { Check } from "lucide-react";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WordCascade } from "@/components/motion/WordCascade";
import { Float } from "@/components/motion/Float";
import { SiteMockup } from "@/components/mockups/SiteMockup";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";

export function Blobs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-32 size-[520px] animate-blob rounded-full bg-chantier/25 blur-[120px]" />
      <div
        className="absolute top-1/3 -right-40 size-[560px] animate-blob rounded-full bg-acier/70 blur-[120px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute -bottom-48 left-1/3 size-[420px] animate-blob rounded-full bg-chantier-light/15 blur-[110px]"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-nuit pt-32 pb-20 text-white sm:pt-40 lg:pt-44 lg:pb-28">
      <Blobs />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint-dark mask-fade" />
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <div className="animate-fade-up">
            <Badge tone="light">
              <span className="size-1.5 rounded-full bg-chantier" aria-hidden="true" />
              {hero.eyebrow}
            </Badge>
          </div>
          <WordCascade
            lines={hero.titleLines}
            highlight={hero.highlight}
            className="mt-6 font-display text-[2.5rem] leading-[1.05] font-extrabold sm:text-6xl lg:text-[4rem]"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ardoise-light sm:text-xl">
            {hero.subtitle}
          </p>
          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.45s" }}
          >
            <Button href={hero.primaryCta.href} size="lg" arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="outline-light" arrow>
              {hero.secondaryCta.label}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ardoise-light">
            {hero.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-chantier" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Mockups : écran de site + écran de logiciel */}
        <div
          className="relative mx-auto w-full max-w-[560px] animate-fade-up pb-[26%]"
          style={{ animationDelay: "0.25s" }}
        >
          <Float amplitude={8} duration={7} className="w-[84%]">
            <SiteMockup />
          </Float>
          <Float
            amplitude={10}
            duration={8}
            delay={1}
            className="absolute right-0 bottom-0 w-[66%]"
          >
            <DashboardMockup compact />
          </Float>
        </div>
      </div>
    </section>
  );
}
