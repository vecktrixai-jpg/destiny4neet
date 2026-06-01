/**
 * Simple server-secret helpers that read from process.env.
 * Used by Msg91Service and other server-side integrations.
 */

export async function getServerSecret(
  key: string,
): Promise<string | undefined> {
  return process.env[key] ?? undefined;
}

export function hasConfiguredServerSecret(key: string): boolean {
  return !!process.env[key];
}
