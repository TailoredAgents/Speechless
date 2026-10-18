import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { getAdminSession } from "@/lib/auth";
export const dynamic="force-dynamic";
export default async function ProtectedAdminLayout({children}:{children:React.ReactNode}){const session=await getAdminSession();if(!session)redirect("/admin/login");return <div className="admin-app"><AdminNav email={session.email}/><main className="admin-main">{children}</main></div>}
