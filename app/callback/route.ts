import { createAuthActions } from "@insforge/sdk/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { OAUTH_CODE_VERIFIER_COOKIE } from "@/lib/auth";
import { captureServerEvent } from "@/lib/posthog-server";
import {
  flushPostHogLogs,
  logOAuthCallbackCompleted,
  logOAuthCallbackFailed,
} from "@/lib/posthog-logs";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("insforge_code");

  if (!code) {
    const missingCodeUrl = new URL("/login", request.url);
    missingCodeUrl.searchParams.set("error", "missing_oauth_code");
    return NextResponse.redirect(missingCodeUrl);
  }

  const redirectUrl = new URL("/dashboard", request.url);
  const response = NextResponse.redirect(redirectUrl);

  const auth = createAuthActions({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });

  const codeVerifier = request.cookies.get(OAUTH_CODE_VERIFIER_COOKIE)?.value;

  if (!codeVerifier) {
    const missingVerifierUrl = new URL("/login", request.url);
    missingVerifierUrl.searchParams.set("error", "missing_oauth_verifier");
    return NextResponse.redirect(missingVerifierUrl);
  }

  const { error } = await auth.exchangeOAuthCode(code, codeVerifier);

  response.cookies.delete(OAUTH_CODE_VERIFIER_COOKIE);

  if (error) {
    logOAuthCallbackFailed();
    await captureServerEvent({
      distinctId: `oauth_callback_failed:${Date.now()}`,
      event: "oauth_sign_in_failed",
      properties: { reason: "oauth_callback_failed" },
    });
    await flushPostHogLogs();
    console.error("[auth/callback]", error);
    const oauthErrorUrl = new URL("/login", request.url);
    oauthErrorUrl.searchParams.set("error", "oauth_callback_failed");
    return NextResponse.redirect(oauthErrorUrl);
  }

  logOAuthCallbackCompleted();
  const {
    data: { user },
  } = await auth.getCurrentUser();

  await captureServerEvent({
    distinctId: user?.id ?? `oauth_callback_completed:${Date.now()}`,
    event: "oauth_sign_in_completed",
    properties: user?.email ? { email: user.email } : undefined,
  });
  await flushPostHogLogs();

  return response;
}
