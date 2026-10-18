import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getRequestAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { auditLogs, collectionsTable } from "@/lib/db/schema";
import { collectionInput } from "../route";
import { isSameOrigin } from "@/lib/security";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){if(!isSameOrigin(request))return NextResponse.json({message:"Invalid origin."},{status:403});const admin=await getRequestAdmin(request);if(!admin)return NextResponse.json({message:"Unauthorized."},{status:401});const db=getDb();if(!db)return NextResponse.json({message:"Database unavailable."},{status:503});const parsed=collectionInput.safeParse(await request.json());if(!parsed.success)return NextResponse.json({message:"Review collection fields."},{status:400});const {id}=await params;await db.update(collectionsTable).set({...parsed.data,updatedAt:new Date()}).where(eq(collectionsTable.id,id));await db.insert(auditLogs).values({adminEmail:admin.email,action:"update",entityType:"collection",entityId:id,details:{name:parsed.data.name}});return NextResponse.json({ok:true})}
