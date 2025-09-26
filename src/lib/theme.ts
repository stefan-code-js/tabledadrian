export const palette = {
    ink: 'var(--color-ink)',
    inkSoft: 'var(--color-ink-soft)',
    inkMuted: 'var(--color-ink-muted)',
    cream: 'var(--color-cream)',
    creamSoft: 'var(--color-cream-soft)',
    neutral: 'var(--color-neutral)',
    forest: 'var(--color-forest)',
    forestSoft: 'var(--color-forest-soft)',
    bronze: 'var(--color-bronze)',
    bronzeSoft: 'var(--color-bronze-soft)',
    oxblood: 'var(--color-oxblood)',
    oxbloodSoft: 'var(--color-oxblood-soft)',
} as const;

export const accentVariants = ['forest', 'bronze', 'oxblood'] as const;
export type AccentVariant = (typeof accentVariants)[number];

export const buttonVariants = ['primary', 'ghost'] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const heroTones = ['nocturne', 'ivory'] as const;
export type HeroTone = (typeof heroTones)[number];

export const radiusScale = {
    xs: 'var(--radius-xs)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    pill: 'var(--radius-pill)',
} as const;

export const spacingScale = {
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    3: 'var(--space-3)',
    4: 'var(--space-4)',
    5: 'var(--space-5)',
    6: 'var(--space-6)',
    7: 'var(--space-7)',
    gutter: 'var(--gutter)',
} as const;

export const typographyScale = {
    xs: 'var(--step--2)',
    sm: 'var(--step--1)',
    base: 'var(--step-0)',
    lg: 'var(--step-1)',
    xl: 'var(--step-2)',
    '2xl': 'var(--step-3)',
    '3xl': 'var(--step-4)',
} as const;

export const blurScale = {
    soft: 'var(--blur-soft)',
} as const;

export const shadowScale = {
    soft: 'var(--shadow-soft)',
    deep: 'var(--shadow-deep)',
    ambient: 'var(--shadow-ambient)',
} as const;

export const designTokens = {
    palette,
    radius: radiusScale,
    spacing: spacingScale,
    typography: typographyScale,
    blur: blurScale,
    shadow: shadowScale,
    maxWidth: 'var(--max-width)',
} as const;
