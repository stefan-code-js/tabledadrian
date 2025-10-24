"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { useSwitchChain } from "wagmi";
import type { SendTransactionErrorType } from "wagmi/actions";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import WalletConnectControl from "@/components/web3/WalletConnectControl";

type MintWindow = {
    status: "live" | "upcoming" | "unconfigured" | "unavailable";
    window: {
        startTime?: string | null;
        maxPerWallet?: string | null;
        availableSupply?: string | null;
        currentMintSupply?: string | null;
    };
    price: {
        unit: string | null;
        currencyAddress: string | null;
        displayValue: string | null;
        valueWei: string | null;
    };
    supply: {
        claimed: string | null;
        remaining: string | null;
    };
    chainId: number | null;
};

type MintIntent = {
    transaction: {
        to: string | null;
        data: string | null;
        value: string | null;
        gasLimit: string | null;
        chainId: number | null;
    };
    quote: {
        quantity: number;
        unitPriceWei: string | null;
        totalPriceWei: string | null;
        currency: {
            symbol: string | null;
            address: string | null;
            displayValue: string | null;
        };
    };
};

type MintHistoryToken = {
    tokenId: string;
    name: string;
    image: string;
    mintedAt?: string | null;
};

type MintHistory = {
    tokens: MintHistoryToken[];
    total: number;
    source: "live" | "fallback";
};

type ConciergeAllowlistStatus = {
    status: "vip" | "allowlisted" | "waitlist" | "not_listed";
    tier: string | null;
    note: string | null;
    source: "seed" | "env" | null;
};

type ConciergeAllowlistResponse = {
    wallet: (ConciergeAllowlistStatus & { address: string | null }) | null;
    email: (ConciergeAllowlistStatus & { email: string | null }) | null;
    updatedAt: string;
};

type ConciergeAccessEnvironment = {
    unlockConfigured: boolean;
    poapConfigured: boolean;
    thirdwebConfigured: boolean;
};

type ConciergeAccessResponse = {
    wallet: {
        address: string | null;
        unlock: { hasKey: boolean; expiration?: string | null } | null;
        poaps: Array<{ eventId: number; eventName: string; mintedAt?: string | null }>;
    } | null;
    environment: ConciergeAccessEnvironment;
    updatedAt: string;
};

type ConciergeIntegrationHealthStatus = {
    configured: boolean;
    healthy: boolean;
    reason: string | null;
    detail: string | null;
};

type ConciergeThirdwebHealthStatus = ConciergeIntegrationHealthStatus & {
    contractAddress: string | null;
    chainId: number | null;
};

type ConciergeHealthResponse = {
    unlock: ConciergeIntegrationHealthStatus;
    poap: ConciergeIntegrationHealthStatus;
    thirdweb: ConciergeThirdwebHealthStatus;
    updatedAt: string;
};

function formatTokenValue(value: string | null, decimals = 18): string | null {
    if (!value) {
        return null;
    }
    try {
        const bigintValue = BigInt(value);
        const divisor = BigInt(10) ** BigInt(decimals);
        const whole = bigintValue / divisor;
        const remainder = bigintValue % divisor;
        if (remainder === BigInt(0)) {
            return whole.toString();
        }
        const remainderString = remainder.toString().padStart(decimals, "0").slice(0, 4).replace(/0+$/, "");
        return remainderString ? `${whole.toString()}.${remainderString}` : whole.toString();
    } catch {
        return null;
    }
}

function resolveExplorerUrl(chainId: number | null, hash: string): string | null {
    if (!chainId) {
        return null;
    }
    switch (chainId) {
        case 1:
            return `https://etherscan.io/tx/${hash}`;
        case 10:
            return `https://optimistic.etherscan.io/tx/${hash}`;
        case 137:
            return `https://polygonscan.com/tx/${hash}`;
        case 8453:
            return `https://basescan.org/tx/${hash}`;
        case 42161:
            return `https://arbiscan.io/tx/${hash}`;
        case 56:
            return `https://bscscan.com/tx/${hash}`;
        default:
            return null;
    }
}

function resolveExplorerAddressUrl(chainId: number | null, address: string): string | null {
    if (!chainId) {
        return null;
    }
    switch (chainId) {
        case 1:
            return `https://etherscan.io/address/${address}`;
        case 10:
            return `https://optimistic.etherscan.io/address/${address}`;
        case 137:
            return `https://polygonscan.com/address/${address}`;
        case 8453:
            return `https://basescan.org/address/${address}`;
        case 42161:
            return `https://arbiscan.io/address/${address}`;
        case 56:
            return `https://bscscan.com/address/${address}`;
        default:
            return null;
    }
}

const CHAIN_LABELS: Record<number, string> = {
    1: "Ethereum Mainnet",
    10: "Optimism",
    56: "BNB Smart Chain",
    137: "Polygon PoS",
    8453: "Base",
    42161: "Arbitrum One",
};

function resolveChainLabel(chainId: number | null): string {
    if (!chainId) {
        return "Ethereum Mainnet";
    }
    return CHAIN_LABELS[chainId] ?? `Chain ${chainId}`;
}

function formatMintStatus(status?: MintWindow["status"]): string {
    switch (status) {
        case "live":
            return "Live";
        case "upcoming":
            return "Upcoming";
        case "unavailable":
            return "Paused";
        case "unconfigured":
            return "Unconfigured";
        default:
            return "Loading";
    }
}

function shortenAddress(value: string | null | undefined): string | null {
    if (!value) {
        return null;
    }
    if (value.length <= 10) {
        return value;
    }
    return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

function formatMintHistoryDate(value?: string | null): string | null {
    if (!value) {
        return null;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

function formatAllowlistStatusLabel(status?: ConciergeAllowlistStatus["status"]): string {
    switch (status) {
        case "vip":
            return "VIP concierge";
        case "allowlisted":
            return "Allowlisted";
        case "waitlist":
            return "Waitlist";
        default:
            return "Not listed";
    }
}

function formatAllowlistUpdatedAt(value?: string | null): string | null {
    if (!value) {
        return null;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        day: "2-digit",
    }).format(date);
}

function formatUnlockExpiration(expiration?: string | null): string | null {
    if (!expiration) {
        return null;
    }
    const date = new Date(expiration);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

export default function CollectibleMintConsole() {
    const analytics = useAnalytics();
    const { address, chainId: walletChainId, isConnected } = useAccount();
    const { switchChainAsync } = useSwitchChain();
    const [mintWindow, setMintWindow] = useState<MintWindow | null>(null);
    const [intent, setIntent] = useState<MintIntent | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
    const [message, setMessage] = useState<string | null>(null);
    const [errorReasons, setErrorReasons] = useState<string[] | null>(null);
    const [mintWindowUpdatedAt, setMintWindowUpdatedAt] = useState<Date | null>(null);
    const [countdown, setCountdown] = useState<string | null>(null);
    const [mintHistory, setMintHistory] = useState<MintHistory | null>(null);
    const [mintHistoryStatus, setMintHistoryStatus] = useState<"idle" | "loading" | "error">("idle");
    const [mintHistoryError, setMintHistoryError] = useState<string | null>(null);
    const [allowlist, setAllowlist] = useState<ConciergeAllowlistResponse | null>(null);
    const [allowlistStatus, setAllowlistStatus] = useState<"idle" | "loading" | "error">("idle");
    const [allowlistError, setAllowlistError] = useState<string | null>(null);
    const [access, setAccess] = useState<ConciergeAccessResponse | null>(null);
    const [accessStatus, setAccessStatus] = useState<"idle" | "loading" | "error">("idle");
    const [accessError, setAccessError] = useState<string | null>(null);
    const [health, setHealth] = useState<ConciergeHealthResponse | null>(null);
    const [healthStatus, setHealthStatus] = useState<"idle" | "loading" | "error">("idle");
    const [healthError, setHealthError] = useState<string | null>(null);

    const { sendTransactionAsync, isPending, data: pendingHash } = useSendTransaction();
    const { data: receipt } = useWaitForTransactionReceipt({ hash: pendingHash });

    useEffect(() => {
        let mounted = true;
        let refreshTimer: ReturnType<typeof setInterval> | null = null;

        const loadMintWindow = async () => {
            try {
                const response = await fetch("/api/collectibles/mint-window");
                if (!response.ok) {
                    throw new Error("Unable to load mint window");
                }
                const payload = (await response.json()) as MintWindow;
                if (!mounted) {
                    return;
                }
                setMintWindow(payload);
                setMintWindowUpdatedAt(new Date());
            } catch (error) {
                if (!mounted) {
                    return;
                }
                console.error(error);
                setMintWindow({
                    status: "unavailable",
                    chainId: null,
                    window: {},
                    price: { unit: null, currencyAddress: null, displayValue: null, valueWei: null },
                    supply: { claimed: null, remaining: null },
                });
                setMintWindowUpdatedAt(null);
            }
        };

        loadMintWindow();
        refreshTimer = setInterval(loadMintWindow, 45000);

        return () => {
            mounted = false;
            if (refreshTimer) {
                clearInterval(refreshTimer);
            }
        };
    }, []);

    useEffect(() => {
        if (!mintWindow?.window.startTime) {
            setCountdown(null);
            return;
        }
        const startTimestamp = Date.parse(mintWindow.window.startTime);
        if (!Number.isFinite(startTimestamp)) {
            setCountdown(null);
            return;
        }

        const updateCountdown = () => {
            const diff = startTimestamp - Date.now();
            if (diff <= 0) {
                setCountdown(null);
                return;
            }
            const totalSeconds = Math.floor(diff / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const segments: string[] = [];
            if (days > 0) {
                segments.push(`${days}d`);
            }
            if (hours > 0 || days > 0) {
                segments.push(`${hours.toString().padStart(2, "0")}h`);
            }
            segments.push(`${minutes.toString().padStart(2, "0")}m`);
            segments.push(`${seconds.toString().padStart(2, "0")}s`);
            setCountdown(segments.join(" "));
        };

        updateCountdown();
        const timer = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [mintWindow?.window.startTime]);

    const loadMintHistory = useCallback(
        async (signal?: AbortSignal) => {
            if (!address) {
                setMintHistory(null);
                setMintHistoryStatus("idle");
                setMintHistoryError(null);
                return;
            }

            setMintHistoryStatus("loading");
            setMintHistoryError(null);

            try {
                const response = await fetch(`/api/collectibles/mint-history?walletAddress=${address}`, {
                    signal,
                });
                const payload = (await response.json()) as MintHistory & { message?: string };
                if (!response.ok) {
                    throw new Error(payload.message ?? "Unable to load mint history.");
                }
                if (!Array.isArray(payload.tokens)) {
                    throw new Error("Unexpected mint history payload.");
                }
                if (signal?.aborted) {
                    return;
                }
                setMintHistory(payload);
                setMintHistoryStatus("idle");
                setMintHistoryError(null);
                analytics.track("web3.collectibles.mint_history_loaded", {
                    source: payload.source,
                    total: payload.total,
                });
            } catch (error) {
                if (signal?.aborted) {
                    return;
                }
                const reason = error instanceof Error ? error.message : "Unable to load mint history.";
                setMintHistory(null);
                setMintHistoryStatus("error");
                setMintHistoryError(reason);
                analytics.track("web3.collectibles.mint_history_failed", {
                    reason,
                });
            }
        },
        [address, analytics],
    );

    useEffect(() => {
        if (!address) {
            setMintHistory(null);
            setMintHistoryStatus("idle");
            setMintHistoryError(null);
            return;
        }

        const controller = new AbortController();
        loadMintHistory(controller.signal).catch((error) => {
            if (!(error instanceof DOMException && error.name === "AbortError")) {
                console.warn("Unable to refresh mint history", error);
            }
        });

        return () => {
            controller.abort();
        };
    }, [address, loadMintHistory]);

    useEffect(() => {
        if (!address) {
            setAllowlist(null);
            setAllowlistStatus("idle");
            setAllowlistError(null);
            return;
        }

        const controller = new AbortController();
        setAllowlistStatus("loading");
        setAllowlistError(null);

        const run = async () => {
            try {
                const response = await fetch(`/api/collectibles/allowlist?wallet=${address}`, {
                    signal: controller.signal,
                });
                const payload = (await response.json()) as ConciergeAllowlistResponse & { message?: string };
                if (!response.ok) {
                    throw new Error(payload.message ?? "Unable to load allowlist status.");
                }
                if (controller.signal.aborted) {
                    return;
                }
                setAllowlist(payload);
                setAllowlistStatus("idle");
                analytics.track("web3.collectibles.allowlist_resolved", {
                    status: payload.wallet?.status ?? "not_listed",
                    source: payload.wallet?.source ?? "unknown",
                });
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }
                const reason = error instanceof Error ? error.message : "Unable to load allowlist status.";
                setAllowlist(null);
                setAllowlistStatus("error");
                setAllowlistError(reason);
                analytics.track("web3.collectibles.allowlist_failed", {
                    reason,
                });
            }
        };

        run().catch((error) => {
            if (!(error instanceof DOMException && error.name === "AbortError")) {
                console.warn("Unable to resolve allowlist status", error);
            }
        });

        return () => {
            controller.abort();
        };
    }, [address, analytics]);

    useEffect(() => {
        if (!address) {
            setAccess(null);
            setAccessStatus("idle");
            setAccessError(null);
            return;
        }

        const controller = new AbortController();
        setAccessStatus("loading");
        setAccessError(null);

        const run = async () => {
            try {
                const response = await fetch(`/api/collectibles/access?wallet=${address}`, {
                    signal: controller.signal,
                });
                const payload = (await response.json()) as ConciergeAccessResponse & { message?: string };
                if (!response.ok) {
                    throw new Error(payload.message ?? "Unable to load access credentials.");
                }
                if (controller.signal.aborted) {
                    return;
                }
                setAccess(payload);
                setAccessStatus("idle");
                analytics.track("web3.collectibles.access_resolved", {
                    unlockConfigured: payload.environment.unlockConfigured,
                    poapConfigured: payload.environment.poapConfigured,
                    thirdwebConfigured: payload.environment.thirdwebConfigured,
                    hasUnlockKey: payload.wallet?.unlock?.hasKey ?? false,
                    poapCount: payload.wallet?.poaps.length ?? 0,
                });
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }
                const reason = error instanceof Error ? error.message : "Unable to load access credentials.";
                setAccess(null);
                setAccessStatus("error");
                setAccessError(reason);
                analytics.track("web3.collectibles.access_failed", {
                    reason,
                });
            }
        };

        run().catch((error) => {
            if (!(error instanceof DOMException && error.name === "AbortError")) {
                console.warn("Unable to resolve concierge access credentials", error);
            }
        });

        return () => {
            controller.abort();
        };
    }, [address, analytics]);

    useEffect(() => {
        const controller = new AbortController();
        setHealthStatus("loading");
        setHealthError(null);

        const run = async () => {
            try {
                const response = await fetch("/api/collectibles/health", { signal: controller.signal });
                const payload = (await response.json()) as ConciergeHealthResponse & { message?: string };
                if (!response.ok) {
                    throw new Error(payload.message ?? "Unable to resolve integration health.");
                }
                if (controller.signal.aborted) {
                    return;
                }
                setHealth(payload);
                setHealthStatus("idle");
                analytics.track("web3.collectibles.integration_health_resolved", {
                    unlockConfigured: payload.unlock.configured,
                    unlockHealthy: payload.unlock.healthy,
                    poapConfigured: payload.poap.configured,
                    poapHealthy: payload.poap.healthy,
                    thirdwebConfigured: payload.thirdweb.configured,
                    thirdwebHealthy: payload.thirdweb.healthy,
                });
            } catch (error) {
                if (controller.signal.aborted) {
                    return;
                }
                const reason = error instanceof Error ? error.message : "Unable to resolve integration health.";
                setHealth(null);
                setHealthStatus("error");
                setHealthError(reason);
                analytics.track("web3.collectibles.integration_health_failed", { reason });
            }
        };

        run().catch((error) => {
            if (!(error instanceof DOMException && error.name === "AbortError")) {
                console.warn("Unable to resolve integration health", error);
            }
        });

        return () => {
            controller.abort();
        };
    }, [analytics]);

    useEffect(() => {
        if (receipt?.transactionHash) {
            setStatus("success");
            setMessage("Collectible mint submitted. Concierge will confirm within moments.");
            analytics.track("web3.collectibles.mint_submitted", {
                hash: receipt.transactionHash,
                chainId: receipt.chainId,
            });
        }
    }, [analytics, receipt]);

    useEffect(() => {
        if (!address || !receipt?.transactionHash) {
            return;
        }
        loadMintHistory().catch((error) => {
            console.warn("Unable to refresh mint history after mint", error);
        });
    }, [address, loadMintHistory, receipt?.transactionHash]);

    const handleQuantityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(event.target.value, 10);
        if (Number.isNaN(value)) {
            setQuantity(1);
        } else {
            setQuantity(Math.max(1, Math.min(5, value)));
        }
    }, []);

    const handlePrepare = useCallback(async () => {
        if (!address) {
            setErrorReasons(["Connect your wallet to request a mint transaction."]);
            return;
        }
        setStatus("loading");
        setMessage("Contacting concierge mint desk...");
        setErrorReasons(null);
        try {
            const response = await fetch("/api/collectibles/mint-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ walletAddress: address, quantity }),
            });
            const payload = (await response.json()) as MintIntent & { message?: string; reasons?: string[] };
            if (!response.ok) {
                throw new Error(payload.message ?? "Unable to prepare mint transaction");
            }
            if (payload.reasons && payload.reasons.length > 0) {
                setStatus("error");
                setErrorReasons(payload.reasons);
                setMessage(payload.message ?? "Wallet is not eligible to mint right now.");
                analytics.track("web3.collectibles.mint_ineligible", {
                    reasons: payload.reasons,
                });
                return;
            }
            setIntent(payload);
            setStatus("idle");
            setMessage("Mint route ready. Review details below.");
            analytics.track("web3.collectibles.mint_intent_ready", {
                quantity,
                currency: payload.quote.currency.symbol,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unable to prepare mint transaction.";
            setStatus("error");
            setMessage(errorMessage);
            analytics.track("web3.collectibles.mint_intent_failed", {
                message: errorMessage,
            });
        }
    }, [address, analytics, quantity]);

    const handleMint = useCallback(async () => {
        if (!intent?.transaction?.to || !intent.transaction.data) {
            setMessage("Mint transaction is not ready yet.");
            setStatus("error");
            return;
        }

        const chainMismatch =
            intent.transaction.chainId && walletChainId && intent.transaction.chainId !== walletChainId;
        if (chainMismatch && switchChainAsync && intent.transaction.chainId) {
            try {
                await switchChainAsync({ chainId: intent.transaction.chainId });
            } catch (error) {
                console.warn("Unable to switch chain", error);
                setStatus("error");
                setMessage("Switch networks to continue minting.");
                return;
            }
        }

        setStatus("loading");
        setMessage("Submitting mint transaction to your wallet...");
        try {
            const hash = await sendTransactionAsync({
                to: intent.transaction.to as `0x${string}`,
                data: intent.transaction.data as `0x${string}`,
                value: intent.transaction.value ? BigInt(intent.transaction.value) : undefined,
                gas: intent.transaction.gasLimit ? BigInt(intent.transaction.gasLimit) : undefined,
            });
            setMessage("Waiting for confirmation...");
            analytics.track("web3.collectibles.mint_sent", {
                hash,
                chainId: intent.transaction.chainId,
            });
        } catch (error) {
            const err = error as SendTransactionErrorType & { shortMessage?: string };
            const label = typeof err.shortMessage === "string" ? err.shortMessage : err.message;
            setStatus("error");
            setMessage(label || "Mint transaction rejected.");
            analytics.track("web3.collectibles.mint_failed", {
                message: label,
            });
        }
    }, [analytics, intent, sendTransactionAsync, switchChainAsync, walletChainId]);

    const handleRefreshMintHistory = useCallback(() => {
        if (!address) {
            return;
        }
        loadMintHistory().catch((error) => {
            console.warn("Unable to refresh mint history", error);
        });
    }, [address, loadMintHistory]);

    const explorerUrl = useMemo(() => {
        if (!receipt?.transactionHash) {
            return null;
        }
        return resolveExplorerUrl(intent?.transaction.chainId ?? mintWindow?.chainId ?? null, receipt.transactionHash);
    }, [intent?.transaction.chainId, mintWindow?.chainId, receipt?.transactionHash]);

    const priceSymbol = useMemo(() => {
        const symbol = intent?.quote.currency.symbol ?? mintWindow?.price.unit ?? "ETH";
        return symbol?.toUpperCase?.() ?? "ETH";
    }, [intent?.quote.currency.symbol, mintWindow?.price.unit]);

    const unitPriceLabel = useMemo(() => {
        if (intent?.quote.unitPriceWei) {
            const decimals = intent.quote.currency.symbol?.toUpperCase() === "USDC" ? 6 : 18;
            const formatted = formatTokenValue(intent.quote.unitPriceWei, decimals);
            if (formatted) {
                return `${formatted} ${priceSymbol}`;
            }
        }
        if (intent?.quote.currency.displayValue) {
            return `${intent.quote.currency.displayValue} ${priceSymbol}`;
        }
        if (mintWindow?.price.displayValue) {
            return `${mintWindow.price.displayValue} ${priceSymbol}`;
        }
        return null;
    }, [intent?.quote.currency.displayValue, intent?.quote.currency.symbol, intent?.quote.unitPriceWei, mintWindow?.price.displayValue, priceSymbol]);

    const totalPriceLabel = useMemo(() => {
        if (intent?.quote.totalPriceWei) {
            const decimals = intent.quote.currency.symbol?.toUpperCase() === "USDC" ? 6 : 18;
            const formatted = formatTokenValue(intent.quote.totalPriceWei, decimals);
            if (formatted) {
                return `${formatted} ${priceSymbol}`;
            }
        }
        if (intent?.quote.currency.displayValue) {
            return `${intent.quote.currency.displayValue} ${priceSymbol}`;
        }
        if (mintWindow?.price.displayValue) {
            return `${mintWindow.price.displayValue} ${priceSymbol}`;
        }
        return null;
    }, [intent?.quote.currency.displayValue, intent?.quote.currency.symbol, intent?.quote.totalPriceWei, mintWindow?.price.displayValue, priceSymbol]);

    const accessUpdatedLabel = useMemo(() => formatAllowlistUpdatedAt(access?.updatedAt), [access?.updatedAt]);
    const unlockExpirationLabel = useMemo(
        () => formatUnlockExpiration(access?.wallet?.unlock?.expiration),
        [access?.wallet?.unlock?.expiration],
    );
    const unlockActive = access?.wallet?.unlock?.hasKey ?? false;
    const poapAttendances = access?.wallet?.poaps ?? [];
    const unlockConfigured = access?.environment?.unlockConfigured ?? false;
    const poapConfigured = access?.environment?.poapConfigured ?? false;
    const thirdwebConfigured = access?.environment?.thirdwebConfigured ?? false;

    const statusMessage = message ?? (mintWindow?.status === "upcoming" ? "Mint opens soon." : null);

    const maxPerWalletLabel = mintWindow?.window.maxPerWallet && mintWindow.window.maxPerWallet !== "unlimited"
        ? mintWindow.window.maxPerWallet
        : "∞";

    const chainLabel = useMemo(
        () => resolveChainLabel(intent?.transaction.chainId ?? mintWindow?.chainId ?? null),
        [intent?.transaction.chainId, mintWindow?.chainId],
    );

    const contractAddress = intent?.transaction.to ?? null;
    const contractDisplay = useMemo(() => shortenAddress(contractAddress), [contractAddress]);
    const contractExplorer = useMemo(
        () =>
            contractAddress
                ? resolveExplorerAddressUrl(
                      intent?.transaction.chainId ?? mintWindow?.chainId ?? null,
                      contractAddress,
                  )
                : null,
        [contractAddress, intent?.transaction.chainId, mintWindow?.chainId],
    );

    const thirdwebContractAddress = health?.thirdweb?.contractAddress ?? null;
    const thirdwebContractDisplay = useMemo(
        () => shortenAddress(thirdwebContractAddress),
        [thirdwebContractAddress],
    );
    const thirdwebContractExplorer = useMemo(
        () =>
            thirdwebContractAddress
                ? resolveExplorerAddressUrl(health?.thirdweb?.chainId ?? null, thirdwebContractAddress)
                : null,
        [health?.thirdweb?.chainId, thirdwebContractAddress],
    );

    const statusLabel = useMemo(() => formatMintStatus(mintWindow?.status), [mintWindow?.status]);

    const updatedLabel = useMemo(() => {
        if (!mintWindowUpdatedAt) {
            return null;
        }
        return new Intl.DateTimeFormat("en", {
            hour: "2-digit",
            minute: "2-digit",
            month: "short",
            day: "2-digit",
        }).format(mintWindowUpdatedAt);
    }, [mintWindowUpdatedAt]);

    const allowlistUpdatedLabel = useMemo(() => formatAllowlistUpdatedAt(allowlist?.updatedAt), [allowlist?.updatedAt]);
    const healthUpdatedLabel = useMemo(() => formatAllowlistUpdatedAt(health?.updatedAt), [health?.updatedAt]);
    const walletAllowlistStatus = allowlist?.wallet?.status ?? null;

    return (
        <section className="collectible-mint-console">
            <header className="collectible-mint-console__header">
                <span className="page-eyebrow">Concierge mint desk</span>
                <h2 className="page-heading">Claim your Alchemy key</h2>
                <p className="page-subheading">
                    Prepare a concierge-reviewed mint transaction aligned with the current Thirdweb drop conditions. Once
                    submitted, our team confirms provenance, perks, and on-chain settlement.
                </p>
            </header>

            <div className="collectible-mint-console__grid">
                <div className="collectible-mint-console__panel">
                    <div className="collectible-mint-console__field">
                        <label htmlFor="mint-quantity">Quantity</label>
                        <input
                            id="mint-quantity"
                            type="number"
                            min={1}
                            max={5}
                            value={quantity}
                            onChange={handleQuantityChange}
                            aria-describedby="mint-quantity-note"
                        />
                        <p id="mint-quantity-note" className="collectible-mint-console__note">
                            Concierge limits {maxPerWalletLabel} per wallet while the atelier calibrates supply.
                        </p>
                    </div>

                    <div className="collectible-mint-console__field">
                        <label>Wallet</label>
                        <div className="collectible-mint-console__wallet">
                            <WalletConnectControl />
                        </div>
                    </div>

                    <div className="collectible-mint-console__actions">
                        <button
                            type="button"
                            className="btn text-xs uppercase tracking-[0.3em]"
                            onClick={handlePrepare}
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Contacting concierge..." : "Generate mint route"}
                        </button>
                        <button
                            type="button"
                            className="btn btn--ghost text-xs uppercase tracking-[0.3em]"
                            onClick={handleMint}
                            disabled={
                                !intent || status === "loading" || isPending || !isConnected || !intent.transaction.data
                            }
                        >
                            {isPending ? "Awaiting wallet..." : "Submit mint"}
                        </button>
                    </div>

                    {statusMessage ? (
                        <p
                            className={clsx("collectible-mint-console__status", status === "error" && "is-error")}
                            role={status === "error" ? "alert" : "status"}
                        >
                            {statusMessage}
                        </p>
                    ) : null}

                    {countdown && mintWindow?.status === "upcoming" ? (
                        <p className="collectible-mint-console__countdown" role="status">
                            Mint opens in <span>{countdown}</span>
                        </p>
                    ) : null}

                    {errorReasons && errorReasons.length > 0 ? (
                        <ul className="collectible-mint-console__reasons" role="alert">
                            {errorReasons.map((reason) => (
                                <li key={reason}>{reason}</li>
                            ))}
                        </ul>
                    ) : null}

                    {receipt?.transactionHash ? (
                        <p className="collectible-mint-console__success">
                            Transaction hash {" "}
                            {explorerUrl ? (
                                <a href={explorerUrl} target="_blank" rel="noreferrer" className="text-link">
                                    {receipt.transactionHash}
                                </a>
                            ) : (
                                <span>{receipt.transactionHash}</span>
                            )}
                        </p>
                    ) : null}
                </div>

                <aside className="collectible-mint-console__summary">
                    <div className="collectible-mint-console__summary-card">
                        <div className="collectible-mint-console__summary-header">
                            <h3>Concierge allowlist</h3>
                            {allowlistUpdatedLabel ? (
                                <span className="collectible-mint-console__meta">{allowlistUpdatedLabel}</span>
                            ) : null}
                        </div>
                        {!address ? (
                            <p className="collectible-mint-console__meta">
                                Connect your wallet to confirm concierge allowlist placement.
                            </p>
                        ) : allowlistStatus === "loading" ? (
                            <p className="collectible-mint-console__meta">Checking concierge ledger…</p>
                        ) : allowlistStatus === "error" ? (
                            <p className="collectible-mint-console__meta">
                                {allowlistError ?? "Unable to verify allowlist right now."}
                            </p>
                        ) : walletAllowlistStatus ? (
                            <div className="collectible-mint-console__allowlist">
                                <span
                                    className={clsx(
                                        "collectible-mint-console__badge",
                                        walletAllowlistStatus === "vip" && "is-vip",
                                        walletAllowlistStatus === "waitlist" && "is-waitlist",
                                        walletAllowlistStatus === "not_listed" && "is-pending",
                                    )}
                                >
                                    {formatAllowlistStatusLabel(walletAllowlistStatus)}
                                </span>
                                {allowlist?.wallet?.tier ? (
                                    <p className="collectible-mint-console__meta">Tier: {allowlist.wallet.tier}</p>
                                ) : null}
                                {allowlist?.wallet?.note ? (
                                    <p className="collectible-mint-console__meta">{allowlist.wallet.note}</p>
                                ) : null}
                                {walletAllowlistStatus === "not_listed" ? (
                                    <p className="collectible-mint-console__meta">
                                        Contact the concierge desk to request allowlist consideration before minting.
                                    </p>
                                ) : null}
                            </div>
                        ) : (
                            <p className="collectible-mint-console__meta">
                                Concierge allowlist status is calibrating. Please refresh in a moment.
                            </p>
                        )}
                    </div>

                    <div className="collectible-mint-console__summary-card">
                        <div className="collectible-mint-console__summary-header">
                            <h3>Access credentials</h3>
                            {accessUpdatedLabel ? (
                                <span className="collectible-mint-console__meta">{accessUpdatedLabel}</span>
                            ) : null}
                        </div>
                        {!address ? (
                            <p className="collectible-mint-console__meta">
                                Connect your wallet to review Unlock keys and POAP activations.
                            </p>
                        ) : accessStatus === "loading" ? (
                            <p className="collectible-mint-console__meta">Checking concierge credentials…</p>
                        ) : accessStatus === "error" ? (
                            <p className="collectible-mint-console__meta">{accessError ?? "Unable to load access data."}</p>
                        ) : (
                            <>
                                <div className="collectible-mint-console__flags">
                                    <span
                                        className={clsx(
                                            "collectible-mint-console__flag",
                                            unlockConfigured ? "is-active" : "is-muted",
                                        )}
                                    >
                                        Unlock {unlockConfigured ? "configured" : "pending"}
                                    </span>
                                    <span
                                        className={clsx(
                                            "collectible-mint-console__flag",
                                            poapConfigured ? "is-active" : "is-muted",
                                        )}
                                    >
                                        POAP {poapConfigured ? "connected" : "pending"}
                                    </span>
                                    <span
                                        className={clsx(
                                            "collectible-mint-console__flag",
                                            thirdwebConfigured ? "is-active" : "is-muted",
                                        )}
                                    >
                                        Thirdweb {thirdwebConfigured ? "ready" : "pending"}
                                    </span>
                                </div>
                                {unlockConfigured ? (
                                    <p className="collectible-mint-console__meta">
                                        {unlockActive
                                            ? `Unlock key active${unlockExpirationLabel ? ` · until ${unlockExpirationLabel}` : ""}`
                                            : "Unlock key pending concierge activation."}
                                    </p>
                                ) : (
                                    <p className="collectible-mint-console__meta">
                                        Unlock credentials not configured. Concierge will update before launch.
                                    </p>
                                )}
                                {poapConfigured ? (
                                    poapAttendances.length > 0 ? (
                                        <ul className="collectible-mint-console__access-list">
                                            {poapAttendances.map((poap) => {
                                                const mintedLabel = formatMintHistoryDate(poap.mintedAt);
                                                return (
                                                    <li
                                                        key={`${poap.eventId}-${poap.eventName}`}
                                                        className="collectible-mint-console__access-item"
                                                    >
                                                        <span className="collectible-mint-console__access-event">{poap.eventName}</span>
                                                        {mintedLabel ? (
                                                            <span className="collectible-mint-console__access-date">{mintedLabel}</span>
                                                        ) : null}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="collectible-mint-console__meta">
                                            No POAP activations detected for this wallet yet.
                                        </p>
                                    )
                                ) : (
                                    <p className="collectible-mint-console__meta">
                                        POAP credentials not configured. Concierge will sync activations before launch.
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    <div className="collectible-mint-console__summary-card">
                        <div className="collectible-mint-console__summary-header">
                            <h3>Integration health</h3>
                            {healthUpdatedLabel ? (
                                <span className="collectible-mint-console__meta">{healthUpdatedLabel}</span>
                            ) : null}
                        </div>
                        {healthStatus === "loading" ? (
                            <p className="collectible-mint-console__meta">Calibrating concierge integrations…</p>
                        ) : healthStatus === "error" ? (
                            <p className="collectible-mint-console__meta">{healthError ?? "Unable to evaluate integrations."}</p>
                        ) : health ? (
                            <>
                                <div className="collectible-mint-console__flags">
                                    <span
                                        className={clsx(
                                            "collectible-mint-console__flag",
                                            health.unlock.healthy && health.unlock.configured && "is-active",
                                            (!health.unlock.configured || !health.unlock.healthy) && "is-muted",
                                        )}
                                    >
                                        Unlock {health.unlock.configured ? (health.unlock.healthy ? "ready" : "issue") : "missing"}
                                    </span>
                                    <span
                                        className={clsx(
                                            "collectible-mint-console__flag",
                                            health.poap.healthy && health.poap.configured && "is-active",
                                            (!health.poap.configured || !health.poap.healthy) && "is-muted",
                                        )}
                                    >
                                        POAP {health.poap.configured ? (health.poap.healthy ? "ready" : "issue") : "missing"}
                                    </span>
                                    <span
                                        className={clsx(
                                            "collectible-mint-console__flag",
                                            health.thirdweb.healthy && health.thirdweb.configured && "is-active",
                                            (!health.thirdweb.configured || !health.thirdweb.healthy) && "is-muted",
                                        )}
                                    >
                                        Thirdweb {health.thirdweb.configured ? (health.thirdweb.healthy ? "ready" : "issue") : "missing"}
                                    </span>
                                </div>
                                <ul className="collectible-mint-console__health-list">
                                    <li
                                        className={clsx(
                                            "collectible-mint-console__health-item",
                                            !health.unlock.configured && "is-missing",
                                            health.unlock.configured && !health.unlock.healthy && "is-issue",
                                        )}
                                    >
                                        <span className="collectible-mint-console__health-title">Unlock protocol</span>
                                        <span className="collectible-mint-console__health-status">
                                            {health.unlock.configured
                                                ? health.unlock.healthy
                                                    ? "Locksmith ready"
                                                    : "Check API credentials"
                                                : "Not configured"}
                                        </span>
                                        <p className="collectible-mint-console__health-message">
                                            {health.unlock.healthy
                                                ? health.unlock.detail ?? "Locksmith reachable."
                                                : health.unlock.reason ?? "Unlock credentials missing."}
                                        </p>
                                    </li>
                                    <li
                                        className={clsx(
                                            "collectible-mint-console__health-item",
                                            !health.poap.configured && "is-missing",
                                            health.poap.configured && !health.poap.healthy && "is-issue",
                                        )}
                                    >
                                        <span className="collectible-mint-console__health-title">POAP concierge</span>
                                        <span className="collectible-mint-console__health-status">
                                            {health.poap.configured
                                                ? health.poap.healthy
                                                    ? "POAP API ready"
                                                    : "Validate POAP key"
                                                : "Not configured"}
                                        </span>
                                        <p className="collectible-mint-console__health-message">
                                            {health.poap.healthy
                                                ? health.poap.detail ?? "POAP API reachable."
                                                : health.poap.reason ?? "POAP API key missing."}
                                        </p>
                                    </li>
                                    <li
                                        className={clsx(
                                            "collectible-mint-console__health-item",
                                            !health.thirdweb.configured && "is-missing",
                                            health.thirdweb.configured && !health.thirdweb.healthy && "is-issue",
                                        )}
                                    >
                                        <span className="collectible-mint-console__health-title">Thirdweb drop</span>
                                        <span className="collectible-mint-console__health-status">
                                            {health.thirdweb.configured
                                                ? health.thirdweb.healthy
                                                    ? "Drop metadata online"
                                                    : "Reconnect Thirdweb"
                                                : "Not configured"}
                                        </span>
                                        <p className="collectible-mint-console__health-message">
                                            {health.thirdweb.healthy
                                                ? health.thirdweb.detail ?? "Contract metadata resolved."
                                                : health.thirdweb.reason ?? "Thirdweb credentials missing."}
                                            {thirdwebContractDisplay ? (
                                                <>
                                                    <br />
                                                    Contract {" "}
                                                    {thirdwebContractExplorer ? (
                                                        <a
                                                            href={thirdwebContractExplorer}
                                                            className="text-link"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {thirdwebContractDisplay}
                                                        </a>
                                                    ) : (
                                                        <span>{thirdwebContractDisplay}</span>
                                                    )}
                                                </>
                                            ) : null}
                                        </p>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <p className="collectible-mint-console__meta">Integration health calibrating.</p>
                        )}
                    </div>

                    <div className="collectible-mint-console__summary-card">
                        <h3>Mint economics</h3>
                        <dl>
                            <div>
                                <dt>Status</dt>
                                <dd>{statusLabel}</dd>
                            </div>
                            <div>
                                <dt>Unit price</dt>
                                <dd>{unitPriceLabel ?? "Calibrating"}</dd>
                            </div>
                            <div>
                                <dt>Per wallet</dt>
                                <dd>{maxPerWalletLabel}</dd>
                            </div>
                            <div>
                                <dt>Available</dt>
                                <dd>{mintWindow?.window.availableSupply ?? "Calibrating"}</dd>
                            </div>
                            <div>
                                <dt>Remaining</dt>
                                <dd>{mintWindow?.supply.remaining ?? "—"}</dd>
                            </div>
                            <div>
                                <dt>Claimed</dt>
                                <dd>{mintWindow?.supply.claimed ?? "—"}</dd>
                            </div>
                            <div>
                                <dt>Network</dt>
                                <dd>{chainLabel}</dd>
                            </div>
                        </dl>
                        {updatedLabel ? (
                            <p className="collectible-mint-console__meta">Updated {updatedLabel}</p>
                        ) : null}
                        {totalPriceLabel ? (
                            <p className="collectible-mint-console__meta">Projected total {totalPriceLabel}</p>
                        ) : null}
                    </div>

                    <div className="collectible-mint-console__summary-card">
                        <h3>Concierge notes</h3>
                        <p>
                            Mint routes are powered by Thirdweb and adhere to the active claim condition. Concierge double checks
                            royalties, allow lists, and Unlock access moments after you submit.
                        </p>
                        <p>
                            Need guided settlement? Email concierge@tabledadrian.com after submitting your transaction.
                        </p>
                    </div>

                    {intent ? (
                        <div className="collectible-mint-console__summary-card">
                            <h3>Transaction details</h3>
                            <dl>
                                <div>
                                    <dt>Quantity</dt>
                                    <dd>{intent.quote.quantity}</dd>
                                </div>
                                <div>
                                    <dt>Total</dt>
                                    <dd>{totalPriceLabel ?? "Pending"}</dd>
                                </div>
                                <div>
                                    <dt>Contract</dt>
                                    <dd>
                                        {contractDisplay ? (
                                            contractExplorer ? (
                                                <a
                                                    href={contractExplorer}
                                                    className="text-link"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {contractDisplay}
                                                </a>
                                            ) : (
                                                contractDisplay
                                            )
                                        ) : (
                                            "Calibrating"
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt>Gas limit</dt>
                                    <dd>{intent.transaction.gasLimit ?? "Wallet calculated"}</dd>
                                </div>
                                <div>
                                    <dt>Network</dt>
                                    <dd>{chainLabel}</dd>
                                </div>
                            </dl>
                        </div>
                    ) : null}

                    <div className="collectible-mint-console__summary-card">
                        <div className="collectible-mint-console__summary-header">
                            <h3>Your minted keys</h3>
                            <button
                                type="button"
                                className="collectible-mint-console__refresh"
                                onClick={handleRefreshMintHistory}
                                disabled={mintHistoryStatus === "loading" || !address}
                            >
                                Refresh
                            </button>
                        </div>
                        {!address ? (
                            <p className="collectible-mint-console__meta">Connect your wallet to view minted keys.</p>
                        ) : mintHistoryStatus === "loading" ? (
                            <p className="collectible-mint-console__meta">Loading minted keys…</p>
                        ) : mintHistoryStatus === "error" ? (
                            <p className="collectible-mint-console__meta">
                                {mintHistoryError ?? "Unable to load minted keys right now."}
                            </p>
                        ) : mintHistory && mintHistory.tokens.length > 0 ? (
                            <>
                                <ul className="collectible-mint-console__history">
                                    {mintHistory.tokens.map((token) => {
                                        const mintedLabel = formatMintHistoryDate(token.mintedAt);
                                        return (
                                            <li
                                                key={`${token.tokenId}-${token.name}`}
                                                className="collectible-mint-console__history-item"
                                            >
                                                <div className="collectible-mint-console__history-media">
                                                    {token.image ? (
                                                        <Image
                                                            src={token.image}
                                                            alt={token.name}
                                                            fill
                                                            sizes="120px"
                                                            className="collectible-mint-console__history-image"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="collectible-mint-console__history-placeholder"
                                                            aria-hidden="true"
                                                        >
                                                            <span>Art coming soon</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="collectible-mint-console__history-details">
                                                    <span className="collectible-mint-console__history-token">#{token.tokenId}</span>
                                                    <span className="collectible-mint-console__history-name">{token.name}</span>
                                                    {mintedLabel ? (
                                                        <span className="collectible-mint-console__history-date">{mintedLabel}</span>
                                                    ) : null}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                {mintHistory.total > mintHistory.tokens.length ? (
                                    <p className="collectible-mint-console__meta">
                                        Showing {mintHistory.tokens.length} of {mintHistory.total} keys detected.
                                    </p>
                                ) : null}
                                {mintHistory.source === "fallback" ? (
                                    <p className="collectible-mint-console__meta">Showing concierge registry snapshot.</p>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <p className="collectible-mint-console__meta">No minted keys detected yet.</p>
                                {mintHistory?.source === "fallback" ? (
                                    <p className="collectible-mint-console__meta">Concierge will confirm newly minted keys.</p>
                                ) : null}
                            </>
                        )}
                    </div>
                </aside>
            </div>
        </section>
    );
}
