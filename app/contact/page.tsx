import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactPage } from "@/content/pages";
import { hasPhone, mailHref, site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = pageMetadata({ ...contactPage.seo, path: "/contact" });

const infos: { Icon: typeof Mail; label: string; value: string; href?: string }[] = [
  ...(hasPhone ? [{ Icon: Phone, label: "Téléphone", value: site.phone, href: telHref }] : []),
  { Icon: Mail, label: "E-mail", value: site.email, href: mailHref },
  { Icon: MapPin, label: "Zone d'intervention", value: site.zone },
];

type Search = Promise<{ service?: string | string[] }>;

type Copy = Pick<typeof contactPage, "hero" | "steps">;

function ContactView({ copy }: { copy: Copy }) {
  return (
    <>
      <PageHero {...copy.hero} breadcrumb="Contact" compact>
        {/* Appel direct, mis en avant sur mobile */}
        {hasPhone && (
          <Button
            href={telHref}
            size="lg"
            icon={<Phone aria-hidden="true" className="size-4" />}
            className="sm:hidden"
          >
            Appeler maintenant
          </Button>
        )}
      </PageHero>
      <section className="bg-sable py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ContactForm />
          <aside aria-labelledby="coordonnees-titre" className="space-y-5">
            <div className="rounded-3xl bg-nuit p-7 text-white sm:p-8">
              <h2 id="coordonnees-titre" className="text-xl font-bold">
                Nos coordonnées
              </h2>
              <ul className="mt-6 space-y-5">
                {infos.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-chantier-light ring-1 ring-white/10">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-ardoise-light">{label}</span>
                      {href ? (
                        <a href={href} className="font-semibold hover:text-chantier-light">
                          {value}
                        </a>
                      ) : (
                        <span className="font-semibold">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              {hasPhone && (
                <Button
                  href={telHref}
                  variant="light"
                  size="lg"
                  className="mt-8 w-full"
                  icon={<Phone aria-hidden="true" className="size-4" />}
                >
                  Appeler {site.phone}
                </Button>
              )}
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-nuit/5">
              <h2 className="font-bold">{contactPage.nextTitle}</h2>
              <ol className="mt-4 space-y-3 text-sm text-ardoise-dark">
                {copy.steps.map((step, i) => (
                  <li key={step}>
                    <b className="text-nuit">{i + 1}.</b> {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

/** `/contact?service=demo` (bouton du menu) : mêmes champs, textes de la démonstration. */
async function ContactContent({ searchParams }: { searchParams: Search }) {
  const demo = (await searchParams).service === "demo";
  return <ContactView copy={demo ? contactPage.demo : contactPage} />;
}

export default function ContactPage({ searchParams }: { searchParams: Search }) {
  // L'adresse n'est connue qu'à la demande. En attendant, un bloc vide de la hauteur de l'écran :
  // sans lui, le contenu arrive au-dessus du pied de page et le visiteur se retrouve en bas de page.
  return (
    <Suspense fallback={<div className="min-h-screen bg-sable" />}>
      <ContactContent searchParams={searchParams} />
    </Suspense>
  );
}
