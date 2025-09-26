import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const baseCsp = [
    "default-src 'self'",
    "frame-ancestors 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://static.cloudflareinsights.com https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://plausible.io https://static.cloudflareinsights.com",
    "frame-src 'self' https://challenges.cloudflare.com",
    "worker-src 'self' blob:",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ');

const CSP = baseCsp;

const SECURITY_HEADERS: Record<string, string> = {
    'Content-Security-Policy': CSP,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
};

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        if (value) {
            response.headers.set(key, value);
        }
    }

    if (request.method === 'OPTIONS') {
        response.headers.set('Access-Control-Allow-Origin', request.headers.get('origin') ?? '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        response.headers.set(
            'Access-Control-Allow-Headers',
            request.headers.get('access-control-request-headers') ?? '*',
        );
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|site.webmanifest|robots.txt|sitemap.xml|api/og).*)',
    ],
};
