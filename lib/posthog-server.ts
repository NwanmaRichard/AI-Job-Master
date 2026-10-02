import { PostHog } from "posthog-node";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

type CaptureServerEventInput = {
  distinctId: string;
  event: string;
  properties?: EventProperties;
};

function createPostHogServer(): PostHog | null {
  const projectToken =
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ??
    process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!projectToken || !host) {
    return null;
  }

  return new PostHog(projectToken, {
    host,
    flushAt: 1,
    flushInterval: 0,
  });
}

export async function captureServerEvent({
  distinctId,
  event,
  properties,
}: CaptureServerEventInput): Promise<void> {
  const posthog = createPostHogServer();
  if (!posthog) return;

  try {
    posthog.capture({
      distinctId,
      event,
      properties,
    });
  } catch (error) {
    console.error("[posthog-server] Failed to capture event", error);
  } finally {
    await posthog.shutdown().catch(() => undefined);
  }
}
