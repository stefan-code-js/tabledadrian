import { describe, expect, it } from "vitest";
import { ensureReactBatchConfig } from "@/components/ReactInternalsGuard";

describe("ensureReactBatchConfig", () => {
    it("initializes a fallback batch config when internals are missing", () => {
        const mockReact: Record<string, unknown> = {};

        const batchConfig = ensureReactBatchConfig(mockReact as typeof import("react"));

        expect(batchConfig).toBeDefined();
        expect(batchConfig.transition).toBeNull();
        expect(mockReact).toHaveProperty("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED");
    });

    it("fills in missing batch config details without replacing internals", () => {
        const existingInternals = {
            ReactCurrentDispatcher: { current: {} },
            ReactCurrentBatchConfig: {} as Record<string, unknown>,
            ReactCurrentOwner: { current: {} },
        };
        const mockReact = {
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: existingInternals,
        } as Record<string, unknown>;

        const batchConfig = ensureReactBatchConfig(mockReact as typeof import("react"));

        expect(batchConfig.transition).toBeNull();
        expect(mockReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).toBe(existingInternals);
    });
});
