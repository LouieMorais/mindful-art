// src/utils/__tests__/sanitiseHtml.test.ts
import * as mod from '../sanitiseHtml';

/**
 * Find a sanitiser function exported by the module, regardless of its name.
 * Priority: sanitiseHtml → sanitise → default (if function) → any function export.
 */
function resolveSanitiser(m: Record<string, unknown>): (html: string) => string {
  const candidate =
    (m as any).sanitiseHtml ??
    (m as any).sanitise ??
    (typeof (m as any).default === 'function' ? (m as any).default : undefined) ??
    Object.values(m).find((v) => typeof v === 'function');

  if (typeof candidate !== 'function') {
    const keys = Object.keys(m).join(', ') || '(no exports found)';
    throw new Error(
      `sanitiseHtml test: could not find a sanitiser function export.\n` +
      `Looked for: sanitiseHtml, sanitise, default, or any function.\n` +
      `Module exports were: ${keys}`
    );
  }
  return candidate as (html: string) => string;
}

const sanitise = resolveSanitiser(mod);

describe('sanitiseHtml (Phase 3: pure utility, deterministic)', () => {
  it('returns a string and does not throw on empty input', () => {
    const out = sanitise('');
    expect(typeof out).toBe('string');
  });

  it('removes or neutralises <script> tags', () => {
    const input = `before<script>alert("xss")</script>after`;
    const out = sanitise(input);

    expect(typeof out).toBe('string');
    // Accept either removal or encoding; just ensure raw <script isn't present.
    expect(out.toLowerCase()).not.toContain('<script');
    expect(out).toContain('before');
    expect(out).toContain('after');
  });

  it('removes dangerous event handlers and javascript: URLs', () => {
    const input =
      `<img src="x" onerror="alert(1)">` +
      `<a href="javascript:alert(2)">click</a>`;
    const out = sanitise(input);

    expect(out.toLowerCase()).not.toContain('onerror');
    expect(out.toLowerCase()).not.toContain('javascript:');
    expect(out).toContain('click');
  });

  it('preserves benign content text (tags may be stripped or encoded)', () => {
    const input = `<p>Hello <strong>world</strong>!</p>`;
    const out = sanitise(input);

    expect(out).toContain('Hello');
    expect(out).toContain('world');
    expect(typeof out).toBe('string');
  });
});
