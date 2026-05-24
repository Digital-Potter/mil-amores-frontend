import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, SVGProps } from 'react';

import Avocado from '@/components/vectors/Avocado';
import Onions from '@/components/vectors/Onions';
import Taco from '@/components/vectors/Taco';
import type { CmsBlockColumn, CmsPageSection } from '@/helpers/pullCmsPage';

type VectorComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_REGISTRY: Record<string, VectorComponent> = {
	onions: Onions,
	taco: Taco,
	avocado: Avocado,
};

interface FeatureGridSectionProps {
	section: CmsPageSection;
}

type ExtendedColumn = CmsBlockColumn & {
	iconSlug?: string;
	link?: string;
};

function columnImageUrl(img: CmsBlockColumn['image']): string | null {
	if (!img) return null;
	if (typeof img === 'string') return img;
	return img.url ?? null;
}

/**
 * Two visual variants share one section type so the admin can use a
 * single ColumnEditor for both:
 *
 *  - **Icon variant** — at least one column has `iconSlug`. Renders the
 *    "Our Promise" layout (icon + heading + body) on a cream band.
 *  - **Image-tile variant** — columns have `image` and no `iconSlug`.
 *    Renders the legacy `ImagesGrid` layout (image-bg tiles with a white
 *    overlay heading at the bottom). Used by the mil-amores 3-tile grid
 *    migrated out of legacy extraboxes.
 *
 * Both read `content.columns[]` (the admin's ColumnEditor shape) so
 * `subtitle`, `content` (rich-text HTML), `image`, and `link` are all
 * editable from Site Options → Global Sections / page section editor.
 */
export default function FeatureGridSection({
	section,
}: FeatureGridSectionProps) {
	const columns = (section.content?.columns ?? []) as ExtendedColumn[];
	const heading = section.title ?? '';

	if (columns.length === 0 && !heading) return null;

	const hasAnyIcon = columns.some((c) => Boolean(c.iconSlug));
	const hasAnyImage = columns.some((c) => Boolean(columnImageUrl(c.image)));

	if (hasAnyImage && !hasAnyIcon) {
		return <ImageTileGrid columns={columns} heading={heading} />;
	}
	return <IconTextGrid columns={columns} heading={heading} />;
}

function IconTextGrid({
	columns,
	heading,
}: {
	columns: ExtendedColumn[];
	heading: string;
}) {
	return (
		<section className="bg-dp-softer-ma-cream">
			<div className="dp-container">
				{heading && (
					<div className="dp-container bm-7 lg:mb-10">
						<h3 className="text-center text-3xl lg:text-5xl">{heading}</h3>
					</div>
				)}
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-9">
					{columns.map((column, i) => {
						const Icon = column.iconSlug
							? ICON_REGISTRY[column.iconSlug]
							: null;
						const cardHeading = column.subtitle || column.title || '';
						return (
							<div
								key={`${cardHeading || 'item'}-${i}`}
								className="flex flex-col items-center gap-9 p-8 text-center"
							>
								{Icon ? <Icon /> : null}
								<div>
									{cardHeading && (
										<h4 className="text-dp-ma-orange mb-4 text-xl lg:text-3xl">
											{cardHeading}
										</h4>
									)}
									{column.content && (
										<div
											className="text-balance"
											dangerouslySetInnerHTML={{ __html: column.content }}
										/>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function ImageTileGrid({
	columns,
	heading,
}: {
	columns: ExtendedColumn[];
	heading: string;
}) {
	const tileOne = columns[0];
	const tileTwo = columns[1];
	const tileThree = columns[2];

	return (
		<div className="dp-container py-20 xl:py-7">
			{heading && (
				<h3 className="mb-8 text-center text-3xl lg:text-5xl">{heading}</h3>
			)}
			<div className="grid grid-cols-6 items-center gap-9 lg:grid-cols-12">
				{tileOne && (
					<div className="col-span-6 h-96 lg:h-137.5">
						<Tile column={tileOne} />
					</div>
				)}
				{tileTwo && (
					<div className="col-span-6 h-80 lg:col-span-3 lg:h-120">
						<Tile column={tileTwo} />
					</div>
				)}
				{tileThree && (
					<div className="col-span-6 h-80 lg:col-span-3 lg:h-120">
						<Tile column={tileThree} />
					</div>
				)}
			</div>
		</div>
	);
}

function Tile({ column }: { column: ExtendedColumn }) {
	const href = column.link || '/our-menu';
	const imageUrl = columnImageUrl(column.image);
	const overlay = column.subtitle || column.title || '';

	return (
		<Link
			href={href}
			className="relative block h-full w-full overflow-hidden rounded-4xl"
		>
			<div className="absolute right-5 bottom-7 left-5 z-20 lg:right-10 lg:bottom-10 lg:left-10">
				{overlay && (
					<p className="font-Croissant text-3xl text-balance text-white lg:text-5xl">
						{overlay}
					</p>
				)}
			</div>
			<div className="absolute bottom-0 z-10 h-64 w-full -bg-linear-180 from-transparent to-black/80" />
			{imageUrl && (
				<Image
					src={imageUrl}
					alt={overlay}
					fill
					className="z-0 object-cover object-center"
				/>
			)}
		</Link>
	);
}
