/** Liste des sources officielles en bas des guides, liens ouverts dans un nouvel onglet. */
export function SourcesList({ sources }: { sources: { label: string; href: string }[] }) {
  if (sources.length === 0) return null;
  return (
    <div className="mt-14 border-t border-nuit/10 pt-8">
      <h2 className="text-lg font-bold">Sources officielles</h2>
      <ul className="mt-4 space-y-2 text-sm text-ardoise-dark">
        {sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-nuit"
            >
              {s.label}
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
