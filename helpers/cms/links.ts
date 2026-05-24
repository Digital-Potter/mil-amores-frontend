import type { ResolvedMenuItem, StoreSettingsRecord } from './types';

type SiteStructure = StoreSettingsRecord['siteStructure'];

const BLOG_PREFIX = 'blog';

/**
 * Maps a CMS-resolved menu item to the mil-amores URL it should link to.
 *
 * Restaurant routing (no blog yet on this client — fallback prefix is
 * `/blog` if/when one is added):
 *   - pages live at top level (`/{slug}`)
 *   - homepage page resolves to `/` when the CMS marks it as homepage
 */
export function resolveMenuItemHref(
	item: ResolvedMenuItem,
	siteStructure?: SiteStructure,
): string {
	if (item.type === 'custom') return item.url ?? '#';
	if (!item.resolved) return '#';

	const slug = item.resolved.slug;

	if (item.type === 'page') {
		if (siteStructure?.homepageSlug && slug === siteStructure.homepageSlug) {
			return '/';
		}
		return `/${slug}`;
	}

	if (item.type === 'blog_category') {
		return `/${BLOG_PREFIX}/${slug}`;
	}

	if (item.type === 'blog_post') {
		return `/${BLOG_PREFIX}/${slug}`;
	}

	return '#';
}
