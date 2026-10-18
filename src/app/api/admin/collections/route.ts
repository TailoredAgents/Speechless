import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { auditLogs, collectionsTable } from "@/lib/db/schema";
import { isSameOrigin } from "@/lib/security";
export const collectionInput=z.object({name:z.string().trim().min(2).max(100),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),eyebrow:z.string().max(160),description:z.string().max(1200),image:z.string().startsWith("/").max(300),position:z.number().int().min(0),published:z.boolean()});
export async function POST(request:Request){if(!isSameOrigin(request))return NextResponse.json({message:"Invalid origin."},{status:403});const admin=await getRequestAdmin(request);if(!admin)return NextResponse.json({message:"Unauthorized."},{status:401});const db=getDb();if(!db)return NextResponse.json({message:"Database unavailable."},{status:503});const parsed=collectionInput.safeParse(await request.json());if(!parsed.success)return NextResponse.json({message:"Review collection fields."},{status:400});const [created]=await db.insert(collectionsTable).values(parsed.data).returning();await db.insert(auditLogs).values({adminEmail:admin.email,action:"create",entityType:"collection",entityId:created.id,details:{name:created.name}});return NextResponse.json({ok:true,id:created.id})}
