import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { Wordmark } from "@/components/wordmark";
import { getAdminSession } from "@/lib/auth";
export const dynamic = "force-dynamic";
export default async function AdminLoginPage(){if(await getAdminSession()) redirect("/admin"); return <main className="admin-login-page"><div className="admin-login-brand"><Wordmark inverted/><p>Commerce, content, and launch operations—designed to grow with the brand.</p><span>Private administration</span></div><div className="admin-login-panel"><div><p className="admin-kicker">Welcome back</p><h1>Manage what<br/><em>comes next.</em></h1><p>Sign in with the bootstrap credentials configured securely for this deployment.</p><AdminLoginForm/><small>Credentials are never included in the repository. Five failed attempts trigger a temporary rate limit.</small></div></div></main>}
