import type { CmsPageSection } from '@/helpers/pullCmsPage';

import CtaSection from './CtaSection';
import FeatureGridSection from './FeatureGridSection';
import HtmlSection from './HtmlSection';
import TextSection from './TextSection';

interface CmsPageSectionsProps {
	sections: CmsPageSection[];
}

/**
 * Dispatches `page.sections[]` to one renderer per `_type`. Unknown
 * types fall through silently. Add new renderers here as we port them.
 */
export default function CmsPageSections({ sections }: CmsPageSectionsProps) {
	if (!sections || sections.length === 0) return null;
	const sorted = [...sections].sort((a, b) => a.order - b.order);
	return (
		<>
			{sorted.map((section, i) => {
				const key = section._id || `section-${i}`;
				switch (section._type) {
					case 'html':
						return <HtmlSection key={key} section={section} />;
					case 'text':
						return <TextSection key={key} section={section} />;
					case 'cta':
						return <CtaSection key={key} section={section} />;
					case 'feature_grid':
						return <FeatureGridSection key={key} section={section} />;
					default:
						return null;
				}
			})}
		</>
	);
}
