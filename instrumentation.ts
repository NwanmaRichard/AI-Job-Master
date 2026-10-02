export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!projectToken || !host) {
    if (process.env.NODE_ENV === "development") {
      const missingVariable = projectToken
        ? "NEXT_PUBLIC_POSTHOG_HOST"
        : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN";
      throw new Error(
        `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
      );
    }
    return;
  }

  const [
    { logs },
    { LoggerProvider, SimpleLogRecordProcessor },
    { OTLPLogExporter },
    { configurePostHogLogFlushing },
  ] = await Promise.all([
    import("@opentelemetry/api-logs"),
    import("@opentelemetry/sdk-logs"),
    import("@opentelemetry/exporter-logs-otlp-http"),
    import("@/lib/posthog-logs"),
  ]);

  const exporter = new OTLPLogExporter({
    url: `${host.replace(/\/$/, "")}/i/v1/logs`,
    headers: {
      Authorization: `Bearer ${projectToken}`,
    },
  });
  const loggerProvider = new LoggerProvider({
    processors: [new SimpleLogRecordProcessor(exporter)],
  });

  logs.setGlobalLoggerProvider(loggerProvider);
  configurePostHogLogFlushing(() => loggerProvider.forceFlush());
}
