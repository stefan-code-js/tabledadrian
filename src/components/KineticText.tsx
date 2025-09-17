'use client';

import { motion, type Variants, type Easing } from 'framer-motion';
import { useMemo, createElement, type ComponentPropsWithoutRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type SupportedTag = 'p' | 'h1' | 'h2' | 'h3' | 'span';

type KineticTextProps<T extends SupportedTag> = {
    as?: T;
    text: string;
    className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const ease: Easing = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const wordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: '120%',
    },
    visible: {
        opacity: 1,
        y: '0%',
        transition: {
            duration: 0.7,
            ease,
        },
    },
};

export default function KineticText<T extends SupportedTag = 'p'>({
                                                                    as,
                                                                    text,
                                                                    className,
                                                                    ...rest
                                                                }: KineticTextProps<T>) {
    const Tag = (as ?? 'p') as SupportedTag;
    const prefersReducedMotion = usePrefersReducedMotion();

    const words = useMemo(() => {
        return text
            .split(/\s+/)
            .filter(Boolean)
            .map((word, index) => ({ word, key: `${word}-${index}` }));
    }, [text]);

    const initialState = prefersReducedMotion ? 'visible' : 'hidden';
    const viewport = prefersReducedMotion ? undefined : { once: true, amount: 0.7 };

    const element = (
        <>
            <span className="visually-hidden">{text}</span>
            <motion.span
                aria-hidden
                className="kinetic-text__words"
                initial={initialState}
                whileInView="visible"
                viewport={viewport}
                variants={containerVariants}
            >
                {words.map(({ word, key }) => (
                    <motion.span key={key} className="kinetic-text__word" variants={wordVariants}>
                        {word}
                    </motion.span>
                ))}
            </motion.span>
        </>
    );

    return createElement(
        Tag,
        {
            className: ['kinetic-text', className].filter(Boolean).join(' '),
            ...rest,
        },
        element,
    );
}
