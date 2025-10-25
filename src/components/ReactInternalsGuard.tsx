"use client";

import { useEffect } from "react";
import * as React from "react";

type ReactBatchConfig = {
    transition: unknown;
};

type ReactInternals = {
    ReactCurrentDispatcher?: { current: unknown };
    ReactCurrentBatchConfig?: ReactBatchConfig | null;
    ReactCurrentOwner?: { current: unknown };
    [key: string]: unknown;
};

type ReactWithInternals = typeof React & {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: ReactInternals;
    __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: ReactInternals;
};

export function ensureReactBatchConfig(targetReact: ReactWithInternals = React as ReactWithInternals): ReactBatchConfig {
    const internalSource =
        targetReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ??
        targetReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    if (internalSource) {
        const existingBatchConfig = internalSource.ReactCurrentBatchConfig;

        if (!existingBatchConfig) {
            const createdConfig: ReactBatchConfig = { transition: null };
            internalSource.ReactCurrentBatchConfig = createdConfig;
        } else if (typeof (existingBatchConfig as ReactBatchConfig).transition === "undefined") {
            (existingBatchConfig as ReactBatchConfig).transition = null;
        }

        if (!targetReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
            targetReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = internalSource;
        }

        return internalSource.ReactCurrentBatchConfig as ReactBatchConfig;
    }

    const fallbackInternals: ReactInternals = {
        ReactCurrentDispatcher: { current: null },
        ReactCurrentBatchConfig: { transition: null },
        ReactCurrentOwner: { current: null },
    };

    targetReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fallbackInternals;

    return fallbackInternals.ReactCurrentBatchConfig as ReactBatchConfig;
}

export default function ReactInternalsGuard(): null {
    useEffect(() => {
        ensureReactBatchConfig();
    }, []);

    return null;
}
