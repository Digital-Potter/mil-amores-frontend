import type { MetadataRoute } from 'next';

import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { listCmsPages } from '@/helpers/pullCmsPage';
import { resolveSiteOrigin } from '@/helpers/seo/structuredData';

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

function absolute(base: string, path: string): string {
	if (path.startsWith('http://') || path.startsWith('https://')) return path;
	const p = path.startsWith('/') ? path : `/${path}`;
	return `${base}${p}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await fetchStoreSettingsOrNull();
	const sm = data?.settings?.seo?.sitemap;
	if (sm?.enabled === false) return [];

	const base = resolveSiteOrigin(data?.settings?.storefront?.domain);
	const entries: Entry[] = [];

	entries.push({ url: base, lastModified: new Date(), priority: 1.0 });

	if (sm?.includePages !== false) {
		const pages = await listCmsPages();
		const homepageSlug = data?.settings?.siteStructure?.homepageSlug ?? null;
		for (const p of pages) {
			if (!p.slug) continue;
			if (homepageSlug && p.slug === homepageSlug) continue;
			entries.push({
				url: absolute(base, `/${p.slug}`),
				lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
				priority: 0.8,
			});
		}
	}

	for (const c of sm?.customUrls ?? []) {
		if (!c.loc) continue;
		entries.push({
			url: absolute(base, c.loc),
			lastModified: c.lastmod ? new Date(c.lastmod) : undefined,
			priority: c.priority,
			changeFrequency: c.changefreq,
		});
	}

	const seen = new Set<string>();
	return entries.filter((e) => {
		if (seen.has(e.url)) return false;
		seen.add(e.url);
		return true;
	});
}
