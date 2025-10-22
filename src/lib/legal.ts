import "server-only";

import fs from "fs/promises";
import path from "path";
import MarkdownIt from "markdown-it";
import { v4 as uuidv4 } from "uuid";
import type { Metadata } from "next";
import { buildPageMetadata, absoluteUrl } from "@/lib/metadata";
import { site } from "@/lib/site";
import { LEGAL_DOCUMENTS, type LegalDocumentId } from "@/lib/legal-docs";

export type LegalHeading = {
    id: string;
    text: string;
    level: number;
};

export type LegalDocument = {
    id: LegalDocumentId;
    title: string;
    markdown: string;
    html: string;
    description: string;
    updatedLabel: string | null;
    updatedISO: string | null;
    path: string;
    canonicalUrl: string;
    headings: LegalHeading[];
};

type TokenMap = Record<string, string>;

const tokenMap: TokenMap = {
    "[LEGAL_ENTITY_NAME]": process.env.LEGAL_ENTITY_NAME ?? "Table d'Adrian LLC",
    "[LEGAL_ADDRESS]": process.env.LEGAL_ADDRESS ?? "New York, USA",
    "[DPO_EMAIL]": process.env.DPO_EMAIL ?? site.email,
};

function applyTokens(markdown: string): string {
    return Object.entries(tokenMap).reduce((buffer, [token, value]) => buffer.replaceAll(token, value), markdown);
}

const rootDir = path.join(process.cwd(), "content", "legal");

type HeadingEnvironment = {
    headings?: LegalHeading[];
};

const markdownItFactory = () => {
    const md = new MarkdownIt({
        html: false,
        linkify: true,
        typographer: true,
    });
    type RenderTokenArgs = Parameters<typeof md.renderer.renderToken>;
    type RendererContext = typeof md.renderer;
    type RenderRule = (
        tokens: RenderTokenArgs[0],
        idx: RenderTokenArgs[1],
        options: RenderTokenArgs[2],
        env: HeadingEnvironment & Record<string, unknown>,
        self: RendererContext,
    ) => string;

    const defaultRender: RenderRule =
        md.renderer.rules.heading_open ??
        ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    const usedIds = new Set<string>();
    function slugify(text: string): string {
        const base = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        let candidate = base || uuidv4();
        let index = 1;
        while (usedIds.has(candidate)) {
            candidate = `${base}-${index++}`;
        }
        usedIds.add(candidate);
        return candidate;
    }

    const headingRule: RenderRule = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const next = tokens[idx + 1];
        const text = next && next.type === "inline" ? next.content : "";
        const level = Number.parseInt(token.tag.slice(1), 10);
        const id = slugify(text);
        token.attrSet("id", id);
        const headingsEnv = env as HeadingEnvironment;
        if (Array.isArray(headingsEnv.headings)) {
            headingsEnv.headings.push({ id, text, level });
        } else {
            headingsEnv.headings = [{ id, text, level }];
        }
        return defaultRender(tokens, idx, options, env, self);
    };

    md.renderer.rules.heading_open = headingRule;

    return md;
};

function extractUpdated(markdown: string): { label: string | null; iso: string | null } {
    const match = markdown.match(/Last updated:\s*(.+)/i);
    if (!match) return { label: null, iso: null };
    const label = match[1].trim();
    const iso = new Date(label).toISOString();
    return { label, iso };
}

function extractSummary(markdown: string): string {
    const lines = markdown.split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#") || trimmed.toLowerCase().startsWith("last updated")) {
            continue;
        }
        return trimmed;
    }
    return `${site.name} legal resource`;
}

export async function loadLegalDocument(id: LegalDocumentId): Promise<LegalDocument> {
    const entry = LEGAL_DOCUMENTS[id];
    const filePath = path.join(rootDir, entry.file);
    const fileBuffer = await fs.readFile(filePath, "utf-8");
    const markdown = applyTokens(fileBuffer);
    const md = markdownItFactory();
    const env: HeadingEnvironment = {};
    const html = md.render(markdown, env);
    const headings = env.headings ?? [];
    const updated = extractUpdated(markdown);
    const canonicalUrl = absoluteUrl(entry.path);
    return {
        id,
        title: entry.title,
        markdown,
        html,
        description: entry.description,
        updatedLabel: updated.label,
        updatedISO: updated.iso,
        path: entry.path,
        canonicalUrl,
        headings,
    };
}

export async function buildLegalMetadata(id: LegalDocumentId): Promise<Metadata> {
    const entry = LEGAL_DOCUMENTS[id];
    const filePath = path.join(rootDir, entry.file);
    const fileBuffer = await fs.readFile(filePath, "utf-8");
    const markdown = applyTokens(fileBuffer);
    const summary = extractSummary(markdown);
    return buildPageMetadata({
        title: `${entry.title} | ${site.name}`,
        description: summary || entry.description,
        path: entry.path,
        keywords: [...site.keywords, entry.title],
        indexable: true,
    });
}

type LegalJsonLdParams = {
    document: Pick<LegalDocument, "title" | "description" | "canonicalUrl" | "updatedISO">;
};

export function createLegalJsonLd({ document }: LegalJsonLdParams): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: document.title,
        description: document.description,
        url: document.canonicalUrl,
        dateModified: document.updatedISO ?? undefined,
        publisher: {
            "@type": "Organization",
            name: tokenMap["[LEGAL_ENTITY_NAME]"],
            email: tokenMap["[DPO_EMAIL]"],
            url: site.url,
        },
    };
}

export function getLegalContactDetails(): { entity: string; address: string; email: string } {
    return {
        entity: tokenMap["[LEGAL_ENTITY_NAME]"],
        address: tokenMap["[LEGAL_ADDRESS]"],
        email: tokenMap["[DPO_EMAIL]"],
    };
}
