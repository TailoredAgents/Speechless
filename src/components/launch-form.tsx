"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "preview" | "error";

export function LaunchForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: formData.get("email"), website: formData.get("website") }),
      });
      const result = (await response.json()) as { ok?: boolean; preview?: boolean; message?: string };
      if (result.preview) {
        setState("preview");
        setMessage(result.message || "Preview mode is active; the address was not stored.");
      } else if (response.ok && result.ok) {
        setState("success");
        setMessage("You’re on the launch list. We’ll only write when there is something meaningful to share.");
        form.reset();
      } else {
        setState("error");
        setMessage(result.message || "We couldn’t save that address. Please try again.");
      }
    } catch {
      setState("error");
      setMessage("We couldn’t reach the launch list right now. Please try again later.");
    }
  }

  return (
    <div className={compact ? "launch-form launch-form--compact" : "launch-form"}>
      <form onSubmit={submit}>
        <label htmlFor={compact ? "footer-email" : "launch-email"}>Email address</label>
        <input id={compact ? "footer-email" : "launch-email"} name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        <input className="honey" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" aria-label="Join the launch list" disabled={state === "loading"}>
          {state === "loading" ? <LoaderCircle className="spin" size={19} /> : state === "success" ? <Check size={19} /> : <ArrowRight size={19} />}
        </button>
      </form>
      {message && <p className={`form-message form-message--${state}`} role="status">{message}</p>}
    </div>
  );
}
