import { CollectionManager } from "@/components/admin/collection-manager";
import { getAdminCollections } from "@/lib/admin-data";
import { hasDatabase } from "@/lib/db";
export default async function CollectionsPage(){const collections=await getAdminCollections();return <><header className="admin-page-header"><div><p className="admin-kicker">Merchandising</p><h1>Collections</h1><p>Shape the storefront&apos;s main product worlds and their presentation order.</p></div></header><CollectionManager collections={collections} connected={hasDatabase()}/></>}
