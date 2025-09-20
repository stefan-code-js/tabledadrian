import type { ReactNode } from "react";

type CardPanelProps = {
    children: ReactNode;
    className?: string;
};

export default function CardPanel({ children, className }: CardPanelProps) {
    const classes = ["card-panel", className].filter(Boolean).join(" ");
    return <div className={classes}>{children}</div>;
}
