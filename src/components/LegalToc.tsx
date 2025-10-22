"use client";

import React from "react";
import ReactToc from "react-toc";

type LegalTocProps = {
    markdown: string;
    className?: string;
};

export function LegalToc({ markdown, className }: LegalTocProps) {
    if (!markdown.trim()) {
        return null;
    }
    return (
        <aside className={className} aria-label="On this page">
            <h2 className="text-sm font-semibold tracking-wide uppercase mb-3 text-ink-soft">On this page</h2>
            <ReactToc markdownText={markdown} />
        </aside>
    );
}
