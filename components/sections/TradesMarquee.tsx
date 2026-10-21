import { trades } from "@/content/trades";
import { sectionsCopy } from "@/content/home";
import { Marquee } from "@/components/ui/Marquee";

export function TradesMarquee() {
  return (
    <section
      aria-label={sectionsCopy.marquee}
      className="border-y border-nuit/8 bg-white py-8 text-nuit sm:py-10"
    >
      <p className="sr-only">
        {sectionsCopy.marquee} : {trades.join(", ")}.
      </p>
      <Marquee items={trades} className="[&_ul]:text-nuit/80" />
    </section>
  );
}
