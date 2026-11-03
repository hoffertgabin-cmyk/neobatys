import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Agent = { id: string; name: string; text: string; sending: string };
type Props = {
  heading: { eyebrow: string; title: string; subtitle: string };
  groups: { title: string; agents: Agent[] }[];
};

/** Agents IA par famille, une ancre par agent (/intelligence-artificielle#relance-de-devis). */
export function AgentGroups({ heading, groups }: Props) {
  return (
    <Section theme="light" aria-labelledby="agents-titre">
      <SectionHeading id="agents-titre" {...heading} />
      <nav
        aria-label="Agents"
        className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2"
      >
        {groups
          .flatMap((g) => g.agents)
          .map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="rounded-full bg-white px-3 py-1.5 text-sm font-medium ring-1 ring-nuit/10 hover:ring-nuit/30"
            >
              {a.name}
            </a>
          ))}
      </nav>
      <div className="mt-16 space-y-16">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-2xl font-bold sm:text-3xl">{g.title}</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {g.agents.map((a) => (
                <article
                  key={a.id}
                  id={a.id}
                  className="flex scroll-mt-28 flex-col rounded-2xl bg-white p-7 shadow-soft ring-1 ring-nuit/5"
                >
                  <h4 className="text-xl font-bold">{a.name}</h4>
                  <p className="mt-3 flex-1 leading-relaxed text-ardoise-dark">{a.text}</p>
                  <p className="mt-5 flex items-start gap-2 text-sm font-medium text-nuit">
                    <ShieldCheck
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-chantier-dark"
                    />
                    {a.sending}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
