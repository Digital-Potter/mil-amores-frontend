import type { MetadataRoute } from 'next';

import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';

export const revalidate = 3600;

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const data = await fetchStoreSettingsOrNull();
	const tenant = data?.tenant?.settings;
	const seo = data?.settings?.seo;
	const icons = data?.settings?.seo?.generatedIcons;

	const iconList: MetadataRoute.Manifest['icons'] = [];
	if (icons?.favicon192Url) {
		iconList.push({
			src: icons.favicon192Url,
			sizes: '192x192',
			type: 'image/png',
			purpose: 'any',
		});
	} else if (seo?.faviconUrl) {
		iconList.push({
			src: seo.faviconUrl,
			type: 'image/png',
			purpose: 'any',
		});
	} else {
		iconList.push({
			src: '/icons/web-app-manifest-192x192.png',
			sizes: '192x192',
			type: 'image/png',
			purpose: 'any',
		});
	}
	if (icons?.favicon512Url) {
		iconList.push({
			src: icons.favicon512Url,
			sizes: '512x512',
			type: 'image/png',
			purpose: 'any',
		});
	} else if (seo?.faviconUrl) {
		iconList.push({
			src: seo.faviconUrl,
			type: 'image/png',
			purpose: 'any',
		});
	} else {
		iconList.push({
			src: '/icons/web-app-manifest-512x512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'any',
		});
	}

	return {
		name: tenant?.storeName ?? 'Mil Amores Taqueria',
		short_name: 'Mil Amores',
		description: tenant?.storeDescription ?? '',
		start_url: '/',
		display: 'standalone',
		theme_color: '#a01d29',
		background_color: '#fff1e2',
		icons: iconList,
	};
}
