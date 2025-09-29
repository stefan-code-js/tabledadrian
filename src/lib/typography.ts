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

    const fragments: HTMLElement[] = [];
    tokens.forEach((token) => {
        const match = token.match(/^(\S+)(\s*)$/);
        const wordText = match ? match[1] : token;
        const trailing = match ? match[2] : "";

        if (wordText) {
            const word = document.createElement("span");
            word.textContent = wordText;
            word.className = "kinetic-word";
            element.appendChild(word);
            fragments.push(word);
        }

        if (trailing) {
            const space = document.createElement("span");
            space.textContent = trailing.replace(/\s/g, " ");
            space.className = "kinetic-space";
            element.appendChild(space);
            fragments.push(space);
        }
    });

    const lines: HTMLElement[] = [];
    let currentLine: HTMLElement | null = null;
    let currentTop: number | null = null;

    fragments.forEach((span) => {
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
