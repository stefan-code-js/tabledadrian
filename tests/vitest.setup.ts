import { vi } from "vitest";

if (!globalThis.matchMedia) {
    globalThis.matchMedia = () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
        media: "",
        onchange: null,
    }) as any;
}

vi.mock("@cloudflare/next-on-pages", () => ({
    getRequestContext: () => ({ env: {} }),
}));
