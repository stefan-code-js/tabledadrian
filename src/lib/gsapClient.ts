type TimelineConfig = { delay?: number };

type KeyframeInput = {
    opacity?: number;
    y?: number;
};

type KeyframeOutput = KeyframeInput & {
    duration?: number;
    ease?: string;
    clearProps?: string;
};

type TimelineInstance = {
    fromTo(element: HTMLElement, from: KeyframeInput, to: KeyframeOutput): TimelineInstance;
    kill(): void;
};

const translateY = (value = 0) => `translate3d(0, ${value}px, 0)`;

function easing(value: string | undefined) {
    if (value === 'power2.out') {
        return 'cubic-bezier(0.16, 1, 0.3, 1)';
    }
    return 'ease-out';
}

function timeline(config: TimelineConfig = {}): TimelineInstance {
    const animations: Animation[] = [];
    const baseDelay = Math.max(0, config.delay ?? 0) * 1000;

    return {
        fromTo(element, from, to) {
            const duration = Math.max(0, to.duration ?? 0.6) * 1000;
            const keyframes: Keyframe[] = [
                {
                    opacity: from.opacity ?? undefined,
                    transform: translateY(from.y),
                },
                {
                    opacity: to.opacity ?? undefined,
                    transform: translateY(to.y),
                },
            ];

            const animation = element.animate(keyframes, {
                duration,
                delay: baseDelay,
                easing: easing(to.ease),
                fill: 'forwards',
            });

            animation.addEventListener('finish', () => {
                if (to.clearProps === 'all') {
                    element.style.removeProperty('opacity');
                    element.style.removeProperty('transform');
                }
            });

            animations.push(animation);
            return this;
        },
        kill() {
            animations.forEach((animation) => animation.cancel());
            animations.length = 0;
        },
    };
}

export const gsap = { timeline };

export type { TimelineInstance };

