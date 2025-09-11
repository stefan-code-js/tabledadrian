// src/types/cloudflare.d.ts
// minimal Cloudflare KV + Env typings without using `any`

declare global {
    interface KVNamespace {
        get(
            key: string,
            type?: "text" | "json" | "arrayBuffer" | "stream"
        ): Promise<unknown | null>;
        put(
            key: string,
            value: string | ReadableStream | ArrayBuffer,
            options?: { expiration?: number; expirationTtl?: number; metadata?: unknown }
        ): Promise<void>;
        delete(key: string): Promise<void>;
        list(options?: {
            prefix?: string;
            limit?: number;
            cursor?: string;
        }): Promise<{
            keys: { name: string; expiration?: number; metadata?: unknown }[];
            list_complete: boolean;
            cursor?: string;
        }>;
    }

    // Cloudflare Pages bindings for THIS project
    interface Env {
        REVIEWS: KVNamespace;            // your KV binding name
        TURNSTILE_SECRET_KEY?: string;   // secret in CF env / .env.local
    }
}

export {};
