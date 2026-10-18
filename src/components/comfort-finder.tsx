"use client";

import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/catalog";
import { recommendProducts } from "@/lib/recommend";

type Answers = { forWhom: string; collection: string; features: string[]; types: string[] };
const initial: Answers = { forWhom: "", collection: "", features: [], types: [] };

const questions = [
  { key: "forWhom", number: "01", title: "Who are you exploring for?", copy: "We won’t ask for diagnoses or personal medical details.", options: [["Myself", "For my own preferences"], ["Someone else", "For someone I know"], ["Just browsing", "I’m exploring the idea"]] },
  { key: "collection", number: "02", title: "Which perspective feels most relevant?", copy: "Choose the direction you want to explore first.", options: [["for-me", "Messages chosen by the wearer"], ["family-caregivers", "Support without speaking over someone"], ["community-allies", "A broader community statement"], ["both", "Show every perspective"]] },
] as const;

const featureOptions = ["Bold front graphic", "Direct wording", "Subtle wording", "Front-and-back artwork"];
const typeOptions = ["T-shirt"];

export function ComfortFinder({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);

  const results = useMemo(() => recommendProducts(products, answers.collection, answers.types), [answers, products]);

  function toggleList(key: "features" | "types", value: string) {
    setAnswers((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  }

  function complete() {
    setStep(4);
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event: "comfort_finder_complete", path: "/comfort-finder" }),
    });
  }

  const canContinue = step === 0 ? Boolean(answers.forWhom) : step === 1 ? Boolean(answers.collection) : true;

  return (
    <div className="finder-shell">
      {step < 4 && (
        <div className="finder-progress" aria-label={`Step ${step + 1} of 4`}>
          {[0,1,2,3].map((item) => <i key={item} className={item <= step ? "is-active" : ""} />)}
          <span>0{step + 1} / 04</span>
        </div>
      )}

      {step < 2 && (
        <fieldset className="finder-question">
          <legend><span>{questions[step].number}</span>{questions[step].title}</legend>
          <p>{questions[step].copy}</p>
          <div className="finder-options">
            {questions[step].options.map(([value, subtitle]) => {
              const key = questions[step].key;
              const checked = answers[key] === value;
              return <label key={value} className={checked ? "is-selected" : ""}><input type="radio" name={key} checked={checked} onChange={() => setAnswers({ ...answers, [key]: value })} /><i>{checked && <Check size={16} />}</i><strong>{value === "for-me" ? "For me" : value === "family-caregivers" ? "For someone I love" : value === "community-allies" ? "For the community" : value === "both" ? "Show everything" : value}</strong><small>{subtitle}</small></label>;
            })}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="finder-question">
          <legend><span>03</span>What kind of design would you wear?</legend>
          <p>Select as many as you like. These choices help frame the four concepts without making assumptions about identity.</p>
          <div className="finder-options finder-options--checks">
            {featureOptions.map((value) => { const checked = answers.features.includes(value); return <label key={value} className={checked ? "is-selected" : ""}><input type="checkbox" checked={checked} onChange={() => toggleList("features", value)} /><i>{checked && <Check size={16} />}</i><strong>{value}</strong></label>; })}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="finder-question">
          <legend><span>04</span>What would you like to review?</legend>
          <p>The first focused collection contains adult T-shirt concepts only.</p>
          <div className="finder-options finder-options--checks">
            {typeOptions.map((value) => { const checked = answers.types.includes(value); return <label key={value} className={checked ? "is-selected" : ""}><input type="checkbox" checked={checked} onChange={() => toggleList("types", value)} /><i>{checked && <Check size={16} />}</i><strong>{value}</strong></label>; })}
          </div>
        </fieldset>
      )}

      {step < 4 && (
        <div className="finder-actions">
          <button className="button button--ghost" disabled={step === 0} onClick={() => setStep((current) => current - 1)}><ArrowLeft size={16} /> Back</button>
          <button className="button button--dark" disabled={!canContinue} onClick={() => step === 3 ? complete() : setStep((current) => current + 1)}>{step === 3 ? "See my edit" : "Continue"} <ArrowRight size={16} /></button>
        </div>
      )}

      {step === 4 && (
        <div className="finder-results">
          <div className="finder-results__heading">
            <Sparkles size={24} strokeWidth={1.4} />
            <p className="eyebrow">Your concept edit</p>
            <h2>{results.length ? "A thoughtful place to begin." : "Nothing exact—yet."}</h2>
            <p>{results.length ? `Based on your collection and product-type choices, these ${results.length} concepts are the closest starting points.` : "The current concept collection does not include a match for those choices. We’re listening as the range develops."}</p>
          </div>
          {answers.features.length > 0 && <div className="finder-transparency"><strong>About your design preferences</strong><p>You selected {answers.features.join(", ").toLowerCase()}. The current recommendation is based on the perspective you chose; these design preferences are useful founder feedback until the catalog is large enough for accurate ranking.</p></div>}
          {results.length > 0 && <div className="product-grid product-grid--finder">{results.map((product) => <ProductCard product={product} key={product.id} />)}</div>}
          <button className="button button--outline finder-reset" onClick={() => { setAnswers(initial); setStep(0); }}><RotateCcw size={16} /> Start again</button>
        </div>
      )}
    </div>
  );
}
