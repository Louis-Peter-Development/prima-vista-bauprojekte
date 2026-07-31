const CONTROL_CHARACTER_RE = /[\u0000-\u001f\u007f]/;
const COVER_IMAGE_PREFIXES = ['/assets/img/', '/api/uploads/'] as const;

/**
 * Escape a literal before embedding it in a RegExp constructor.
 *
 * The character class deliberately includes the backslash itself. Omitting it
 * lets a value ending in a backslash change how the next token is parsed.
 */
export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Return a cover-image URL that is safe to place in an href/src attribute.
 *
 * Blog uploads and bundled assets use one of two root-relative path prefixes.
 * Each accepted segment is decoded, validated, and encoded again so input text
 * is never copied into an href/src attribute verbatim.
 */
export function normalizeCoverImageUrl(value: string): string {
  const candidate = value.trim();
  if (!candidate || CONTROL_CHARACTER_RE.test(candidate)) return '';
  if (candidate.includes('?') || candidate.includes('#') || candidate.includes('\\')) return '';

  const prefix = COVER_IMAGE_PREFIXES.find((allowedPrefix) => candidate.startsWith(allowedPrefix));
  if (!prefix) return '';

  const encodedSegments = candidate.slice(prefix.length).split('/');
  if (encodedSegments.length === 0 || encodedSegments.some((segment) => !segment)) return '';

  try {
    const normalizedSegments = encodedSegments.map((segment) => {
      const decoded = decodeURIComponent(segment);
      if (
        !decoded ||
        decoded === '.' ||
        decoded === '..' ||
        decoded.includes('/') ||
        decoded.includes('\\') ||
        CONTROL_CHARACTER_RE.test(decoded)
      ) {
        throw new Error('Unsafe cover-image path segment');
      }
      return encodeURIComponent(decoded);
    });

    return `${prefix}${normalizedSegments.join('/')}`;
  } catch {
    return '';
  }
}
