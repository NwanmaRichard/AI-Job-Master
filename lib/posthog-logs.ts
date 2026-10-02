import { logs, SeverityNumber } from "@opentelemetry/api-logs";

const logger = logs.getLogger("job_pilot.posthog");
let forceFlush: (() => Promise<void>) | undefined;

export type OAuthProvider = "google" | "github";

export function configurePostHogLogFlushing(flush: () => Promise<void>) {
  forceFlush = flush;
}

export async function flushPostHogLogs() {
  await forceFlush?.().catch(() => undefined);
}

export function logOAuthRedirectStarted(provider: OAuthProvider) {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: "OAuth sign-in redirect started",
    attributes: { oauth_provider: provider },
  });
}

export function logOAuthCallbackCompleted() {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: "INFO",
    body: "OAuth callback completed",
  });
}

export function logOAuthCallbackFailed() {
  logger.emit({
    severityNumber: SeverityNumber.ERROR,
    severityText: "ERROR",
    body: "OAuth callback failed",
  });
}
