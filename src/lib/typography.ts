export type SplitResult = {
    lines: HTMLElement[];
    words: HTMLElement[];
    cleanup: () => void;
};

function collectTokens(node: HTMLElement): string[] {
    const text = node.textContent ?? "";
    const tokens = text.match(/\S+\s*/g);
    return tokens ?? [];
}

export function splitIntoLines(element: HTMLElement): SplitResult {
    const original = element.innerHTML;
    const tokens = collectTokens(element);
    if (tokens.length === 0) {
        return { lines: [], words: [], cleanup: () => { element.innerHTML = original; } };
    }

    element.innerHTML = "";
    element.style.whiteSpace = "normal";

    const wordSpans: HTMLElement[] = [];
    tokens.forEach((token) => {
        const span = document.createElement("span");
        span.textContent = token;
        span.className = token.trim() ? "kinetic-word" : "kinetic-space";
        element.appendChild(span);
        wordSpans.push(span);
    });

    const lines: HTMLElement[] = [];
    let currentLine: HTMLElement | null = null;
    let currentTop: number | null = null;

    wordSpans.forEach((span) => {
        const top = span.offsetTop;
        const isNewLine = currentTop === null || Math.abs(top - currentTop) > 2;
        if (isNewLine) {
            currentTop = top;
            currentLine = document.createElement("span");
            currentLine.className = "kinetic-line";
            element.insertBefore(currentLine, span);
            lines.push(currentLine);
        }
        currentLine?.appendChild(span);
    });

    return {
        lines,
        words: Array.from(element.querySelectorAll<HTMLElement>(".kinetic-word")),
        cleanup: () => {
            element.innerHTML = original;
        },
    };
}
