import DecoratedImage from '@/components/ui/DecoratedImage';
import Decorations from '@/components/vectors/Decorations';
import createImageAlt from '@/helpers/createImageAlt';
import { PageProps } from '@/types/pages';

const AboutTemplate = (props: PageProps) => {
	const { featuredimg, title, subtitle, content } = props;

	const featuredImageAlt = createImageAlt(featuredimg);

	const featuredImageData = {
		alt: featuredImageAlt,
		width: 850,
		height: 600,
	};

	const featuredImageDecorationConfig = {
		showTopLeft: true,
		tlSize: 290,
		showBottomRight: true,
		brSize: 290,
	};

	return (
		<section className="dp-container grid grid-cols-6 gap-8 py-12 lg:grid-cols-12 lg:py-20">
			<div className="col-span-6 flex flex-col gap-2 pr-0 lg:pr-20">
				<h1 className="mb-4 text-4xl font-bold text-balance lg:text-7xl">
					{title}
				</h1>
				<h2 className="text-dp-ma-orange mb-8 text-2xl text-balance lg:mb-10 lg:text-4xl">
					{subtitle}
				</h2>
				<div className="relative">
					<div
						className="bg-dp-softer-ma-cream w-full rounded-4xl px-10 py-9 [&>h3]:mb-4 [&>h3]:text-xl lg:[&>h3]:text-3xl [&>p]:mb-4 lg:[&>p]:text-lg [&>ul]:list-disc [&>ul]:pl-5 lg:[&>ul]:[&>li]:text-lg [&>ul>li]:mb-3"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
					<div className="absolute -bottom-8 -left-8 hidden lg:block">
						<Decorations className="h-36 w-36" />
					</div>
				</div>
			</div>
			<div className="col-span-6 flex items-center justify-center">
				<DecoratedImage
					imageSrc={featuredimg}
					imageData={featuredImageData}
					decorationConfig={featuredImageDecorationConfig}
					className="h-full min-h-max w-full lg:min-h-150"
				/>
			</div>
		</section>
	);
};

export default AboutTemplate;
