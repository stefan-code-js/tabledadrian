import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
    amount: z.coerce.number().min(100, "Amount must be at least 100").max(1_000_000),
    currency: z.enum(["usd", "eur", "gbp"]).default("usd"),
});

type QuoteSource = "live" | "fallback";

type NetworkAsset = {
    symbol: string;
    name: string;
    type: "native" | "stablecoin";
};

type NetworkConfig = {
    id: string;
    label: string;
    assets: NetworkAsset[];
};

const NETWORKS: NetworkConfig[] = [
    {
        id: "ethereum",
        label: "Ethereum Mainnet",
        assets: [
            { symbol: "ETH", name: "Ether", type: "native" },
            { symbol: "USDC", name: "USD Coin", type: "stablecoin" },
        ],
    },
    {
        id: "polygon",
        label: "Polygon PoS",
        assets: [
            { symbol: "MATIC", name: "MATIC", type: "native" },
            { symbol: "USDC", name: "USD Coin", type: "stablecoin" },
        ],
    },
    {
        id: "arbitrum",
        label: "Arbitrum One",
        assets: [
            { symbol: "ETH", name: "Ether", type: "native" },
            { symbol: "USDC", name: "USD Coin", type: "stablecoin" },
        ],
    },
    {
        id: "optimism",
        label: "Optimism",
        assets: [
            { symbol: "ETH", name: "Ether", type: "native" },
            { symbol: "USDC", name: "USD Coin", type: "stablecoin" },
        ],
    },
    {
        id: "base",
        label: "Base",
        assets: [
            { symbol: "ETH", name: "Ether", type: "native" },
            { symbol: "USDC", name: "USD Coin", type: "stablecoin" },
        ],
    },
    {
        id: "bsc",
        label: "BNB Smart Chain",
        assets: [
            { symbol: "BNB", name: "BNB", type: "native" },
            { symbol: "USDT", name: "Tether", type: "stablecoin" },
        ],
    },
];

const FALLBACK_FIAT_MULTIPLIER: Record<"usd" | "eur" | "gbp", number> = {
    usd: 1,
    eur: 0.93,
    gbp: 0.79,
};

const FALLBACK_USD_PRICES: Record<string, number> = {
    ETH: 3200,
    MATIC: 0.82,
    USDC: 1,
    USDT: 1,
    ARB: 0.95,
    OP: 1.85,
    BNB: 420,
};

const TOKEN_SYMBOL_MAP: Record<string, string> = {
    ETH: "ETH",
    MATIC: "MATIC",
    USDC: "USDC",
    USDT: "USDT",
    BNB: "BNB",
};

type PriceResponse = Record<string, Record<string, number>>;

async function fetchTokenPrices(symbols: string[], currency: "usd" | "eur" | "gbp"): Promise<PriceResponse | null> {
    if (symbols.length === 0) {
        return {};
    }

    const uniqueSymbols = Array.from(new Set(symbols.map((symbol) => TOKEN_SYMBOL_MAP[symbol] ?? symbol)));
    const query = uniqueSymbols.join(",");
    const currencyKey = currency.toUpperCase();
    const endpoint = new URL("https://min-api.cryptocompare.com/data/pricemulti");
    endpoint.searchParams.set("fsyms", query);
    endpoint.searchParams.set("tsyms", currencyKey);

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: { Accept: "application/json" },
            next: { revalidate: 120 },
        });

        if (!response.ok) {
            return null;
        }

        const payload = (await response.json()) as PriceResponse;
        return payload;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Unable to fetch live crypto prices", error);
        }
        return null;
    }
}

type Quote = {
    networkId: string;
    networkLabel: string;
    assetSymbol: string;
    assetName: string;
    assetType: "native" | "stablecoin";
    tokenPrice: number;
    tokenAmount: number;
};

type QuotePayload = {
    amount: number;
    currency: "usd" | "eur" | "gbp";
    source: QuoteSource;
    updatedAt: string;
    quotes: Quote[];
};

function resolvePrice(
    priceMap: PriceResponse | null,
    symbol: string,
    currency: "usd" | "eur" | "gbp",
): { price: number; source: QuoteSource } {
    const currencyKey = currency.toUpperCase();
    const lookup = TOKEN_SYMBOL_MAP[symbol] ?? symbol;
    const livePrice = priceMap?.[lookup]?.[currencyKey];

    if (typeof livePrice === "number" && Number.isFinite(livePrice) && livePrice > 0) {
        return { price: livePrice, source: "live" };
    }

    const fallbackUsd = FALLBACK_USD_PRICES[lookup] ?? 1;
    const converted = fallbackUsd * FALLBACK_FIAT_MULTIPLIER[currency];
    return { price: converted, source: "fallback" };
}

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const { amount, currency } = requestSchema.parse(payload);

        const symbols = NETWORKS.flatMap((network) => network.assets.map((asset) => asset.symbol));
        const priceMap = await fetchTokenPrices(symbols, currency);

        let source: QuoteSource = priceMap ? "live" : "fallback";

        const quotes: Quote[] = NETWORKS.flatMap((network) =>
            network.assets.map((asset) => {
                const { price, source: entrySource } = resolvePrice(priceMap, asset.symbol, currency);
                if (entrySource === "fallback") {
                    source = "fallback";
                }
                const tokenAmount = amount / price;
                return {
                    networkId: network.id,
                    networkLabel: network.label,
                    assetSymbol: asset.symbol,
                    assetName: asset.name,
                    assetType: asset.type,
                    tokenPrice: price,
                    tokenAmount,
                } satisfies Quote;
            }),
        );

        const response: QuotePayload = {
            amount,
            currency,
            source,
            updatedAt: new Date().toISOString(),
            quotes,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid quote request", issues: error.flatten() }, { status: 400 });
        }
        console.error("Quote generation failed", error);
        return NextResponse.json({ message: "Unable to generate payment quote" }, { status: 500 });
    }
}
