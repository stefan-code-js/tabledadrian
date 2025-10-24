import { NextResponse } from "next/server";
import { BigNumber, type BigNumberish } from "ethers";
import { z } from "zod";
import { getCollectibleDrop, getCollectibleChainId } from "@/lib/thirdweb";

const schema = z.object({
    walletAddress: z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, "Wallet address must be a 42-character hex string."),
    quantity: z.number().int().min(1).max(5),
});

function formatReasons(reasons: unknown[]): string[] {
    return reasons
        .map((reason) => (typeof reason === "string" ? reason : null))
        .filter((value): value is string => Boolean(value));
}

function stringify(value: BigNumberish | null | undefined): string | null {
    if (!value) {
        return null;
    }
    try {
        return BigNumber.from(value).toString();
    } catch {
        return null;
    }
}

export async function POST(request: Request) {
    let payload: z.infer<typeof schema>;
    try {
        const body = (await request.json()) as Record<string, unknown> | null;
        payload = schema.parse({
            walletAddress: typeof body?.walletAddress === "string" ? body.walletAddress : undefined,
            quantity: Number(body?.quantity ?? Number.NaN),
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid request", issues: error.flatten() }, { status: 400 });
        }
        return NextResponse.json({ message: "Invalid request payload" }, { status: 400 });
    }

    const drop = await getCollectibleDrop();
    const chainId = getCollectibleChainId();

    if (!drop) {
        return NextResponse.json(
            { message: "Collectible minting is not configured for this environment." },
            { status: 503 },
        );
    }

    try {
        const [condition, ineligibility, preparedTx] = await Promise.all([
            drop.erc721.claimConditions.getActive().catch(() => null),
            drop.erc721.claimConditions
                .getClaimIneligibilityReasons(payload.quantity, payload.walletAddress)
                .catch(() => []),
            drop.erc721.claimTo.prepare(payload.walletAddress, payload.quantity, {
                checkERC20Allowance: true,
            }),
        ]);

        const reasons = formatReasons(ineligibility);
        if (reasons.length > 0) {
            return NextResponse.json({
                message: "Wallet cannot mint at this time.",
                reasons,
            });
        }

        const transactionRequest = await preparedTx.populateTransaction();
        const gasLimit = await preparedTx.estimateGasLimit().catch(() => null);

        const unitPrice = condition?.currencyMetadata?.value ?? null;
        const totalPrice = unitPrice ? unitPrice.mul(payload.quantity) : null;

        return NextResponse.json({
            transaction: {
                to: transactionRequest.to ?? drop.getAddress(),
                data: transactionRequest.data ?? null,
                value: stringify(transactionRequest.value ?? totalPrice),
                gasLimit: stringify(gasLimit),
                chainId: chainId ?? null,
            },
            quote: {
                quantity: payload.quantity,
                unitPriceWei: stringify(unitPrice),
                totalPriceWei: stringify(totalPrice),
                currency: {
                    symbol: condition?.currencyMetadata?.symbol ?? null,
                    address: condition?.currencyAddress ?? null,
                    displayValue: condition?.currencyMetadata?.displayValue ?? null,
                },
            },
        });
    } catch (error) {
        console.error("Unable to prepare mint transaction", error);
        return NextResponse.json(
            { message: "Unable to prepare mint transaction. Please try again shortly." },
            { status: 502 },
        );
    }
}
