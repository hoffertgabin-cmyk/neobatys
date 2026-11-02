/** Montants HT, TVA et TTC arrondis au centime, à partir d'un montant HT ou TTC et d'un taux en %. */
export function computeTva(amount: number, rate: number, from: "ht" | "ttc") {
  const ht = from === "ht" ? amount : amount / (1 + rate / 100);
  const round = (n: number) => Math.round(n * 100) / 100;
  const htRounded = round(ht);
  const ttc = from === "ttc" ? round(amount) : round(ht * (1 + rate / 100));
  return { ht: htRounded, tva: round(ttc - htRounded), ttc };
}
