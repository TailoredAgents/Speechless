import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductEditor } from "@/components/admin/product-editor";
import { hasDatabase } from "@/lib/db";
export default function NewProductPage(){return <><header className="admin-page-header"><div><Link href="/admin/products" className="admin-back"><ArrowLeft size={15}/> Products</Link><h1>New concept</h1><p>Start as a concept. Publishing does not make a product sellable.</p></div></header><ProductEditor databaseConnected={hasDatabase()}/></>}
