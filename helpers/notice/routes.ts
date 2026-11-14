import type { StoreSettingsRecord } from '@/helpers/cms/types';

import type { NoticeItem } from './notice';

type SiteStructure = StoreSettingsRecord['siteStructure'];

/**
 * Mil Amores only routes `/` and `/<slug>` (see `resolveMenuItemHref`), so only
 * page items can match: the homepage page is `/`, any other page is
 * `/<slug>`. The site has no blog, products, courses or categories, so those
 * types never match.
 */
export function noticeItemRoutes(
	item: NoticeItem,
	siteStructure?: SiteStructure,
): string[] {
	if (item.type !== 'page') return [];
	if (siteStructure?.homepageSlug && item.slug === siteStructure.homepageSlug) {
		return ['/'];
	}
	return [`/${item.slug}`];
}
