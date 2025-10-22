import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { buildLegalMetadata, loadLegalDocument } from "@/lib/legal";

const DOCUMENT_ID = "community-charter";

export async function generateMetadata(): Promise<Metadata> {
    return buildLegalMetadata(DOCUMENT_ID);
}

export default async function CommunityCharterPage() {
    const document = await loadLegalDocument(DOCUMENT_ID);
    return <LegalLayout document={document} />;
}
