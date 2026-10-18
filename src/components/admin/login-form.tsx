"use client";

import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    const data = (await response.json()) as { ok?: boolean; message?: string };
    if (response.ok && data.ok) { router.push("/admin"); router.refresh(); return; }
    setError(data.message || "Unable to sign in."); setLoading(false);
  }
  return <form className="admin-login-form" onSubmit={submit}><div className="admin-login-form__icon"><LockKeyhole size={22}/></div><label>Email address<input type="email" name="email" required autoComplete="username" /></label><label>Password<input type="password" name="password" minLength={8} required autoComplete="current-password" /></label><button className="admin-button admin-button--dark" type="submit" disabled={loading}>{loading ? <LoaderCircle className="spin" size={17}/> : <>Sign in <ArrowRight size={17}/></>}</button>{error && <p role="alert">{error}</p>}</form>;
}
