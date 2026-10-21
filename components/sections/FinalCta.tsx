import { Phone } from "lucide-react";
import { finalCta } from "@/content/home";
import { site, telHref } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-titre"
      className="relative isolate overflow-hidden bg-nuit py-24 text-white sm:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint-dark mask-fade" />
      <div
        aria-hidden="true"
        className="absolute -bottom-1/2 left-1/2 -z-10 size-[900px] -translate-x-1/2 animate-blob rounded-full bg-chantier/50 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1 bg-gradient-chantier"
      />
      <div className="container-site text-center">
        <Reveal>
          <h2
            id="cta-titre"
            className="mx-auto max-w-3xl text-4xl leading-[1.05] font-extrabold sm:text-6xl"
          >
            {finalCta.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-gradient">{finalCta.title.split(" ").slice(-1)}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ardoise-light">
            {finalCta.subtitle}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={finalCta.primaryCta.href} size="lg" arrow>
              {finalCta.primaryCta.label}
            </Button>
            <Button
              href={telHref}
              size="lg"
              variant="outline-light"
              icon={<Phone aria-hidden="true" className="size-4" />}
            >
              {finalCta.secondaryCta.label} {site.phone}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
