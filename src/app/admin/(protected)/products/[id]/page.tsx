import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProductEditor } from "@/components/admin/product-editor";
import { getAdminProducts } from "@/lib/admin-data";
import { hasDatabase } from "@/lib/db";
export default async function EditProductPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const product=(await getAdminProducts()).find(item=>item.id===id);if(!product)notFound();return <><header className="admin-page-header"><div><Link href="/admin/products" className="admin-back"><ArrowLeft size={15}/> Products</Link><h1>{product.name}</h1><p>Edit catalog information, approval state, and storefront visibility.</p></div><Link href={`/products/${product.slug}`} target="_blank" className="admin-button">View storefront <ExternalLink size={15}/></Link></header><ProductEditor product={product} databaseConnected={hasDatabase()}/></>}
