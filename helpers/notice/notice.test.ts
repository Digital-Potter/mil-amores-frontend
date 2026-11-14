import {
	dismissedScript,
	hashNoticeContent,
	matchesNotice,
	normalizeNoticePath,
	noticeItemPaths,
	parseNotice,
} from './notice';
import { noticeItemRoutes } from './routes';

const payload = (over: Record<string, unknown> = {}) => ({
	content: '<p>Closed on Monday</p>',
	showOn: { everywhere: false, homepage: false, items: [] },
	...over,
});

describe('normalizeNoticePath', () => {
	it('decodes, lowercases, strips trailing slashes and query', () => {
		expect(normalizeNoticePath('/About-Us/')).toBe('/about-us');
		expect(normalizeNoticePath('/caf%C3%A9?x=1')).toBe('/café');
		expect(normalizeNoticePath('')).toBe('/');
		expect(normalizeNoticePath('///')).toBe('/');
	});

	it('keeps a malformed escape as written', () => {
		expect(normalizeNoticePath('/100%')).toBe('/100%');
	});
});

describe('parseNotice', () => {
	it('returns null when absent, malformed or blank', () => {
		expect(parseNotice(undefined)).toBeNull();
		expect(parseNotice('x')).toBeNull();
		expect(parseNotice(payload({ content: '<p></p>' }))).toBeNull();
		expect(parseNotice(payload({ content: 5 }))).toBeNull();
		expect(parseNotice(payload({ showOn: null }))).toBeNull();
		expect(
			parseNotice(payload({ showOn: { everywhere: 'y', homepage: true } })),
		).toBeNull();
	});

	it('parses a valid payload and drops bad items', () => {
		const n = parseNotice(
			payload({
				showOn: {
					everywhere: false,
					homepage: true,
					items: [
						{ type: 'page', slug: 'about', path: '/about' },
						{ type: 'nope', slug: 'x', path: '/x' },
						{ type: 'page', slug: '' },
					],
				},
			}),
		);
		expect(n?.showOn.items).toHaveLength(1);
		expect(n?.hash).toBe(hashNoticeContent('<p>Closed on Monday</p>'));
	});
});

describe('hash and script', () => {
	it('changes when the text changes', () => {
		expect(hashNoticeContent('a')).not.toBe(hashNoticeContent('b'));
	});

	it('embeds the key and hash safely', () => {
		const s = dismissedScript('abc');
		expect(s).toContain('"mil-amores-notice-dismissed"');
		expect(s).toContain('"abc"');
	});
});

describe('matching', () => {
	const ss = { homepageSlug: 'homepage' };
	const paths = noticeItemPaths(
		[
			{ type: 'page', slug: 'about', path: '' },
			{ type: 'page', slug: 'homepage', path: '' },
			{ type: 'blogPost', slug: 'hello', path: '' },
			{ type: 'blogCategory', slug: 'tips', path: '' },
			{ type: 'product', slug: 'mug', path: '/products/mug' },
		],
		(i) => noticeItemRoutes(i, ss),
	);

	it('everywhere matches any path', () => {
		expect(
			matchesNotice('/anything', { everywhere: true, homepage: false }, []),
		).toBe(true);
	});

	it('homepage matches only the root', () => {
		const t = { everywhere: false, homepage: true };
		expect(matchesNotice('/', t, [])).toBe(true);
		expect(matchesNotice('/about', t, [])).toBe(false);
	});

	it('matches this site routes exactly, never by prefix', () => {
		const t = { everywhere: false, homepage: false };
		expect(matchesNotice('/about/', t, paths)).toBe(true);
		expect(matchesNotice('/blog/tips', t, paths)).toBe(false);
		expect(matchesNotice('/', t, paths)).toBe(true);
		expect(matchesNotice('/about/team', t, paths)).toBe(false);
	});

	it('blog and unrouted types never match', () => {
		const t = { everywhere: false, homepage: false };
		expect(matchesNotice('/products/mug', t, paths)).toBe(false);
		expect(matchesNotice('/mug', t, paths)).toBe(false);
	});
});
