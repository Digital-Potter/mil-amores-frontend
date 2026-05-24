import './globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';

import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { primaryFont, secondaryFont } from '@/helpers/FontSettings';
import {
	JsonLd,
	organizationSchema,
	resolveSiteOrigin,
	websiteSchema,
} from '@/helpers/seo/structuredData';

const FALLBACK_TITLE =
	'Mil Amores Taqueria | Mexican Restaurant in Williamsburg, VA';
const FALLBACK_DESCRIPTION =
	'Enjoy handcrafted drinks and delicious, wallet-friendly meals right here in Williamsburg, Virginia! Same Taqueria Maria Bonita owners';
const FALLBACK_STORE_NAME = 'Mil Amores Taqueria';

export async function generateMetadata(): Promise<Metadata> {
	const data = await fetchStoreSettingsOrNull();

	const seo = data?.settings?.seo;
	const tenantSettings = data?.tenant?.settings;
	const webmaster = data?.settings?.webmasterTools;
	const generated = seo?.generatedIcons;

	const defaultTitle = seo?.defaultTitle ?? FALLBACK_TITLE;
	const storeName = tenantSettings?.storeName ?? FALLBACK_STORE_NAME;
	const titleTemplate = seo?.titleTemplate?.includes('%s')
		? seo.titleTemplate
		: `%s · ${storeName}`;
	const description =
		seo?.defaultDescription ??
		tenantSettings?.storeDescription ??
		FALLBACK_DESCRIPTION;

	return {
		metadataBase: new URL(
			resolveSiteOrigin(data?.settings?.storefront?.domain),
		),
		title: {
			default: defaultTitle,
			template: titleTemplate,
		},
		description,
		openGraph: {
			title: defaultTitle,
			description,
			siteName: storeName,
			type: 'website',
			locale: 'en_US',
			images: seo?.defaultOgImage ? [{ url: seo.defaultOgImage }] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: defaultTitle,
			description,
			images: seo?.defaultOgImage ? [seo.defaultOgImage] : undefined,
		},
		// Safari-friendly favicon chain. Three load-bearing details:
		//   1. The .ico ships from `app/favicon.ico` (Next.js convention),
		//      which Next.js auto-serves at /favicon.ico AND auto-injects
		//      as a <link rel="icon">. We do NOT add another shortcut
		//      entry here — duplicates confuse Safari's icon picker.
		//   2. We skip the SVG favicon. Safari's SVG-favicon support is
		//      inconsistent across versions and silently bails on heavy
		//      SVGs (the brand SVG is 236KB). Falling back to PNG keeps
		//      every browser happy.
		//   3. apple-touch-icon and PNG variants live at the public/ root
		//      so Safari's default GET /apple-touch-icon.png and
		//      GET /favicon.ico find them without depending on the head.
		// CMS-uploaded favicons (`seo.faviconUrl`, `generatedIcons`)
		// override the static fallbacks when present.
		icons: {
			icon: [
				generated?.favicon32Url
					? { url: generated.favicon32Url, sizes: '32x32', type: 'image/png' }
					: seo?.faviconUrl
						? { url: seo.faviconUrl, type: 'image/png' }
						: {
								url: '/favicon-96x96.png',
								sizes: '96x96',
								type: 'image/png',
							},
				...(generated?.favicon96Url
					? [
							{
								url: generated.favicon96Url,
								sizes: '96x96',
								type: 'image/png',
							},
						]
					: []),
			],
			apple: {
				url:
					generated?.appleTouchUrl ??
					seo?.appleTouchIconUrl ??
					'/apple-touch-icon.png',
				sizes: '180x180',
			},
		},
		appleWebApp: {
			title: 'Mil Amores',
		},
		robots:
			seo?.robots?.allowIndexing === false
				? { index: false, follow: false }
				: undefined,
		verification: {
			google: webmaster?.googleSiteVerification || undefined,
			other: webmaster?.bingSiteVerification
				? { 'msvalidate.01': webmaster.bingSiteVerification }
				: undefined,
		},
	};
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fff1e2' },
		{ media: '(prefers-color-scheme: dark)', color: '#a01d29' },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = await fetchStoreSettingsOrNull();
	const tenant = data?.tenant ?? null;
	const settings = data?.settings ?? null;
	const ga = settings?.googleAnalytics;
	const gaId =
		ga?.trackingEnabled && ga.measurementId ? ga.measurementId : null;

	return (
		<html lang="en">
			<body
				className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
			>
				{tenant ? (
					<>
						<JsonLd data={organizationSchema(tenant, settings)} />
						<JsonLd data={websiteSchema(tenant, settings)} />
					</>
				) : null}
				{children}
				{gaId ? <GoogleAnalytics gaId={gaId} /> : null}
			</body>
		</html>
	);
}
