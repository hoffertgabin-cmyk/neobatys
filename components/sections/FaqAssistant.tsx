"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { CircleAlert, LoaderCircle, Send, Sparkles } from "lucide-react";
import { QUESTION_MAX } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "answered"; question: string; answer: string }
  | { status: "error"; message: string };

/** Champ « posez votre question » sous la FAQ : une IA répond à partir des contenus du site. */
export function FaqAssistant() {
  const uid = useId();
  const [question, setQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const loading = state.status === "loading";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const asked = question.trim();
    if (asked.length < 5) {
      setState({ status: "error", message: "Posez votre question en quelques mots." });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/faq-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: asked, company }),
      });
      const data = (await res.json().catch(() => null)) as
        { ok: true; answer: string } | { ok: false; error: string } | null;
      if (data?.ok) setState({ status: "answered", question: asked, answer: data.answer });
      else
        setState({
          status: "error",
          message: data?.error ?? "L'assistant n'a pas pu répondre. Réessayez dans un instant.",
        });
    } catch {
      setState({
        status: "error",
        message: "Connexion impossible. Vérifiez votre réseau puis réessayez.",
      });
    }
  }

  return (
    <div className="mt-8 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-nuit/5 sm:p-7">
      <form onSubmit={onSubmit} noValidate>
        <label
          htmlFor={`${uid}-question`}
          className="flex items-center gap-2 font-display text-base font-semibold text-nuit sm:text-lg"
        >
          <Sparkles aria-hidden="true" className="size-5 text-chantier-dark" />
          Votre question n&apos;est pas dans la liste ?
        </label>
        <p id={`${uid}-aide`} className="mt-1 text-sm text-ardoise-dark">
          Posez-la ici : notre assistant IA vous répond tout de suite à partir des informations du
          site. S&apos;il ne sait pas, il vous le dit.
        </p>
        <textarea
          id={`${uid}-question`}
          name="question"
          rows={3}
          maxLength={QUESTION_MAX}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            // Entrée envoie, Maj + Entrée passe à la ligne
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          aria-describedby={`${uid}-aide`}
          placeholder="Ex. : Le logiciel gère-t-il les factures de sous-traitance ?"
          className="mt-4 block w-full resize-y rounded-xl bg-white px-4 py-3 text-base text-nuit ring-1 ring-nuit/15 transition-shadow placeholder:text-ardoise focus:ring-2 focus:ring-chantier focus:outline-none"
        />
        {/* Champ piège anti-robots */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor={`${uid}-company`}>Ne pas remplir</label>
          <input
            id={`${uid}-company`}
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ardoise-dark">
            Ne saisissez pas de données personnelles (nom, téléphone…).
          </p>
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto"
            icon={
              loading ? (
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              ) : (
                <Send aria-hidden="true" className="size-4" />
              )
            }
          >
            {loading ? "Réponse en cours…" : "Poser ma question"}
          </Button>
        </div>
      </form>

      <div aria-live="polite">
        {state.status === "answered" && (
          <div className="mt-6 rounded-xl bg-sable p-4 sm:p-5">
            <p className="text-sm font-semibold text-nuit">« {state.question} »</p>
            <p className="mt-2 leading-relaxed whitespace-pre-line text-ardoise-dark">
              {state.answer}
            </p>
            <p className="mt-4 border-t border-nuit/10 pt-3 text-xs text-ardoise-dark">
              Réponse générée automatiquement, à titre indicatif : elle ne vaut ni devis ni
              engagement. Pour une réponse sûre,{" "}
              <Link
                href="/contact"
                className="font-medium text-chantier-dark underline underline-offset-2"
              >
                écrivez-nous
              </Link>
              .
            </p>
          </div>
        )}
        {state.status === "error" && (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800"
          >
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              {state.message}{" "}
              <Link href="/contact" className="font-medium underline underline-offset-2">
                Page contact
              </Link>
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
