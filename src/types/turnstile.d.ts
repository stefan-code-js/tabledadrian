export {};

declare global {
    interface Window {
        turnstile?: {
            render: (
                el: HTMLElement,
                opts: {
                    sitekey: string;
                    callback?: (token: string) => void;
                    'error-callback'?: () => void;
                    'expired-callback'?: () => void;
                    theme?: 'light' | 'dark' | 'auto';
                }
            ) => string | undefined;
            getResponse?: (widgetId: string) => string | undefined;
            reset?: (widgetId?: string) => void;
        };
    }
}
