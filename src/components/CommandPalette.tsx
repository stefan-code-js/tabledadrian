import { useState, useRef, useEffect } from "react";
import { navGroups, NavItem, NavGroup } from "./NavBar";

export default function CommandPalette({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: (href: string) => void }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const results: NavItem[] = navGroups.flatMap((group: NavGroup) =>
        group.links.filter((link: NavItem) =>
            link.label.toLowerCase().includes(query.toLowerCase())
        )
    );
    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);
    useEffect(() => {
        if (!open) setQuery("");
    }, [open]);
    if (!open) return null;
    return (
        <div className="command-palette-overlay" role="dialog" aria-modal="true" tabIndex={-1}>
            <div className="command-palette-modal">
                <input
                    ref={inputRef}
                    className="command-palette-input"
                    placeholder="Type to search navigation..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    aria-label="Quick search navigation"
                />
                <ul className="command-palette-results">
                    {results.length === 0 && <li className="command-palette-empty">No matches</li>}
                    {results.map(link => (
                        <li key={link.href}>
                            <button className="command-palette-result" onClick={() => { onNavigate(link.href); onClose(); }}>{link.label}</button>
                        </li>
                    ))}
                </ul>
                <button className="command-palette-close" onClick={onClose} aria-label="Close command palette">×</button>
            </div>
        </div>
    );
}
