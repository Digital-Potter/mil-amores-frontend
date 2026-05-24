import Image from 'next/image';

import OutlinedButton from '@/components/ui/OutlinedButton';
import SolidButton from '@/components/ui/SolidButton';
import type { CmsBlockColumn, CmsPageSection } from '@/helpers/pullCmsPage';

interface TextSectionProps {
	section: CmsPageSection;
}

function columnImageUrl(img: CmsBlockColumn['image']): string | null {
	if (!img) return null;
	if (typeof img === 'string') return img;
	return img.url ?? null;
}

function hasMedia(col: CmsBlockColumn | undefined): boolean {
	if (!col) return false;
	return Boolean(columnImageUrl(col.image)) || (col.gallery?.length ?? 0) > 0;
}

function hasText(col: CmsBlockColumn | undefined): boolean {
	if (!col) return false;
	return Boolean(col.title || (col.content && col.content.trim()));
}

const gridColsClass: Record<number, string> = {
	1: 'grid-cols-1',
	2: 'grid-cols-1 lg:grid-cols-2',
	3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
	4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

/**
 * Generic rich-text section. Each column independently renders
 * eyebrow (title), heading (subtitle), HTML body (content), and
 * optional image. Section-level buttons render below the grid.
 */
export default function TextSection({ section }: TextSectionProps) {
	const columns = section.content?.columns ?? [];
	const buttons = section.content?.buttons ?? [];
	const colCount = columns.length || section.settings?.columns || 1;
	const paddingTop = section.settings?.paddingTop ?? 'medium';
	const paddingBottom = section.settings?.paddingBottom ?? 'medium';

	const padTopClass =
		paddingTop === 'large'
			? 'pt-20 lg:pt-40'
			: paddingTop === 'small'
				? 'pt-6 lg:pt-10'
				: paddingTop === 'none'
					? ''
					: 'pt-11 lg:pt-20';
	const padBottomClass =
		paddingBottom === 'large'
			? 'pb-20 lg:pb-40'
			: paddingBottom === 'small'
				? 'pb-6 lg:pb-10'
				: paddingBottom === 'none'
					? ''
					: 'pb-11 lg:pb-20';

	return (
		<section className={`${padTopClass} ${padBottomClass}`}>
			<div className="dp-container">
				{(section.title || section.subtitle) && (
					<div className="mb-10 text-center lg:mb-16">
						{section.title && (
							<h3 className="text-3xl text-balance lg:text-5xl">
								{section.title}
							</h3>
						)}
						{section.subtitle && (
							<h6 className="text-dp-ma-orange mt-2 text-balance">
								{section.subtitle}
							</h6>
						)}
					</div>
				)}

				<div
					className={`grid gap-9 lg:gap-12 ${gridColsClass[colCount] ?? gridColsClass[1]}`}
				>
					{columns.map((col, i) => {
						const imageUrl = columnImageUrl(col.image);
						const showMedia = hasMedia(col);
						const showText = hasText(col);
						return (
							<div key={i} className="relative">
								{showMedia && imageUrl && (
									<div className="relative mb-6 overflow-hidden rounded-4xl">
										<Image
											src={imageUrl}
											alt={col.title ?? section.title ?? ''}
											width={1200}
											height={900}
											className="h-auto w-full object-cover"
										/>
									</div>
								)}
								{showText && (
									<>
										{col.title && (
											<h4 className="text-dp-ma-orange font-Croissant mb-2 text-xl lg:text-3xl">
												{col.title}
											</h4>
										)}
										{col.subtitle && (
											<h5 className="mb-4 text-balance">{col.subtitle}</h5>
										)}
										{col.content && (
											<div
												className="text-balance"
												dangerouslySetInnerHTML={{ __html: col.content }}
											/>
										)}
									</>
								)}
							</div>
						);
					})}
				</div>

				{buttons.length > 0 && (
					<div className="mt-10 flex items-center justify-center gap-6 lg:mt-16">
						{buttons.map((btn, i) =>
							btn.style === 'secondary' ? (
								<OutlinedButton
									key={`${btn.url ?? i}-${i}`}
									label={btn.label ?? ''}
									href={btn.url ?? '#'}
								/>
							) : (
								<SolidButton
									key={`${btn.url ?? i}-${i}`}
									label={btn.label ?? ''}
									href={btn.url ?? '#'}
								/>
							),
						)}
					</div>
				)}
			</div>
		</section>
	);
}
