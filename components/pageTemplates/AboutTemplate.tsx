import CmsPageSections from '@/components/cms/CmsPageSections';
import ContentWithImage from '@/components/ContentWithImage';
import InternalPagesHero from '@/components/InternalPagesHero';
import LocationInfo from '@/components/LocationInfo';

import type { PageTemplateProps } from './registry';

export default function AboutTemplate({ page }: PageTemplateProps) {
	const featuredimg = page.featuredImage?.url ?? '';

	return (
		<main>
			<InternalPagesHero
				title={page.title}
				subtitle={page.subtitle}
				anchorText="Location Info"
				anchorLink="#location-info"
			/>

			{page.content && (
				<ContentWithImage content={page.content} featuredimg={featuredimg} />
			)}

			<LocationInfo />

			{/* feature_grid (Our Promise), cta (Ready to order?) */}
			<CmsPageSections sections={page.sections} />
		</main>
	);
}
