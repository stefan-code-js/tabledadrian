import "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            name?: string | null;
            email?: string | null;
            roles?: string[];
            walletAddress?: string | null;
        };
    }

    interface User {
        roles?: string[];
        walletAddress?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        roles?: string[];
        walletAddress?: string | null;
    }
}
