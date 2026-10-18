import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getRequestAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { auditLogs, contactInquiries } from "@/lib/db/schema";
import { isSameOrigin } from "@/lib/security";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){if(!isSameOrigin(request))return NextResponse.json({message:"Invalid origin."},{status:403});const admin=await getRequestAdmin(request);if(!admin)return NextResponse.json({message:"Unauthorized."},{status:401});const db=getDb();if(!db)return NextResponse.json({message:"Database unavailable."},{status:503});const parsed=z.object({status:z.enum(["new","reviewed","resolved"])}).safeParse(await request.json());if(!parsed.success)return NextResponse.json({message:"Invalid status."},{status:400});const {id}=await params;await db.update(contactInquiries).set({status:parsed.data.status,updatedAt:new Date()}).where(eq(contactInquiries.id,id));await db.insert(auditLogs).values({adminEmail:admin.email,action:"status_change",entityType:"inquiry",entityId:id,details:{status:parsed.data.status}});return NextResponse.json({ok:true})}
