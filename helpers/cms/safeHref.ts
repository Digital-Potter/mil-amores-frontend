/**
 * Render-time link validation for CMS-authored URLs.
 *
 * VENDORED from messiah-renderer/lib/safeHref.ts — keep the two in step. There
 * is no shared package across these repos, and the CMS they share is the thing
 * that makes them share this problem.
 *
 * `content.buttons[].url` is a free-text input in the CMS admin's
 * ButtonListEditor. `sanitizeSectionsArray` walks only `htmlContent`/`body`, so
 * a stored `javascript:` URL used to reach `<a href>` with nothing in between.
 * The API now validates on write, which is the canonical defence; this exists
 * so a missed write path, a migration script writing straight to Mongo, or
 * content that predates that validator is a dead link rather than script
 * execution on a customer's public site.
 */

/**
 * `mailto:`/`tel:` are here because contact CTAs genuinely need them, and the
 * CMS rich-text sanitizer already allows both schemes — matching it keeps one
 * answer to "what is a safe link".
 */
const SAFE_SCHEMES = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/** Long enough for any real link; short enough to bound what reaches the DOM. */
const MAX_HREF_LENGTH = 2048;

/**
 * The URL to render, or null when the value cannot be trusted. Callers drop
 * the link entirely on null — a button with no destination is not rendered.
 */
export function safeHref(raw: unknown): string | null {
	if (typeof raw !== 'string') return null;
	const value = raw.trim();
	if (!value || value.length > MAX_HREF_LENGTH) return null;

	// Site-internal paths. The `//` rejection is the protocol-relative bypass:
	// a browser resolves `//evil.com` as an absolute cross-origin URL, so it is
	// an external link wearing an internal link's costume.
	if (value.startsWith('/')) return value.startsWith('//') ? null : value;

	// Same-page anchors.
	if (value.startsWith('#')) return value;

	// No colon means no scheme, so this is a relative path the CMS authored by
	// hand ("about"). It cannot express a scheme, so it cannot be dangerous.
	if (!value.includes(':')) return value;

	try {
		const url = new URL(value);
		if (!SAFE_SCHEMES.has(url.protocol)) return null;
		// Return the RE-SERIALIZED url, never the raw input. The parser folds
		// scheme case and strips embedded tabs/newlines, so `jAvAsCrIpT:` and
		// `java\tscript:` are both recognised here — and neither can reach the
		// DOM in a form the browser would re-interpret.
		return url.toString();
	} catch {
		return null;
	}
}

/** True when the href leaves the site and needs <a> rather than next/link. */
export function isExternalHref(href: string): boolean {
	return /^https?:\/\//i.test(href) || /^(mailto|tel):/i.test(href);
}
