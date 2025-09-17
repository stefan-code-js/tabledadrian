import { Fraunces, Space_Grotesk } from 'next/font/google';

export const sans = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
});

export const display = Fraunces({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-display',
    axes: ['opsz'],
});
