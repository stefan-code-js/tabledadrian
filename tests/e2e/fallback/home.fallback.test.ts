import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const BUILD_ROOT = join(process.cwd(), ".next", "server", "app");
const CONTACT_PAGE_SOURCE = join(BUILD_ROOT, "contact", "page.js");
const HOME_BUILD_SOURCE = join(BUILD_ROOT, "page.js");
const HOME_SOURCE_MODULE = join(process.cwd(), "src", "components", "StructuredPage.tsx");

describe("homepage fallback", () => {
    it("defines the luxe hero heading in source", async () => {
        const source = await readFile(HOME_SOURCE_MODULE, "utf8");
        expect(source.includes("An evening written in quiet chapters")).toBe(true);
    });

    it("keeps the primary CTA wired to contact in the build output", async () => {
        const built = await readFile(HOME_BUILD_SOURCE, "utf8");
        expect(built.includes('primary:{label:"Reserve a private table",href:"/contact"}')).toBe(true);
    });

    it("bundles the contact page with the contact heading", async () => {
        const contactSource = await readFile(CONTACT_PAGE_SOURCE, "utf8");
        expect(contactSource.includes("Contact")).toBe(true);
    });
});
