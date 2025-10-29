import React from "react";

type Internals = {
    ReactCurrentBatchConfig?: {
        transition: unknown;
        transitionCallbacks?: unknown;
    };
};

const ensureBatchConfig = (internals: Internals | undefined | null) => {
    if (!internals) return;
    if (!internals.ReactCurrentBatchConfig) {
        internals.ReactCurrentBatchConfig = {
            transition: null,
            transitionCallbacks: null,
        };
    }
};

if (typeof window !== "undefined") {
    try {
        ensureBatchConfig((React as unknown as { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: Internals }).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
        ensureBatchConfig(
            (React as unknown as { __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: Internals })
                .__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        );
    } catch {
        // Swallow errors - this polyfill is best-effort.
    }
}

export {};
