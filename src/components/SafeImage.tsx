// src/components/SafeImage.tsx
import React from 'react';

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Restrict remote hosts, if you implement CSP/URL checks later. */
  allowHosts?: string[];
};

/**
 * SafeImage
 * Lightweight wrapper around <img/> to centralise defaults and
 * future guardrails (e.g., allowlist, referrerPolicy).
 *
 * NOTE: Keep styling minimal; callers pass width/height/sizes as needed.
 */
export function SafeImage({
  src,
  alt,
  loading = 'lazy',
  decoding = 'async',
  referrerPolicy = 'no-referrer',
  allowHosts,
  ...rest
}: SafeImageProps) {
  // Optional host allow-list hook (no-op by default)
  if (src && allowHosts && allowHosts.length > 0) {
    try {
      const host = new URL(String(src)).host;
      if (!allowHosts.includes(host)) {
        // Block rendering if host is not permitted
        // (Prefer a telemetry/log hook in real usage)
        return (
          <div
            role="img"
            aria-label="Image blocked by policy"
            style={{ width: rest.width ?? 240, height: rest.height ?? 'auto' }}
          />
        );
      }
    } catch {
      // If URL parsing fails, render a placeholder for safety
      return (
        <div
          role="img"
          aria-label="Invalid image URL"
          style={{ width: rest.width ?? 240, height: rest.height ?? 'auto' }}
        />
      );
    }
  }

  return (
    <img
      src={src as string | undefined}
      alt={alt}
      loading={loading}
      decoding={decoding}
      referrerPolicy={referrerPolicy}
      {...rest}
    />
  );
}
