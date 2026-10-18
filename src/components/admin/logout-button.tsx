"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
export function LogoutButton(){const router=useRouter(); return <button onClick={async()=>{await fetch("/api/admin/logout",{method:"POST"});router.push("/admin/login");router.refresh();}}><LogOut size={16}/> Log out</button>}
