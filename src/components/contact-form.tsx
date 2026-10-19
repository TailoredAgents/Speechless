"use client";

import { Check, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { brand } from "@/config/brand";

type State = "idle" | "loading" | "success" | "preview" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(formData) });
      const data = (await response.json()) as { ok?: boolean; preview?: boolean; message?: string };
      if (data.preview) { setState("preview"); setMessage(data.message || "Messages are temporarily unavailable. Please try again later."); }
      else if (response.ok && data.ok) { setState("success"); setMessage("Your message was saved. Thank you for reaching out."); form.reset(); }
      else { setState("error"); setMessage(data.message || "We couldn’t save your message. Please review the form and try again."); }
    } catch { setState("error"); setMessage("We couldn’t reach the contact service. Please try again later."); }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>First name<input name="firstName" required autoComplete="given-name" /></label>
        <label>Last name<input name="lastName" required autoComplete="family-name" /></label>
      </div>
      <label>Email address<input name="email" type="email" required autoComplete="email" /></label>
      <label>What can we help with?<select name="topic" defaultValue="general"><option value="general">General question</option><option value="products">Products</option><option value="accessibility">Accessibility feedback</option><option value="wholesale">Retail or partnership</option><option value="press">Press</option></select></label>
      <label>Your message<textarea name="message" required minLength={10} rows={6} /></label>
      <label className="honey" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="check-field"><input type="checkbox" name="consent" required /><i /><span>I understand this message will be stored so the {brand.name} team can respond.</span></label>
      <button className="button button--dark" type="submit" disabled={state === "loading"}>{state === "loading" ? <LoaderCircle className="spin" size={17} /> : state === "success" ? <Check size={17} /> : <Send size={17} />} Send message</button>
      {message && <p className={`form-message form-message--${state}`} role="status">{message}</p>}
    </form>
  );
}
