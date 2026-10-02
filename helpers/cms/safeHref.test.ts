import { isExternalHref, safeHref } from './safeHref';

describe('safeHref', () => {
	describe('rejects script execution', () => {
		it.each([
			['javascript:alert(1)', 'the plain sink'],
			['JaVaScRiPt:alert(1)', 'scheme case is folded by the URL parser'],
			['java\tscript:alert(1)', 'embedded tab is stripped by the URL parser'],
			['java\nscript:alert(1)', 'embedded newline likewise'],
			['  javascript:alert(1)  ', 'surrounding whitespace is trimmed first'],
			['data:text/html,<script>alert(1)</script>', 'data: can carry markup'],
			['vbscript:msgbox(1)', 'legacy but still honoured somewhere'],
		])('%s — %s', (raw) => {
			expect(safeHref(raw)).toBeNull();
		});
	});

	describe('rejects links that cannot be rendered', () => {
		it('rejects a non-string', () => {
			expect(safeHref(undefined)).toBeNull();
			expect(safeHref(null)).toBeNull();
			expect(safeHref(42)).toBeNull();
		});

		it('rejects an empty or whitespace-only value', () => {
			expect(safeHref('')).toBeNull();
			expect(safeHref('   ')).toBeNull();
		});

		it('rejects a protocol-relative URL', () => {
			// `//evil.com` looks internal but a browser resolves it as absolute
			// cross-origin — an external link wearing an internal link's costume.
			expect(safeHref('//evil.com')).toBeNull();
		});

		it('rejects an absurdly long value', () => {
			expect(safeHref(`https://example.com/${'a'.repeat(2100)}`)).toBeNull();
		});
	});

	describe('allows what the CMS legitimately authors', () => {
		it('keeps site-internal paths', () => {
			expect(safeHref('/about')).toBe('/about');
			expect(safeHref('/')).toBe('/');
		});

		it('keeps same-page anchors', () => {
			expect(safeHref('#contact')).toBe('#contact');
		});

		it('keeps a scheme-less relative path', () => {
			// Cannot express a scheme, so it cannot be dangerous.
			expect(safeHref('about')).toBe('about');
		});

		it('keeps http and https', () => {
			expect(safeHref('https://example.com/x')).toBe('https://example.com/x');
			expect(safeHref('http://example.com/')).toBe('http://example.com/');
		});

		it('keeps mailto and tel, which contact CTAs need', () => {
			expect(safeHref('mailto:hi@example.com')).toBe('mailto:hi@example.com');
			expect(safeHref('tel:+15550000')).toBe('tel:+15550000');
		});
	});
});

describe('isExternalHref', () => {
	it('is true for links that leave the site', () => {
		expect(isExternalHref('https://example.com')).toBe(true);
		expect(isExternalHref('mailto:hi@example.com')).toBe(true);
		expect(isExternalHref('tel:+15550000')).toBe(true);
	});

	it('is false for internal destinations', () => {
		expect(isExternalHref('/about')).toBe(false);
		expect(isExternalHref('#contact')).toBe(false);
	});
});
