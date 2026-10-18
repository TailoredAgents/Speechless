import { ContentEditor } from "@/components/admin/content-editor";
import { getPageSection } from "@/lib/admin-data";
import { hasDatabase } from "@/lib/db";
export default async function ContentPage(){const section=await getPageSection("home","editorial");return <><header className="admin-page-header"><div><p className="admin-kicker">Lightweight CMS</p><h1>Content</h1><p>Edit the most important brand copy without touching layout or code.</p></div></header><ContentEditor content={(section?.content||{}) as Record<string,string>} connected={hasDatabase()}/></>}
