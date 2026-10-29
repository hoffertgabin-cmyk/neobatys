import { Clock, Mail, Phone } from "lucide-react";
import { contactPage } from "@/content/pages";
import { mailHref, site, telHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = pageMetadata({ ...contactPage.seo, path: "/contact" });

const infos = [
  { Icon: Phone, label: "Téléphone", value: site.phone, href: telHref },
  { Icon: Mail, label: "E-mail", value: site.email, href: mailHref },
  { Icon: Clock, label: "Horaires", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero {...contactPage.hero} breadcrumb="Contact" compact>
        {/* Appel direct, mis en avant sur mobile */}
        <Button
          href={telHref}
          size="lg"
          icon={<Phone aria-hidden="true" className="size-4" />}
          className="sm:hidden"
        >
          Appeler maintenant
        </Button>
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
              <Button
                href={telHref}
                variant="light"
                size="lg"
                className="mt-8 w-full"
                icon={<Phone aria-hidden="true" className="size-4" />}
              >
                Appeler {site.phone}
              </Button>
            </div>
            <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-nuit/5">
              <h2 className="font-bold">Et ensuite ?</h2>
              <ol className="mt-4 space-y-3 text-sm text-ardoise-dark">
                <li>
                  <b className="text-nuit">1.</b> On vous rappelle sous 24 h ouvrées.
                </li>
                <li>
                  <b className="text-nuit">2.</b> Appel découverte de 30 minutes, gratuit.
                </li>
                <li>
                  <b className="text-nuit">3.</b> Vous recevez une proposition claire, sans
                  engagement.
                </li>
              </ol>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
