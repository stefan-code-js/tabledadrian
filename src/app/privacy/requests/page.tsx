import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { buildLegalMetadata, loadLegalDocument, getLegalContactDetails } from "@/lib/legal";
import { PrivacyRequestForm } from "@/app/privacy/requests/request-form";

const DOCUMENT_ID = "privacy-requests";

export async function generateMetadata(): Promise<Metadata> {
    return buildLegalMetadata(DOCUMENT_ID);
}

export default async function PrivacyRequestsPage() {
    const document = await loadLegalDocument(DOCUMENT_ID);
    const contact = getLegalContactDetails();
    return (
        <LegalLayout
            document={document}
            actions={
                <a className="btn ghost text-sm" href={`mailto:${contact.email}`}>
                    Contact privacy steward
                </a>
            }
        >
            <PrivacyRequestForm />
        </LegalLayout>
    );
}
