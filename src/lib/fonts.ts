import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';

export const serif = Cormorant_Garamond({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    variable: '--font-serif',
});

export const sans = Source_Sans_3({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600'],
    variable: '--font-sans',
});

