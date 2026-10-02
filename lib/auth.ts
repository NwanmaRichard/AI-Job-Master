export const OAUTH_CODE_VERIFIER_COOKIE = "jobpilot_oauth_code_verifier";

export const PROTECTED_PATH_PREFIXES = ["/dashboard", "/profile", "/find-jobs"];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
