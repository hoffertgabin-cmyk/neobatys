"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useSpring } from "motion/react";
import { process } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const stepColors = ["bg-blue-600", "bg-violet-600", "bg-emerald-600", "bg-chantier-dark"];

/** 4 étapes reliées par une ligne qui se dessine au fil du défilement. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const scale = reduce ? 1 : progress;

  return (
    <Section id="processus" theme="light" aria-labelledby="processus-titre">
      <SectionHeading
        id="processus-titre"
        eyebrow={process.eyebrow}
        title={process.title}
        subtitle={process.subtitle}
      />

      <div ref={ref} className="relative mt-16">
        {/* Rail + progression : vertical sur mobile, horizontal à partir de md */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[27px] w-0.5 bg-nuit/8 md:hidden"
        >
          <m.div
            style={{ scaleY: scale }}
            className="h-full w-full origin-top bg-gradient-chantier"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute top-[27px] right-[12.5%] left-[12.5%] hidden h-0.5 bg-nuit/8 md:block"
        >
          <m.div
            style={{ scaleX: scale }}
            className="h-full w-full origin-left bg-gradient-chantier"
          />
        </div>

        <Stagger as="ol" className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {process.steps.map((step, i) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="flex gap-5 md:flex-col md:items-center md:text-center"
            >
              <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-nuit shadow-soft ring-1 ring-nuit/8">
                <Icon name={step.icon} className="size-6" />
                <span
                  className={cn(
                    "absolute -top-2 -right-2 grid size-6 place-items-center rounded-full text-xs font-semibold text-white ring-4 ring-white",
                    stepColors[i % stepColors.length],
                  )}
                >
                  {i + 1}
                </span>
              </span>
              <div>
                <p className="inline-flex rounded-full bg-nuit/5 px-2.5 py-0.5 text-xs font-medium text-ardoise-dark">
                  {step.duration}
                </p>
                <h3 className="mt-3 text-xl tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ardoise">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
