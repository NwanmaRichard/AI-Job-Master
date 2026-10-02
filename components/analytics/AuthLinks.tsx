"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ComponentProps, ReactNode } from "react";

type SignupCtaProps = ComponentProps<typeof Link> & {
  location: "navbar" | "hero" | "bottom_cta";
  children: ReactNode;
};

export function SignupCta({ location, children, ...props }: SignupCtaProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          posthog.capture("signup_cta_clicked", { cta_location: location });
        }
      }}
    >
      {children}
    </Link>
  );
}

type OAuthSignInLinkProps = {
  provider: "google" | "github";
  className: string;
  children: ReactNode;
};

export function OAuthSignInLink({
  provider,
  className,
  children,
}: OAuthSignInLinkProps) {
  return (
    <a
      href={`/api/auth/oauth/start?provider=${provider}`}
      className={className}
    >
      {children}
    </a>
  );
}
