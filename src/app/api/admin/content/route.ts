import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { auditLogs, pageContent } from "@/lib/db/schema";
import { isSameOrigin } from "@/lib/security";
const schema=z.object({pageKey:z.string().max(60),sectionKey:z.string().max(60),content:z.record(z.string(),z.string().max(3000))});
export async function POST(request:Request){if(!isSameOrigin(request))return NextResponse.json({message:"Invalid origin."},{status:403});const admin=await getRequestAdmin(request);if(!admin)return NextResponse.json({message:"Unauthorized."},{status:401});const db=getDb();if(!db)return NextResponse.json({message:"Database unavailable."},{status:503});const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({message:"Invalid content."},{status:400});await db.insert(pageContent).values(parsed.data).onConflictDoUpdate({target:[pageContent.pageKey,pageContent.sectionKey],set:{content:parsed.data.content,updatedAt:new Date()}});await db.insert(auditLogs).values({adminEmail:admin.email,action:"update",entityType:"page_content",entityId:`${parsed.data.pageKey}:${parsed.data.sectionKey}`,details:{}});return NextResponse.json({ok:true})}
