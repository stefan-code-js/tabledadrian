import { getRequestContext } from "@cloudflare/next-on-pages";

export function resolveCfEnv<TEnv>(contextEnv?: TEnv): TEnv | undefined {
    if (contextEnv) {
        return contextEnv;
    }
    try {
        const ctx = getRequestContext();
        return (ctx?.env as TEnv) ?? undefined;
    } catch {
        return undefined;
    }
}

export function getClientIp(request: Request): string {
    return (
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        request.headers.get("client-ip") ||
        "unknown"
    );
}
