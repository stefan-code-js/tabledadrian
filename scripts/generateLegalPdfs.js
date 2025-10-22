#!/usr/bin/env node
const fs = require("node:fs/promises");
const path = require("node:path");
const MarkdownIt = require("markdown-it");
const { PDFDocument, StandardFonts } = require("pdf-lib");

const tokenMap = {
    "[LEGAL_ENTITY_NAME]": process.env.LEGAL_ENTITY_NAME || "Table d'Adrian LLC",
    "[LEGAL_ADDRESS]": process.env.LEGAL_ADDRESS || "New York, USA",
    "[DPO_EMAIL]": process.env.DPO_EMAIL || "dpo@tabledadrian.com",
};

const DOCUMENTS = {
    terms: { file: "terms.md", title: "Terms & Conditions" },
    privacy: { file: "privacy.md", title: "Privacy Policy" },
    "privacy-requests": { file: "privacy-requests.md", title: "Data Request Center" },
    cookies: { file: "cookies.md", title: "Cookie Policy" },
    "crypto-tc": { file: "crypto-tc.md", title: "Crypto Terms" },
    refunds: { file: "refunds.md", title: "Refunds & Cancellations" },
    community: { file: "community.md", title: "Community Guidelines" },
    accessibility: { file: "accessibility.md", title: "Accessibility Statement" },
    dpa: { file: "dpa.md", title: "Data Processing Addendum" },
    imprint: { file: "imprint.md", title: "Imprint" },
};

const root = process.cwd();
const markdownRoot = path.join(root, "content", "legal");
const outputRoot = path.join(root, "public", "legal");

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

function applyTokens(markdown) {
    return Object.entries(tokenMap).reduce((buffer, [token, value]) => buffer.replaceAll(token, value), markdown);
}

function markdownToPlain(markdown) {
    const html = md.render(markdown);
    return html
        .replace(/<[^>]+>/g, "\n")
        .replace(/\n{2,}/g, "\n\n")
        .replace(/&nbsp;/g, " ")
        .trim();
}

function wrapText(text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let current = "";
    words.forEach((word) => {
        const next = current ? `${current} ${word}` : word;
        if (next.length > maxWidth) {
            if (current) lines.push(current);
            current = word;
        } else {
            current = next;
        }
    });
    if (current) lines.push(current);
    return lines;
}

async function writePdf(id, title, markdown) {
    const pdf = await PDFDocument.create();
    let page = pdf.addPage([612, 792]); // Letter portrait
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const titleFont = await pdf.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 11;
    const lineHeight = 14;
    let y = 760;

    page.drawText(title, { x: 48, y, size: 18, font: titleFont });
    y -= 28;

    const body = markdownToPlain(markdown);
    const paragraphs = body.split(/\n{2,}/);
    paragraphs.forEach((paragraph) => {
        const lines = wrapText(paragraph, 90);
        lines.forEach((line) => {
            if (y < 72) {
                page = pdf.addPage([612, 792]);
                y = 760;
                page.drawText(title, { x: 48, y, size: 16, font: titleFont });
                y -= 24;
            }
            page.drawText(line, { x: 48, y, size: fontSize, font });
            y -= lineHeight;
        });
        y -= lineHeight;
    });

    const filePath = path.join(outputRoot, `${id}.pdf`);
    const bytes = await pdf.save();
    await fs.writeFile(filePath, bytes);
    console.log(`Generated ${filePath}`);
}

(async function generate() {
    await fs.mkdir(outputRoot, { recursive: true });
    for (const [id, entry] of Object.entries(DOCUMENTS)) {
        const filePath = path.join(markdownRoot, entry.file);
        const raw = await fs.readFile(filePath, "utf-8");
        const markdown = applyTokens(raw);
        await writePdf(id, entry.title, markdown);
    }
})().catch((error) => {
    console.error("Failed to generate legal PDFs", error);
    process.exitCode = 1;
});
