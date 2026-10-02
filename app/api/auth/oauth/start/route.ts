import { createAuthActions } from "@insforge/sdk/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { OAUTH_CODE_VERIFIER_COOKIE } from "@/lib/auth";
import { captureServerEvent } from "@/lib/posthog-server";
import {
  flushPostHogLogs,
  logOAuthRedirectStarted,
  type OAuthProvider,
} from "@/lib/posthog-logs";

const ALLOWED_PROVIDERS = new Set(["google", "github"]);

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider");

  if (!provider || !ALLOWED_PROVIDERS.has(provider)) {
    const invalidProviderUrl = new URL("/login", request.url);
    invalidProviderUrl.searchParams.set("error", "invalid_provider");
    return NextResponse.redirect(invalidProviderUrl);
  }

  const callbackUrl = new URL("/callback", request.url);

  const response = NextResponse.next();
  const auth = createAuthActions({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });
  const { data, error } = await auth.signInWithOAuth(provider, {
    redirectTo: callbackUrl.toString(),
    skipBrowserRedirect: true,
  });

  if (error || !data?.url) {
    const oauthErrorUrl = new URL("/login", request.url);
    oauthErrorUrl.searchParams.set("error", "oauth_start_failed");
    return NextResponse.redirect(oauthErrorUrl);
  }

  logOAuthRedirectStarted(provider as OAuthProvider);
  await captureServerEvent({
    distinctId: `oauth_start:${provider}:${Date.now()}`,
    event: "oauth_sign_in_started",
    properties: { oauthProvider: provider },
  });
  await flushPostHogLogs();

  const redirectResponse = NextResponse.redirect(data.url);

  if (data.codeVerifier) {
    redirectResponse.cookies.set(OAUTH_CODE_VERIFIER_COOKIE, data.codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
  }

  for (const cookie of response.cookies.getAll()) {
    redirectResponse.cookies.set(cookie);
  }

  return redirectResponse;
}
