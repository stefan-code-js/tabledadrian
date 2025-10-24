import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NFTDrop } from "@thirdweb-dev/sdk";

let cachedSdk: ThirdwebSDK | null = null;
let cachedDrop: NFTDrop | null | undefined;

const thirdwebClientId =
    process.env.THIRDWEB_CLIENT_ID ?? process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? null;
const thirdwebSecretKey = process.env.THIRDWEB_SECRET_KEY ?? null;

const collectibleContractAddress =
    process.env.ZORA_CONTRACT_ADDRESS ?? process.env.NEXT_PUBLIC_COLLECTIBLES_CONTRACT ?? null;

const collectibleRpcUrl =
    process.env.COLLECTIBLES_RPC_URL ?? process.env.NEXT_PUBLIC_RPC_URL ?? process.env.ALCHEMY_RPC_URL ??
    process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL ?? null;

function createSdk(): ThirdwebSDK | null {
    if (cachedSdk) {
        return cachedSdk;
    }

    const network = collectibleRpcUrl ?? process.env.THIRDWEB_NETWORK ?? "mainnet";

    try {
        cachedSdk = new ThirdwebSDK(network, {
            clientId: thirdwebClientId ?? undefined,
            secretKey: thirdwebSecretKey ?? undefined,
            readonlySettings: collectibleRpcUrl
                ? {
                      rpcUrl: collectibleRpcUrl,
                      chainId: parseInt(
                          process.env.COLLECTIBLES_CHAIN_ID ??
                              process.env.NEXT_PUBLIC_COLLECTIBLES_CHAIN_ID ??
                              process.env.NEXT_PUBLIC_THIRDWEB_CHAIN_ID ??
                              "0",
                          10,
                      ) || undefined,
                  }
                : undefined,
        });
        return cachedSdk;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Unable to create Thirdweb SDK", error);
        }
        cachedSdk = null;
        return null;
    }
}

export async function getCollectibleDrop(): Promise<NFTDrop | null> {
    if (cachedDrop !== undefined) {
        return cachedDrop;
    }

    if (!collectibleContractAddress) {
        cachedDrop = null;
        return cachedDrop;
    }

    const sdk = createSdk();
    if (!sdk) {
        cachedDrop = null;
        return cachedDrop;
    }

    try {
        const contract = await sdk.getContract(collectibleContractAddress, "nft-drop");
        cachedDrop = contract as NFTDrop;
        return cachedDrop;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Unable to load Thirdweb collectible drop", error);
        }
        cachedDrop = null;
        return cachedDrop;
    }
}

export function getCollectibleChainId(): number | null {
    const configured =
        process.env.COLLECTIBLES_CHAIN_ID ??
        process.env.NEXT_PUBLIC_COLLECTIBLES_CHAIN_ID ??
        process.env.NEXT_PUBLIC_THIRDWEB_CHAIN_ID;
    if (!configured) {
        return null;
    }
    const parsed = Number.parseInt(configured, 10);
    return Number.isFinite(parsed) ? parsed : null;
}
