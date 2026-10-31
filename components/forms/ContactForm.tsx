"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle, Phone, Send } from "lucide-react";
import { contactSchema, services, type ContactData, type ContactInput } from "@/lib/schemas";
import { trades, otherTrade } from "@/content/trades";
import { contactPage } from "@/content/pages";
import { hasPhone, site, telHref } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "success" | "error";

const fieldBase =
  "mt-2 block w-full rounded-xl bg-white px-4 text-base text-nuit ring-1 ring-nuit/15 transition-shadow placeholder:text-ardoise focus:ring-2 focus:ring-chantier focus:outline-none";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-nuit">
        {label}
        {optional ? (
          <span className="font-normal text-ardoise-dark"> (facultatif)</span>
        ) : (
          <span aria-hidden="true" className="text-chantier-dark">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-erreur`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      service: "",
      trade: "",
      company: "",
    },
  });

  // Pré-remplissage via l'URL (/contact?service=logiciel, ou ?service=site&maquette=Plombier)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    if (service && services.some((s) => s.value === service)) setValue("service", service);
    const maquette = params.get("maquette");
    if (maquette && trades.includes(maquette)) {
      setValue("trade", maquette);
      setValue("message", `Je suis intéressé par la maquette ${maquette}.`);
    }
  }, [setValue]);

  async function onSubmit(data: ContactData) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const id = (name: string) => `${uid}-${name}`;
  const a11y = (name: keyof ContactInput) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-erreur` : undefined,
  });

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-nuit/5 sm:p-12"
      >
        <CircleCheck aria-hidden="true" className="mx-auto size-14 text-emerald-600" />
        <h2 className="mt-5 text-2xl font-bold">{contactPage.success.title}</h2>
        <p className="mx-auto mt-3 max-w-md text-ardoise-dark">{contactPage.success.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {hasPhone && (
            <Button href={telHref} icon={<Phone aria-hidden="true" className="size-4" />}>
              {site.phone}
            </Button>
          )}
          <Button type="button" variant="ghost" onClick={() => setStatus("idle")}>
            Envoyer une autre demande
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-nuit/5 sm:p-10"
      aria-describedby={`${uid}-requis`}
    >
      <p id={`${uid}-requis`} className="mb-6 text-sm text-ardoise-dark">
        Les champs marqués d&apos;un <span className="text-chantier-dark">*</span> sont
        obligatoires.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Nom et prénom" error={errors.name?.message}>
          <input
            {...register("name")}
            {...a11y("name")}
            autoComplete="name"
            className={cn(fieldBase, "h-12")}
          />
        </Field>
        <Field id={id("trade")} label="Votre métier" error={errors.trade?.message}>
          <div className="relative">
            <select
              {...register("trade")}
              {...a11y("trade")}
              className={cn(fieldBase, "h-12 appearance-none pr-10")}
            >
              <option value="">Choisissez…</option>
              {[...trades, otherTrade].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-[calc(50%+4px)] right-4 size-4 -translate-y-1/2 text-ardoise"
            />
          </div>
        </Field>
        <Field id={id("phone")} label="Téléphone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            {...a11y("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className={cn(fieldBase, "h-12")}
          />
        </Field>
        <Field id={id("email")} label="E-mail" error={errors.email?.message}>
          <input
            {...register("email")}
            {...a11y("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="vous@exemple.fr"
            className={cn(fieldBase, "h-12")}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field id={id("service")} label="Service souhaité" error={errors.service?.message}>
            <div className="relative">
              <select
                {...register("service")}
                {...a11y("service")}
                className={cn(fieldBase, "h-12 appearance-none pr-10")}
              >
                <option value="">Choisissez…</option>
                {services.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-[calc(50%+4px)] right-4 size-4 -translate-y-1/2 text-ardoise"
              />
            </div>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id={id("message")} label="Votre message" optional error={errors.message?.message}>
            <textarea
              {...register("message")}
              {...a11y("message")}
              rows={5}
              placeholder="Parlez-nous de votre activité et de ce dont vous avez besoin."
              className={cn(fieldBase, "py-3")}
            />
          </Field>
        </div>
        {/* Champ piège anti-robots, invisible pour les humains */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor={id("company")}>Ne pas remplir</label>
          <input {...register("company")} id={id("company")} tabIndex={-1} autoComplete="off" />
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input
              {...register("consent")}
              {...a11y("consent")}
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 rounded accent-chantier"
            />
            <label htmlFor={id("consent")} className="text-sm leading-relaxed text-ardoise-dark">
              J&apos;accepte que {site.name} utilise ces informations pour me recontacter au sujet
              de ma demande.{" "}
              <Link
                href="/politique-de-confidentialite"
                className="font-medium text-chantier-dark underline underline-offset-2"
              >
                Politique de confidentialité
              </Link>
            </label>
          </div>
          {errors.consent && (
            <p
              id={`${id("consent")}-erreur`}
              className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700"
            >
              <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {hasPhone ? (
            <>
              L&apos;envoi n&apos;a pas fonctionné. Réessayez dans un instant ou appelez-nous au{" "}
              {site.phone}.
            </>
          ) : (
            <>
              L&apos;envoi n&apos;a pas fonctionné. Réessayez dans un instant ou écrivez-nous à{" "}
              {site.email}.
            </>
          )}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-8 w-full sm:w-auto"
        icon={
          isSubmitting ? (
            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )
        }
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
