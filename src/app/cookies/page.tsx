import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { buildLegalMetadata, loadLegalDocument } from "@/lib/legal";

const DOCUMENT_ID = "cookies";

export async function generateMetadata(): Promise<Metadata> {
    return buildLegalMetadata(DOCUMENT_ID);
}

export default async function CookiesPage() {
    const document = await loadLegalDocument(DOCUMENT_ID);
    return <LegalLayout document={document} />;
}
