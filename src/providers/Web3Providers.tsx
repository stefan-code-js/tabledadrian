"use client";

import "@rainbow-me/rainbowkit/styles.css";

import type { ReactNode } from "react";
import { useMemo, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import type { WalletList } from "@rainbow-me/rainbowkit";
import { coinbaseWallet, rainbowWallet, walletConnectWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiConfig, createConfig, http } from "wagmi";
import type { Chain } from "wagmi/chains";
import { arbitrum, base, mainnet, optimism, polygon, bsc } from "wagmi/chains";

const DEFAULT_CHAINS = [mainnet, polygon, arbitrum, optimism, base, bsc] as const satisfies readonly [Chain, ...Chain[]];

function createConnectors(projectId?: string) {
    const effectiveProjectId = projectId ?? "demo";

    const walletGroups: WalletList = [
        {
            groupName: "Concierge",
            wallets: [
                (options) => rainbowWallet({ projectId: options.projectId, walletConnectParameters: options.walletConnectParameters }),
                () => coinbaseWallet({ appName: "Table d'Adrian" }),
                (options) => ledgerWallet({ projectId: options.projectId, walletConnectParameters: options.walletConnectParameters }),
                (options) => walletConnectWallet({ projectId: options.projectId, options: options.walletConnectParameters }),
            ],
        },
    ];

    return connectorsForWallets(walletGroups, {
        appName: "Table d'Adrian",
        projectId: effectiveProjectId,
    });
}

function createWagmiConfig(projectId?: string) {
    const transports = DEFAULT_CHAINS.reduce<Record<number, ReturnType<typeof http>>>((acc, chain) => {
        const rpcUrl = chain.rpcUrls.default?.http?.[0];
        if (!rpcUrl) {
            return acc;
        }
        acc[chain.id] = http(rpcUrl);
        return acc;
    }, {});

    return createConfig({
        chains: DEFAULT_CHAINS,
        transports,
        connectors: createConnectors(projectId),
        ssr: true,
    });
}

export default function Web3Providers({ children }: { children: ReactNode }) {
    const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
    const wagmiConfig = useMemo(() => createWagmiConfig(walletConnectId), [walletConnectId]);
    const queryClientRef = useRef<QueryClient | null>(null);

    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: 1,
                    staleTime: 1000 * 60 * 5,
                    refetchOnWindowFocus: false,
                },
            },
        });
    }

    return (
        <QueryClientProvider client={queryClientRef.current!}>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider
                    theme={darkTheme({
                        borderRadius: "large",
                        fontStack: "system",
                        overlayBlur: "small",
                    })}
                    modalSize="wide"
                >
                    {children}
                </RainbowKitProvider>
            </WagmiConfig>
        </QueryClientProvider>
    );
}
