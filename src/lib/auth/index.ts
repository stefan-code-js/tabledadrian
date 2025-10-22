import { z } from "zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { authenticateMember } from "@/lib/members";

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const AUTH_SECRET = process.env.NEXTAUTH_SECRET ?? "development-nextauth-secret";

export const authConfig: NextAuthConfig = {
    secret: AUTH_SECRET,
    providers: [
        Credentials({
            name: "Member Access",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = credentialsSchema.safeParse(credentials);
                if (!parsed.success) {
                    return null;
                }
                const member = await authenticateMember(parsed.data.email, parsed.data.password);
                if (!member) {
                    return null;
                }
                return {
                    id: member.id,
                    email: member.email,
                    name: member.fullName,
                    roles: member.roles,
                    walletAddress: member.walletAddress ?? null,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                if (typeof user.id === "string") {
                    token.sub = user.id;
                }
                if (typeof user.email === "string") {
                    token.email = user.email;
                }
                if (typeof user.name === "string") {
                    token.name = user.name;
                }
                token.roles = (user as { roles?: string[] }).roles ?? ["member"];
                token.walletAddress = (user as { walletAddress?: string | null }).walletAddress ?? null;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                if (typeof token.sub === "string") {
                    session.user.id = token.sub;
                }
                if (typeof token.email === "string") {
                    session.user.email = token.email;
                }
                if (typeof token.name === "string") {
                    session.user.name = token.name;
                }
                session.user.roles = (token.roles as string[]) ?? ["member"];
                session.user.walletAddress = (token.walletAddress as string | null) ?? null;
            }
            return session;
        },
    },
    trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
