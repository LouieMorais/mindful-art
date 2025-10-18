// src/utils/sanitizeHtml.ts
/**
 * Tiny, conservative sanitiser for untrusted text:
 * - strips any angle-bracketed tags
 * - trims and collapses whitespace
 *
 * React already escapes text nodes, so we never use innerHTML.
 * This utility ensures we don't accidentally render any HTML tags we get from APIs.
 */
export function sanitizeToPlainText(input: unknown): string {
  if (typeof input !== 'string') return '';
  // Remove angle-bracketed sequences
  const noTags = input.replace(/<[^>]*>/g, '');
  // Collapse whitespace
  return noTags.replace(/\s+/g, ' ').trim();
}

/** Safe URL guard: allow only http(s) URLs; otherwise return null */
export function toSafeHttpUrl(maybeUrl: unknown): string | null {
  if (typeof maybeUrl !== 'string') return null;
  try {
    const u = new URL(maybeUrl);
    if (u.protocol === 'http:' || u.protocol === 'https:') return u.toString();
    return null;
  } catch {
    return null;
  }
}
