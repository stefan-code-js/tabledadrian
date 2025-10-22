import { useRef, useEffect } from "react";
import { navGroups, type NavItem, type NavGroup } from "./NavBar";

type CommandPaletteProps = {
    open: boolean;
    query: string;
    onQueryChange: (value: string) => void;
    onClose: () => void;
    onNavigate: (href: string) => void;
};

export default function CommandPalette({ open, query, onQueryChange, onClose, onNavigate }: CommandPaletteProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const results: NavItem[] = navGroups.flatMap((group: NavGroup) =>
        group.links.filter((link: NavItem) => link.label.toLowerCase().includes(query.toLowerCase())),
    );

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    if (!open) return null;

    const handleClose = () => {
        onQueryChange("");
        onClose();
    };

    const handleSelect = (href: string) => {
        onNavigate(href);
        onQueryChange("");
        onClose();
    };

    return (
        <div className="command-palette-overlay" role="dialog" aria-modal="true" tabIndex={-1}>
            <div className="command-palette-modal">
                <input
                    ref={inputRef}
                    className="command-palette-input"
                    placeholder="Type to search navigation..."
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    aria-label="Quick search navigation"
                />
                <ul className="command-palette-results">
                    {results.length === 0 && <li className="command-palette-empty">No matches</li>}
                    {results.map((link) => (
                        <li key={link.href}>
                            <button className="command-palette-result" onClick={() => handleSelect(link.href)}>
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="command-palette-close" onClick={handleClose} aria-label="Close command palette">
                    ×
                </button>
            </div>
        </div>
    );
}
