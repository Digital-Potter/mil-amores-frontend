import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createElement } from 'react';

import { resolveTemplate } from '@/components/pageTemplates/registry';
import { fetchStoreSettingsOrNull } from '@/helpers/cms/settings';
import { getCmsPage } from '@/helpers/pullCmsPage';
import { absoluteUrl } from '@/helpers/seo/structuredData';
import stripHTML from '@/helpers/stripHTML';
import { truncateToLength } from '@/helpers/truncateText';

const DEFAULT_DESCRIPTION =
	'Mil Amores Taqueria - Authentic Mexican Cuisine in Williamsburg, VA. Enjoy our delicious tacos, burritos, and more!';

async function loadHomepage() {
	const settings = await fetchStoreSettingsOrNull();
	const slug =
		settings?.settings?.siteStructure?.homepageSlug ??
		'welcome-to-mil-amores-taqueria';
	const page = await getCmsPage(slug);
	return { page, settings };
}

export const generateMetadata = async (): Promise<Metadata> => {
	const { page } = await loadHomepage();
	if (!page) {
		return { title: 'Mil Amores Taqueria', description: DEFAULT_DESCRIPTION };
	}

	const description = truncateToLength(
		page.seo?.metaDescription ??
			stripHTML(page.content ?? '') ??
			DEFAULT_DESCRIPTION,
		160,
	);
	const title = page.seo?.metaTitle ?? page.title;
	const imageUrl = page.featuredImage?.url
		? absoluteUrl(page.featuredImage.url)
		: undefined;

	return {
		title,
		description,
		alternates: { canonical: '/' },
		openGraph: {
			title,
			description,
			type: 'website',
			url: '/',
			locale: 'en_US',
			images: imageUrl
				? [{ url: imageUrl, width: 800, height: 600, alt: page.title }]
				: undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: imageUrl ? [imageUrl] : undefined,
		},
	};
};

export default async function Home() {
	const { page } = await loadHomepage();
	if (!page) notFound();

	return createElement(resolveTemplate(page.template ?? 'home'), { page });
}
