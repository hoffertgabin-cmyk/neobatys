import { faq } from "@/content/faq";
import { sectionsCopy } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAssistant } from "@/components/sections/FaqAssistant";

export function Faq({ items = faq }: { items?: { question: string; answer: string }[] }) {
  return (
    <Section id="faq" theme="light" aria-labelledby="faq-titre">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          id="faq-titre"
          align="left"
          eyebrow={sectionsCopy.faq.eyebrow}
          title={sectionsCopy.faq.title}
        />
        <Reveal delay={0.1}>
          <Accordion items={items} />
          <FaqAssistant />
        </Reveal>
      </div>
    </Section>
  );
}
