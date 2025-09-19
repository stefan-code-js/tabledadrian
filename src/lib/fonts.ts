import localFont from "next/font/local";

export const serif = localFont({
    variable: "--font-serif",
    src: [
        {
            path: "../../node_modules/next/dist/next-devtools/server/font/geist-latin-ext.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
            weight: "500",
            style: "normal",
        },
    ],
    display: "swap",
    adjustFontFallback: "Times New Roman",
    fallback: ["Times New Roman", "Georgia", "serif"],
});

export const sans = localFont({
    variable: "--font-sans",
    src: [
        {
            path: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
            weight: "500",
            style: "normal",
        },
    ],
    display: "swap",
    adjustFontFallback: "Arial",
    fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
