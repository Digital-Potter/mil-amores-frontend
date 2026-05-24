import type { CmsPageSection } from '@/helpers/pullCmsPage';

interface HtmlSectionProps {
	section: CmsPageSection;
}

export default function HtmlSection({ section }: HtmlSectionProps) {
	const html = section.content?.htmlContent ?? '';
	if (!html.trim()) return null;
	return (
		<section className="dp-container py-11 lg:py-20">
			{section.title && (
				<h2 className="mb-6 text-3xl text-balance">{section.title}</h2>
			)}
			<div className="max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
		</section>
	);
}
