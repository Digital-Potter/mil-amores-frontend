import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import HomePageTemplate from '@/components/templates/HomePageTemplate';
import { getPageByLink } from '@/helpers/api-connections/pagesData';
import { truncateToLength } from '@/helpers/truncateText';

const DEFAULT_DESCRIPTION =
	'Mil Amores Taqueria - Authentic Mexican Cuisine in Williamsburg, VA. Enjoy our delicious tacos, burritos, and more!';

export const generateMetadata = async (): Promise<Metadata> => {
	const pageData = await getPageByLink('homepage');

	if (!pageData) {
		return {
			title: 'Mil Amores Taqueria',
			description: DEFAULT_DESCRIPTION,
		};
	}

	const description = pageData.content || DEFAULT_DESCRIPTION;
	const shortContent = truncateToLength(description, 160);
	const imageUrl = `https://thedavid.digitalpotter.io/${pageData.featuredimg}`;

	return {
		title: pageData.seotitle,
		description: shortContent,
		alternates: {
			canonical: 'https://milamorestaqueriava.com',
		},
		openGraph: {
			title: pageData.seotitle,
			description: shortContent,
			type: 'website',
			url: 'https://milamorestaqueriava.com',
			locale: 'en_US',
			images: [
				{
					url: imageUrl,
					width: 800,
					height: 600,
					alt: 'Grilled chicken mexican dish',
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

const Home = async () => {
	const pageData = await getPageByLink('welcome-to-mil-amores-taqueria');

	if (!pageData) {
		notFound();
	}

	return <HomePageTemplate {...pageData} />;
};

export default Home;
