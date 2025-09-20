import type { MotionProps, Transition, Variants, ViewportOptions } from "framer-motion";

type LenisConstructor = typeof import("@studio-freight/lenis").default;

const isBrowser = typeof window !== "undefined";
const reduceMotionQuery = "(prefers-reduced-motion: reduce)";

export const reducedMotion: boolean = isBrowser
    ? window.matchMedia(reduceMotionQuery).matches
    : false;

let gsapPromise: Promise<typeof import("gsap").gsap> | null = null;
let lenisPromise: Promise<LenisConstructor> | null = null;

export async function loadGsap(): Promise<typeof import("gsap").gsap | null> {
    if (!isBrowser) {
        return null;
    }
    if (!gsapPromise) {
        gsapPromise = import("gsap").then(async (mod) => {
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            mod.gsap.registerPlugin(ScrollTrigger);
            return mod.gsap;
        });
    }
    return gsapPromise;
}

export async function loadLenis(): Promise<LenisConstructor | null> {
    if (!isBrowser) {
        return null;
    }
    if (!lenisPromise) {
        lenisPromise = import("@studio-freight/lenis").then((module) => module.default as LenisConstructor);
    }
    return lenisPromise;
}

type FadeOptions = {
    delay?: number;
    distance?: number;
    duration?: number;
};

type FadeReturn = Pick<MotionProps, "initial" | "animate" | "transition">;

export function fadeUp(options: FadeOptions = {}): FadeReturn {
    const { delay = 0, distance = 24, duration = 0.6 } = options;

    if (reducedMotion) {
        return {
            initial: { opacity: 1, y: 0 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0 },
        };
    }

    return {
        initial: { opacity: 0, y: distance },
        animate: { opacity: 1, y: 0 },
        transition: {
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
        } satisfies Transition,
    };
}

type StaggerOptions = {
    delayChildren?: number;
    staggerChildren?: number;
};

export function stagger(options: StaggerOptions = {}): Variants {
    if (reducedMotion) {
        return {
            hidden: {},
            show: {},
        } satisfies Variants;
    }

    const { delayChildren = 0.08, staggerChildren = 0.12 } = options;

    return {
        hidden: {},
        show: {
            transition: {
                delayChildren,
                staggerChildren,
            },
        },
    } satisfies Variants;
}

type ViewportConfig = Partial<ViewportOptions>;

export function viewportTrigger(options: ViewportConfig = {}): ViewportOptions {
    const base: ViewportOptions = {
        once: true,
        amount: 0.2,
        margin: "0px 0px -10% 0px",
    };

    if (reducedMotion) {
        return { ...base, amount: 0.01, ...options } satisfies ViewportOptions;
    }

    return { ...base, ...options } satisfies ViewportOptions;
}

export function onReducedMotionChange(callback: (value: boolean) => void) {
    if (!isBrowser) {
        return;
    }
    const media = window.matchMedia(reduceMotionQuery);
    const handler = (event: MediaQueryListEvent) => callback(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
}
