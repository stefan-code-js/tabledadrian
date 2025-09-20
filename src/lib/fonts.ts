import { Cormorant_Garamond, Inter } from "next/font/google";

export const serif = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-serif",
    style: ["normal", "italic"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    fallback: ["Times New Roman", "Georgia", "serif"],
});

export const sans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});
