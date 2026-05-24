import CmsPageSections from '@/components/cms/CmsPageSections';
import ContentWithImage from '@/components/ContentWithImage';
import InternalPagesHero from '@/components/InternalPagesHero';
import OnlineMenu from '@/components/OnlineMenu';
import SpecialsCarousel from '@/components/SpecialsCarousel';

import type { PageTemplateProps } from './registry';

export default function MenuTemplate({ page }: PageTemplateProps) {
	const featuredimg = page.featuredImage?.url ?? '';

	return (
		<main>
			<InternalPagesHero
				title={page.title}
				subtitle={page.subtitle}
				anchorText="Start Your Order"
				anchorLink="#full-menu"
			/>

			{page.content && (
				<ContentWithImage content={page.content} featuredimg={featuredimg} />
			)}

			<OnlineMenu />

			<SpecialsCarousel />

			<CmsPageSections sections={page.sections} />
		</main>
	);
}
