import { Cormorant_Garamond, Inter } from "next/font/google";

export const serif = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-serif",
    display: "swap",
});

export const sans = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "600"],
    variable: "--font-sans",
    display: "swap",
});
