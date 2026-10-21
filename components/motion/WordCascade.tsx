import { Fragment } from "react";

type Props = {
  lines: readonly string[];
  /** Portion de texte mise en valeur (dégradé orange) */
  highlight?: string;
  className?: string;
};

type Word = { text: string; highlight: boolean; order: number };

function splitLines(lines: readonly string[], highlight?: string): Word[][] {
  let order = 0;
  return lines.map((line) => {
    const start = highlight ? line.indexOf(highlight) : -1;
    const plain = start >= 0 ? line.slice(0, start) : line;
    const accent = start >= 0 ? line.slice(start) : "";
    return [
      ...plain
        .split(" ")
        .filter(Boolean)
        .map((text) => ({ text, highlight: false, order: order++ })),
      ...accent
        .split(" ")
        .filter(Boolean)
        .map((text) => ({ text, highlight: true, order: order++ })),
    ];
  });
}

/** Titre qui apparaît mot par mot, ligne après ligne (animation CSS, lancée dès l'affichage). */
export function WordCascade({ lines, highlight, className }: Props) {
  const words = splitLines(lines, highlight);
  return (
    <h1 className={className}>
      {words.map((line, l) => (
        <span key={l} className="block">
          {line.map((word, i) => (
            <Fragment key={word.order}>
              <span
                className={
                  word.highlight
                    ? "inline-block animate-word text-gradient"
                    : "inline-block animate-word"
                }
                style={{ animationDelay: `${0.05 + word.order * 0.05}s` }}
              >
                {word.text}
              </span>
              {i < line.length - 1 && " "}
            </Fragment>
          ))}
        </span>
      ))}
    </h1>
  );
}
