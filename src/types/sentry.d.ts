declare module "@sentry/nextjs" {
  type AnyFunction = (...args: any[]) => any;

  interface SentryNamespace {
    init: AnyFunction;
    flush: AnyFunction;
    close: AnyFunction;
    withScope: AnyFunction;
    configureScope: AnyFunction;
    captureException: AnyFunction;
    captureMessage: AnyFunction;
    captureCheckIn: AnyFunction;
    captureEvent: AnyFunction;
    captureFeedback: AnyFunction;
    captureRequestError: AnyFunction;
    captureRouterTransitionStart: AnyFunction;
    wrapApiHandlerWithSentry: AnyFunction;
    wrapRouteHandlerWithSentry: AnyFunction;
    wrapAppDirRenderWithSentry: AnyFunction;
    wrapGetServerSidePropsWithSentry: AnyFunction;
    wrapGetStaticPropsWithSentry: AnyFunction;
    wrapServerComponentWithSentry: AnyFunction;
    wrapServerActionWithSentry: AnyFunction;
    wrapClientComponentWithSentry: AnyFunction;
    wrapMiddlewareWithSentry: AnyFunction;
    withSentryConfig: AnyFunction;
    withSentry: AnyFunction;
    withSentrySpan: AnyFunction;
    startSpan: AnyFunction;
    startSpanManual: AnyFunction;
    startInactiveSpan: AnyFunction;
    continueTrace: AnyFunction;
    setTag: AnyFunction;
    setExtra: AnyFunction;
    setUser: AnyFunction;
    getClient: AnyFunction;
    getCurrentHub: AnyFunction;
    setCurrentClient: AnyFunction;
    addGlobalEventProcessor: AnyFunction;
    getGlobalScope: AnyFunction;
    withIsolationScope: AnyFunction;
    defaultIntegrations?: unknown;
    [key: string]: unknown;
  }

  const Sentry: SentryNamespace;
  export = Sentry;
}
