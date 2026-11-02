type Props = { sections: { title: string; paragraphs: string[]; items: string[] }[] };

/** Corps de texte des pages guides et métiers : un h2 par section, paragraphes, liste. */
export function ProseSections({ sections }: Props) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-2xl font-bold sm:text-3xl">{section.title}</h2>
          <div className="mt-4 space-y-3 text-lg leading-relaxed text-ardoise-dark">
            {section.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {section.items.length > 0 && (
            <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-ardoise-dark marker:text-chantier">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
