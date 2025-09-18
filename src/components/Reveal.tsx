"use client";

import type { ReactNode } from "react";
import { useEditorialMotion } from "@/hooks/useEditorialMotion";

type Props = {
    children: ReactNode;
    delay?: number;
};

export default function Reveal({ children, delay = 0 }: Props) {
    const motion = useEditorialMotion();

    if (!motion?.div) {
        return <div className="reveal-static">{children}</div>;
    }

    const MotionDiv = motion.div;

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </MotionDiv>
    );
}
