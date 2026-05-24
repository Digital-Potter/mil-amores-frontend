import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createElement } from 'react';

import { resolveTemplate } from '@/components/pageTemplates/registry';
import { getCmsPage, listCmsPages } from '@/helpers/pullCmsPage';
import { absoluteUrl } from '@/helpers/seo/structuredData';
import stripHTML from '@/helpers/stripHTML';
import { truncateToLength } from '@/helpers/truncateText';

const DEFAULT_DESCRIPTION =
	'Mil Amores Taqueria in Williamsburg, VA - Authentic Mexican Cuisine. Enjoy our delicious tacos, burritos, and more!';

type PageProps = {
	params: Promise<{ link: string }>;
};

export const generateMetadata = async ({
	params,
}: PageProps): Promise<Metadata> => {
	const { link } = await params;
	const page = await getCmsPage(link);

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
	const canonical = `/${link}`;
	const imageUrl = page.featuredImage?.url
		? absoluteUrl(page.featuredImage.url)
		: undefined;

	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			type: 'website',
			url: canonical,
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

export async function generateStaticParams() {
	const pages = await listCmsPages();
	return pages.filter((p) => p.slug).map((p) => ({ link: p.slug }));
}

export default async function InternalPage({ params }: PageProps) {
	const { link } = await params;
	const page = await getCmsPage(link);

	if (!page || !link) notFound();

	return createElement(resolveTemplate(page.template), { page });
}
