/**
 * Ensures a URL has a protocol prefix so it is treated as an absolute URL.
 * Returns an empty string for blank/falsy input.
 * Internal routes (starting with /) are returned unchanged.
 */
export function ensureAbsolute(url: string | undefined | null): string {
  if (!url || !url.trim()) return '';
  const trimmed = url.trim();
  // Keep internal routes as-is
  if (trimmed.startsWith('/')) return trimmed;
  // Already has a protocol
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // Add https:// prefix
  return `https://${trimmed}`;
}
