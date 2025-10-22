import { Old_Standard_TT, Instrument_Serif, Bodoni_Moda } from "next/font/google";

export const displayFont = Old_Standard_TT({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-display",
    display: "swap",
});

export const bodyFont = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal"],
    variable: "--font-body",
    display: "swap",
});

export const accentFont = Bodoni_Moda({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-accent",
    display: "swap",
});
