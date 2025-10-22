import React from "react";
import type { LegalDocument } from "@/lib/legal";
import { createLegalJsonLd, getLegalContactDetails } from "@/lib/legal";
import { LegalToc } from "@/components/LegalToc";

type LegalLayoutProps = {
    document: LegalDocument;
    children?: React.ReactNode;
    actions?: React.ReactNode;
};

export default function LegalLayout({ document, children, actions }: LegalLayoutProps) {
    const contact = getLegalContactDetails();
    const jsonLd = createLegalJsonLd({ document });
    const pdfPath = `/legal/${document.id}.pdf`;

    return (
        <article className="legal-layout editorial-container py-16 text-ink" data-page-id={document.id}>
            <header className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-4">Regal Compliance Charter</p>
                <h1 className="text-4xl font-serif leading-tight text-accent">{document.title}</h1>
                {document.updatedLabel ? (
                    <p className="mt-4 text-sm text-ink-soft">Last updated {document.updatedLabel}</p>
                ) : null}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                        className="btn ghost text-sm"
                        href={pdfPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download ${document.title} as PDF`}
                    >
                        Download PDF
                    </a>
                    {actions}
                </div>
            </header>

            <section className="legal-content-grid mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="prose prose-invert max-w-none [&>*]:text-ink" dangerouslySetInnerHTML={{ __html: document.html }} />
                <LegalToc markdown={document.markdown} className="sticky top-36 hidden lg:block text-sm leading-relaxed" />
            </section>

            {children ? <section className="mt-16">{children}</section> : null}

            <footer className="mt-16 border-t border-[var(--line-hairline)] pt-8 text-sm text-ink-soft">
                <p>{contact.entity}</p>
                <p>{contact.address}</p>
                <p>
                    Contact:{" "}
                    <a className="underline text-accent focus-visible:outline-accent" href={`mailto:${contact.email}`}>
                        {contact.email}
                    </a>
                </p>
            </footer>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </article>
    );
}
