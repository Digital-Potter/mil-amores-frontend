import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { resolveSiteOrigin } from '@/helpers/seo/structuredData';

export const revalidate = 3600;

export async function GET(): Promise<Response> {
	const data = await fetchStoreSettingsOrNull();
	const robots = data?.settings?.seo?.robots;
	const base = resolveSiteOrigin(data?.settings?.storefront?.domain);

	const lines: string[] = ['User-agent: *'];

	if (robots?.allowIndexing === false) {
		lines.push('Disallow: /');
	} else {
		lines.push('Allow: /');
		if (robots?.extraDirectives && robots.extraDirectives.trim().length > 0) {
			lines.push(robots.extraDirectives.trim());
		}
	}

	lines.push('', `Sitemap: ${base}/sitemap.xml`);

	return new Response(lines.join('\n') + '\n', {
		headers: { 'content-type': 'text/plain; charset=utf-8' },
	});
}
