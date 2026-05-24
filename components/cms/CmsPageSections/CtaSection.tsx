import SolidButton from '@/components/ui/SolidButton';
import Wiggles from '@/components/vectors/Wiggles';
import type { CmsPageSection } from '@/helpers/pullCmsPage';

interface CtaSectionProps {
	section: CmsPageSection;
}

type CtaContent = {
	body?: string;
	buttons?: Array<{ label?: string; url?: string }>;
};

/**
 * Red "Ready to order?" call-to-action band. Reads:
 *   - section.title / subtitle        (admin SectionTitleFields)
 *   - section.content.body (HTML)     (admin RichTextEditor on CTA case)
 *   - section.content.buttons[0]      (admin ButtonListEditor)
 */
export default function CtaSection({ section }: CtaSectionProps) {
	const title = section.title ?? '';
	const subtitle = section.subtitle ?? '';
	const content = (section.content ?? {}) as CtaContent;
	const body = content.body ?? '';
	const button = content.buttons?.[0];

	if (!title && !subtitle && !body && !button) return null;

	return (
		<section className="bg-dp-ma-red">
			<div className="dp-container flex items-center justify-center">
				<div className="flex max-w-5xl flex-row items-start">
					<Wiggles className="lg:h-3xs h-36 w-36 lg:w-3xs" />
					<div className="mx-2 flex flex-col items-center justify-center text-center lg:mx-10">
						{title && (
							<h3 className="mb-3 text-3xl text-white lg:text-5xl">{title}</h3>
						)}
						{subtitle && (
							<h4 className="text-dp-softer-ma-cream mb-3 text-xl text-balance lg:text-4xl">
								{subtitle}
							</h4>
						)}
						{body && (
							<div
								className="mb-7 text-balance text-white"
								dangerouslySetInnerHTML={{ __html: body }}
							/>
						)}
						{button?.label && button?.url && (
							<SolidButton
								label={button.label}
								href={button.url}
								classes="bg-white border-white [&>span]:text-dp-highlighter-ma-green hover:bg-dp-softer-ma-cream hover:border-dp-softer-ma-cream hover:[&>svg]:fill-dp-highlighter-ma-green!"
							/>
						)}
					</div>
					<Wiggles className="lg:h-3xs h-36 w-36 scale-x-[-1] lg:w-3xs" />
				</div>
			</div>
		</section>
	);
}
