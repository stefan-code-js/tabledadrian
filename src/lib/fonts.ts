export type FontDefinition = {
    className: string;
    variable: string;
};

const createFallbackFont = (className: string, variable: string): FontDefinition => ({
    className,
    variable,
});

export const displayFont = createFallbackFont("font-display", "font-display-variable");
export const bodyFont = createFallbackFont("font-body", "font-body-variable");
export const accentFont = createFallbackFont("font-accent", "font-accent-variable");
