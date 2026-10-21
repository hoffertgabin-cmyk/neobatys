import { ai } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Cas d'usage de l'IA, en liste comme un sommaire. */
export function AiServices() {
  return (
    <Section id="ia" theme="light" aria-labelledby="ia-titre">
      <Reveal className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <p className="mb-5 inline-flex items-center rounded-full bg-nuit/5 px-3 py-1 text-xs font-medium text-ardoise-dark">
            {ai.eyebrow}
          </p>
          <h2
            id="ia-titre"
            className="text-[2rem] leading-[1.06] tracking-[-0.04em] sm:text-[2.6rem] lg:text-[3.25rem]"
          >
            {ai.title}
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-ardoise-dark">{ai.subtitle}</p>
      </Reveal>

      <Stagger as="ul" className="mt-14 divide-y divide-nuit/8 border-y border-nuit/8">
        {ai.useCases.map((useCase) => (
          <StaggerItem
            as="li"
            key={useCase.title}
            className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center sm:gap-8"
          >
            <h3 className="flex items-center gap-4 text-base font-semibold tracking-[-0.02em] sm:text-lg">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sable ring-1 ring-nuit/5">
                <Icon name={useCase.icon} className="size-4.5" />
              </span>
              {useCase.title}
            </h3>
            <p className="pl-14 leading-relaxed text-ardoise-dark sm:pl-0">{useCase.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
