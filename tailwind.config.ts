import type { Config } from "tailwindcss";
import { palette, spacingScale, radiusScale, typographyScale, blurScale, shadowScale, designTokens } from "./src/lib/theme";

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx,js,jsx,mdx}",
        "./src/components/**/*.{ts,tsx,js,jsx,mdx}",
        "./src/lib/**/*.{ts,tsx,js,jsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ink: palette.ink,
                "ink-soft": palette.inkSoft,
                "ink-muted": palette.inkMuted,
                cream: palette.cream,
                "cream-soft": palette.creamSoft,
                neutral: palette.neutral,
                forest: palette.forest,
                bronze: palette.bronze,
                oxblood: palette.oxblood,
                accent: palette.forest,
            },
            fontFamily: {
                serif: ["var(--font-display)"],
                sans: ["var(--font-sans)"],
            },
            fontSize: {
                "fluid-xs": typographyScale.xs,
                "fluid-sm": typographyScale.sm,
                "fluid-base": typographyScale.base,
                "fluid-lg": typographyScale.lg,
                "fluid-xl": typographyScale.xl,
                "fluid-2xl": typographyScale["2xl"],
                "fluid-3xl": typographyScale["3xl"],
            },
            spacing: {
                "space-1": spacingScale[1],
                "space-2": spacingScale[2],
                "space-3": spacingScale[3],
                "space-4": spacingScale[4],
                "space-5": spacingScale[5],
                "space-6": spacingScale[6],
                "space-7": spacingScale[7],
                gutter: spacingScale.gutter,
            },
            borderRadius: {
                xs: radiusScale.xs,
                sm: radiusScale.sm,
                md: radiusScale.md,
                lg: radiusScale.lg,
                pill: radiusScale.pill,
            },
            boxShadow: {
                soft: shadowScale.soft,
                deep: shadowScale.deep,
                ambient: shadowScale.ambient,
            },
            maxWidth: {
                measure: designTokens.maxWidth,
            },
            backdropBlur: {
                soft: blurScale.soft,
            },
        },
    },
    plugins: [],
};

export default config;
