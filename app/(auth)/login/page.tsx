
import Link from "next/link";
import { OAuthSignInLink } from "@/components/analytics/AuthLinks";
import { createInsforgeServer } from "@/lib/insforge-server";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const ERROR_COPY: Record<string, string> = {
  invalid_provider: "Unsupported sign-in provider. Please try again.",
  oauth_start_failed: "Unable to start sign in. Please try again.",
  missing_oauth_code: "Sign in did not complete. Please try again.",
  missing_oauth_verifier:
    "Sign in session expired before callback. Please try again.",
  oauth_callback_failed: "Sign in failed during callback. Please try again.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const insforge = await createInsforgeServer();
  const {
    data: { user },
  } = await insforge.auth.getCurrentUser();

  const params = await searchParams;
  const errorMessage = params.error ? ERROR_COPY[params.error] : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center justify-center px-6 py-10">
      <section className="surface-shadow w-full max-w-[440px] rounded-xl border border-border bg-surface p-6">
        <h1 className="text-center text-base font-semibold text-text-primary">
          {user ? "You are already signed in" : "Sign in to JobPilot"}
        </h1>
        <p className="mt-2 text-center text-sm text-text-secondary">
          {user
            ? "Continue to your dashboard."
            : "Continue with your preferred account to access your dashboard."}
        </p>

        {errorMessage ? (
          <p className="mt-4 rounded-md border border-error bg-surface px-3 py-2 text-center text-sm text-error">
            {errorMessage}
          </p>
        ) : null}

        {user ? (
          <div className="mt-6">
            <Link
              href="/dashboard"
              className="home-btn home-btn-primary w-full justify-center py-2 text-xs"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            <OAuthSignInLink
              provider="google"
              className="home-btn home-btn-secondary w-full justify-center py-2 text-xs"
            >
              Continue with Google
            </OAuthSignInLink>
            <OAuthSignInLink
              provider="github"
              className="home-btn home-btn-primary w-full justify-center py-2 text-xs"
            >
              Continue with GitHub
            </OAuthSignInLink>
          </div>
        )}
      </section>
    </main>
  );
}
