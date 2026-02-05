import ImagesGrid from '@/components/ImagesGrid';
import OurPromise from '@/components/OurPromise';
import RedCta from '@/components/RedCta';
import SpecialsCarousel from '@/components/SpecialsCarousel';
import DecoratedImage from '@/components/ui/DecoratedImage';
import Decorations from '@/components/vectors/Decorations';
import createImageAlt from '@/helpers/createImageAlt';
import { PageProps } from '@/types/pages';

const HomePageTemplate = (props: PageProps) => {
	const { featuredimg, title, subtitle, content, extraboxes } = props;

	const featuredImageAlt = createImageAlt(featuredimg);

	const featuredImageData = {
		alt: featuredImageAlt,
		width: 850,
		height: 600,
	};

	const featuredImageDecorationConfig = {
		showTopLeft: true,
		showBottomRight: true,
	};

	return (
		<main className="row-start-2 flex flex-col items-center sm:items-start">
			<section className="dp-container mb-2 grid grid-cols-6 gap-8 py-12 lg:mb-10 xl:grid-cols-12 xl:py-20">
				<div className="col-span-6 flex flex-col gap-2 pr-0 xl:pr-20">
					<h1 className="mb-4 text-4xl font-bold text-balance xl:text-7xl">
						{title}
					</h1>
					<h2 className="text-dp-ma-orange mb-8 text-2xl text-balance xl:mb-10 xl:text-4xl">
						{subtitle}
					</h2>
					<div className="relative">
						<div
							className="bg-dp-softer-ma-cream w-full rounded-4xl px-10 py-9 [&>h3]:mb-4 [&>h3]:text-xl xl:[&>h3]:text-3xl [&>p]:mb-4 xl:[&>p]:text-lg [&>ul]:list-disc [&>ul]:pl-5 xl:[&>ul]:[&>li]:text-lg [&>ul>li]:mb-3"
							dangerouslySetInnerHTML={{ __html: content }}
						/>
						<div className="absolute -bottom-8 -left-8 hidden xl:block">
							<Decorations className="h-36 w-36" />
						</div>
					</div>
				</div>
				<div className="col-span-6 flex items-center justify-center">
					<DecoratedImage
						imageSrc={featuredimg}
						imageData={featuredImageData}
						decorationConfig={featuredImageDecorationConfig}
						className="h-full min-h-max w-full xl:max-h-150 xl:min-h-80"
					/>
				</div>
			</section>

			{/** Specials slider section */}
			<SpecialsCarousel />

			{/** Static Images with tag lines */}
			<ImagesGrid boxes={extraboxes || []} />

			{/** CTA */}
			<RedCta />

			{/** Our promise */}
			<OurPromise />
		</main>
	);
};

export default HomePageTemplate;
