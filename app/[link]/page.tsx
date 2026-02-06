import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import templateSelector from '@/components/templates/templateSelector';
import { getPageByLink } from '@/helpers/api-connections/pagesData';
import createImageAlt from '@/helpers/createImageAlt';
import { truncateToLength } from '@/helpers/truncateText';

const DEFAULT_DESCRIPTION =
	'Mil Amores Taqueria in Williamsburg, VA - Authentic Mexican Cuisine. Enjoy our delicious tacos, burritos, and more!';

type PagesProps = {
	params: Promise<{ link: string }>;
};

export const generateMetadata = async ({
	params,
}: PagesProps): Promise<Metadata> => {
	const { link } = await params;
	const pageData = await getPageByLink(link);

	if (!pageData) {
		return {
			title: 'Mil Amores Taqueria',
			description: DEFAULT_DESCRIPTION,
		};
	}

	const description = pageData.content || DEFAULT_DESCRIPTION;
	const shortContent = truncateToLength(description, 160);
	const imageUrl = `https://thedavid.digitalpotter.io/${pageData.featuredimg}`;
	const imageAlt = createImageAlt(imageUrl);

	return {
		title: pageData.seotitle,
		description: shortContent,
		alternates: {
			canonical: `https://milamorestaqueriava.com/${link}`,
		},
		openGraph: {
			title: pageData.seotitle,
			description: shortContent,
			type: 'website',
			url: `https://milamorestaqueriava.com/${link}`,
			locale: 'en_US',
			images: [
				{
					url: imageUrl,
					width: 800,
					height: 600,
					alt: imageAlt,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: pageData.seotitle,
			description: shortContent,
			images: [imageUrl],
		},
	};
};

const InternalPage = async ({ params }: PagesProps) => {
	const { link } = await params;
	const pageData = await getPageByLink(link);

	if (!pageData || !link) {
		notFound();
	}

	return templateSelector(link, pageData);
};

export default InternalPage;
