import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
        "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
        "./src/lib/**/*.{ts,tsx,js,jsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ink: "var(--color-ink)",
                "ink-soft": "var(--color-ink-soft)",
                "ink-muted": "var(--color-ink-muted)",
                cream: "var(--color-cream)",
                "cream-soft": "var(--color-cream-soft)",
                neutral: "var(--color-neutral)",
                forest: "var(--color-forest)",
                bronze: "var(--color-bronze)",
                oxblood: "var(--color-oxblood)",
                accent: "var(--color-accent)",
            },
            fontFamily: {
                serif: ["var(--font-serif)"],
                sans: ["var(--font-sans)"],
            },
            fontSize: {
                "fluid-xs": "var(--step--2)",
                "fluid-sm": "var(--step--1)",
                "fluid-base": "var(--step-0)",
                "fluid-lg": "var(--step-1)",
                "fluid-xl": "var(--step-2)",
                "fluid-2xl": "var(--step-3)",
                "fluid-3xl": "var(--step-4)",
            },
            spacing: {
                "space-1": "var(--space-1)",
                "space-2": "var(--space-2)",
                "space-3": "var(--space-3)",
                "space-4": "var(--space-4)",
                "space-5": "var(--space-5)",
                "space-6": "var(--space-6)",
                "space-7": "var(--space-7)",
                gutter: "var(--gutter)",
            },
            borderRadius: {
                xs: "var(--radius-xs)",
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                pill: "var(--radius-pill)",
            },
            boxShadow: {
                soft: "var(--shadow-soft)",
                deep: "var(--shadow-deep)",
                ambient: "var(--shadow-ambient)",
            },
            maxWidth: {
                measure: "var(--max-width)",
            },
            backdropBlur: {
                soft: "var(--blur-soft)",
            },
        },
    },
    plugins: [],
};

export default config;
