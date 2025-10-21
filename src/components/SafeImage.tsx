// src/components/SafeImage.tsx
import type { ImgHTMLAttributes } from 'react';

type SafeImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src?: string | null | undefined;
  /** Optional list of allowed hostnames, e.g. ['cdn.example.com'] */
  allowHosts?: string[];
};

/** Exported for unit tests if you wish to add them later */
export function isSafeImageUrl(raw: unknown, allowHosts?: string[]): raw is string {
  if (typeof raw !== 'string' || raw.trim() === '') return false;

  try {
    // Use window origin when available; fall back to http://localhost for SSR/tests
    const base =
      typeof window !== 'undefined' && window.location?.origin
        ? window.location.origin
        : 'http://localhost';
    const url = new URL(raw, base);

    // 1) Protocol allowlist
    if (!['http:', 'https:'].includes(url.protocol)) return false;

    // 2) Disallow embedded credentials
    if (url.username || url.password) return false;

    // 3) Optional host allowlist
    if (Array.isArray(allowHosts) && allowHosts.length > 0) {
      if (!allowHosts.includes(url.hostname)) return false;
    }

    // 4) Guard absurd URL length
    if (raw.length > 2048) return false;

    return true;
  } catch {
    return false;
  }
}

export function SafeImage({ src, allowHosts, alt = '', ...rest }: SafeImageProps) {
  const ok = isSafeImageUrl(src, allowHosts);
  // If invalid, render without src (or swap to a local placeholder if you prefer)
  return <img src={ok ? (src as string) : undefined} alt={alt} {...rest} />;
}
