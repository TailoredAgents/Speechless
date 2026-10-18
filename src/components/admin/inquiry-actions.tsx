"use client";
import { useRouter } from "next/navigation";
export function InquiryActions({id,status}:{id:string;status:string}){const router=useRouter();return <select aria-label="Inquiry status" value={status} onChange={async event=>{await fetch(`/api/admin/inquiries/${id}`,{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({status:event.target.value})});router.refresh();}}><option value="new">New</option><option value="reviewed">Reviewed</option><option value="resolved">Resolved</option></select>}
