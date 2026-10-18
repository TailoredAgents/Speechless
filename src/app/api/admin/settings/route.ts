import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { auditLogs, siteSettings } from "@/lib/db/schema";
import { isSameOrigin } from "@/lib/security";
const schema=z.object({values:z.object({brandName:z.string().min(2).max(100),contactEmail:z.string().email().max(254),instagram:z.union([z.literal(""),z.string().url()]),tiktok:z.union([z.literal(""),z.string().url()]),storefrontMode:z.enum(["precommerce","catalog"]),indexing:z.literal("disabled")})});
export async function POST(request:Request){if(!isSameOrigin(request))return NextResponse.json({message:"Invalid origin."},{status:403});const admin=await getRequestAdmin(request);if(!admin)return NextResponse.json({message:"Unauthorized."},{status:401});const db=getDb();if(!db)return NextResponse.json({message:"Database unavailable."},{status:503});const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({message:"Review settings."},{status:400});await db.transaction(async tx=>{for(const [key,value] of Object.entries(parsed.data.values))await tx.insert(siteSettings).values({key,value}).onConflictDoUpdate({target:siteSettings.key,set:{value,updatedAt:new Date()}});await tx.insert(auditLogs).values({adminEmail:admin.email,action:"update",entityType:"settings",details:{keys:Object.keys(parsed.data.values)}})});return NextResponse.json({ok:true})}
