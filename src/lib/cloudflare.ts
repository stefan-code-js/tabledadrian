import { getRequestContext } from "@cloudflare/next-on-pages";

type MaybePromise<T> = T | Promise<T>;

export async function resolveCfEnv<TEnv>(contextEnv?: MaybePromise<TEnv>): Promise<TEnv | undefined> {
    if (contextEnv && typeof (contextEnv as Promise<TEnv>).then === "function") {
        try {
            const resolved = await (contextEnv as Promise<TEnv>);
            return resolved ?? undefined;
        } catch {
            return undefined;
        }
    }

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
