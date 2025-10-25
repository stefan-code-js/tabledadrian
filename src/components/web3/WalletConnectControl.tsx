"use client";

import clsx from "clsx";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAnalytics } from "@/providers/AnalyticsProvider";

const walletEnabled = Boolean(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID);

function maskAddress(address: string): string {
    if (address.length <= 10) {
        return address;
    }
    return `${address.slice(0, 6)}···${address.slice(-4)}`;
}

export default function WalletConnectControl({ className }: { className?: string }) {
    const analytics = useAnalytics();

    if (!walletEnabled) {
        return null;
    }

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                mounted,
                authenticationStatus,
                openAccountModal,
                openConnectModal,
            }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected = ready && account && chain;
                const isUnsupported = connected && chain?.unsupported;

                if (!ready) {
                    return <span className={clsx("wallet-control", "wallet-control--ghost", className)} aria-hidden="true" />;
                }

                if (!connected) {
                    return (
                        <button
                            type="button"
                            className={clsx("wallet-control", className)}
                            onClick={() => {
                                analytics.track("web3.wallet.connect_modal");
                                openConnectModal();
                            }}
                        >
                            <span>Connect wallet</span>
                        </button>
                    );
                }

                if (isUnsupported) {
                    return (
                        <button
                            type="button"
                            className={clsx("wallet-control", "wallet-control--error", className)}
                            onClick={() => {
                                analytics.track("web3.wallet.unsupported_chain", { chain: chain?.name });
                                openConnectModal();
                            }}
                        >
                            <span>Switch network</span>
                        </button>
                    );
                }

                return (
                    <button
                        type="button"
                        className={clsx("wallet-control", "wallet-control--connected", className)}
                        onClick={() => {
                            analytics.track("web3.wallet.account_modal", { address: account.address });
                            openAccountModal();
                        }}
                        aria-label={`Wallet menu for ${account.displayName}`}
                    >
                        <span className="wallet-control__label">{chain?.name ?? "Wallet"}</span>
                        <span className="wallet-control__address">{maskAddress(account.address)}</span>
                    </button>
                );
            }}
        </ConnectButton.Custom>
    );
}
