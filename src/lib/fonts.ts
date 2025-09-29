import localFont from "next/font/local";

export const serif = localFont({
    src: [{ path: "../../public/fonts/PlayfairDisplay-Variable.ttf", style: "normal", weight: "400 900" }],
    variable: "--font-display",
    display: "swap",
    fallback: ["Georgia", "Times New Roman", "serif"],
    preload: true,
});

export const sans = localFont({
    src: [{ path: "../../public/fonts/Manrope-Variable.ttf", style: "normal", weight: "300 800" }],
    variable: "--font-sans",
    display: "swap",
    fallback: ["Helvetica Neue", "Arial", "sans-serif"],
    preload: true,
});
