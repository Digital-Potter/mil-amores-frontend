import CmsPageSections from '@/components/cms/CmsPageSections';
import InternalPagesHero from '@/components/InternalPagesHero';

import type { PageTemplateProps } from './registry';

export default function DefaultTemplate({ page }: PageTemplateProps) {
	return (
		<main>
			<InternalPagesHero title={page.title} subtitle={page.subtitle} />
			{page.content && (
				<section className="dp-container py-10">
					<div
						className="[&>p]:mb-4 lg:[&>p]:text-lg"
						dangerouslySetInnerHTML={{ __html: page.content }}
					/>
				</section>
			)}
			<CmsPageSections sections={page.sections} />
		</main>
	);
}
