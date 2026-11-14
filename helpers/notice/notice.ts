/**
 * Site notice bar helpers. Pure functions only, so they are easy to test and
 * safe to import from both server and client components.
 *
 * The API sends `settings.noticePopup` only when the owner has the notice on
 * and the content is not blank. Presence means "on".
 */
import type { NoticeItemType, NoticePopupPayload } from '@/helpers/cms/types';

export const NOTICE_STORAGE_KEY = 'mil-amores-notice-dismissed';

const ITEM_TYPES: readonly NoticeItemType[] = [
	'page',
	'product',
	'course',
	'blogPost',
	'productCategory',
	'blogCategory',
];

export type NoticeShowOn = NoticePopupPayload['showOn'];
export type NoticeItem = NoticeShowOn['items'][number];

export type ParsedNotice = {
	content: string;
	showOn: NoticeShowOn;
	hash: string;
};

/** Maps one listed item to every path on THIS site that serves it. */
export type NoticeItemRoutes = (item: NoticeItem) => string[];

/** Lowercase, decoded, no trailing slash, empty becomes "/". */
export function normalizeNoticePath(input: string): string {
	let path = input.split('?')[0].split('#')[0];
	try {
		path = decodeURIComponent(path);
	} catch {
		// Keep the path as written when the escape is malformed.
	}
	path = path.toLowerCase().replace(/\/+$/, '');
	if (!path.startsWith('/')) path = `/${path}`;
	return path === '/' || path === '' ? '/' : path;
}

function hasText(html: string): boolean {
	return (
		html
			.replace(/<[^>]*>/g, '')
			.replace(/&nbsp;/gi, ' ')
			.trim().length > 0
	);
}

/** Small stable hash (FNV-1a, 32 bit) so a changed notice reappears. */
export function hashNoticeContent(content: string): string {
	let h = 0x811c9dc5;
	for (let i = 0; i < content.length; i += 1) {
		h ^= content.charCodeAt(i);
		h = Math.imul(h, 0x01000193);
	}
	return (h >>> 0).toString(36);
}

/**
 * Validate the raw payload. Absent, off or malformed all return null, which
 * renders nothing at all.
 */
export function parseNotice(raw: unknown): ParsedNotice | null {
	if (!raw || typeof raw !== 'object') return null;
	const { content, showOn } = raw as Record<string, unknown>;
	if (typeof content !== 'string' || !hasText(content)) return null;
	if (!showOn || typeof showOn !== 'object') return null;
	const s = showOn as Record<string, unknown>;
	if (typeof s.everywhere !== 'boolean' || typeof s.homepage !== 'boolean') {
		return null;
	}
	if (!Array.isArray(s.items)) return null;
	const items: NoticeItem[] = [];
	for (const entry of s.items) {
		if (!entry || typeof entry !== 'object') continue;
		const e = entry as Record<string, unknown>;
		if (
			typeof e.type === 'string' &&
			(ITEM_TYPES as readonly string[]).includes(e.type) &&
			typeof e.slug === 'string' &&
			e.slug
		) {
			items.push({
				type: e.type as NoticeItemType,
				slug: e.slug,
				path: typeof e.path === 'string' ? e.path : '',
			});
		}
	}
	return {
		content,
		showOn: { everywhere: s.everywhere, homepage: s.homepage, items },
		hash: hashNoticeContent(content),
	};
}

/** Every site path that serves one of the listed items, normalised. */
export function noticeItemPaths(
	items: NoticeItem[],
	routesFor: NoticeItemRoutes,
): string[] {
	const out = new Set<string>();
	for (const item of items) {
		for (const route of routesFor(item)) out.add(normalizeNoticePath(route));
	}
	return [...out];
}

/**
 * Everywhere, or the homepage when ticked, or an exact match on one of this
 * site's own item paths. Never a prefix match.
 */
export function matchesNotice(
	pathname: string,
	target: { everywhere: boolean; homepage: boolean },
	itemPaths: string[],
): boolean {
	if (target.everywhere) return true;
	const path = normalizeNoticePath(pathname);
	if (target.homepage && path === '/') return true;
	return itemPaths.includes(path);
}

/** Inline script body that marks the page before paint for dismissed visits. */
export function dismissedScript(hash: string): string {
	return `try{if(sessionStorage.getItem(${JSON.stringify(
		NOTICE_STORAGE_KEY,
	)})===${JSON.stringify(
		hash,
	)})document.documentElement.setAttribute("data-notice-dismissed","")}catch(e){}`;
}
