import createImageAlt from '@/helpers/createImageAlt';

import DecoratedImage from '../ui/DecoratedImage';

type ContentWithImageProps = {
	content: string;
	featuredimg: string;
};

const ContentWithImage = (props: ContentWithImageProps) => {
	const { content, featuredimg } = props;

	const altText = createImageAlt(featuredimg);

	const featuredImageData = {
		alt: altText,
		width: 850,
		height: 500,
	};

	const featuredImageDecorationConfig = {
		showTopRight: true,
		showBottomLeft: true,
	};
	return (
		<section>
			<div className="dp-container bg-dp-softer-ma-cream grid grid-cols-6 gap-8 rounded-4xl lg:grid-cols-12">
				<div className="col-span-6 flex flex-col items-center justify-center gap-2 pr-0 lg:pr-20">
					<div className="relative py-10">
						<div
							className="[&>h3]:text-dp-ma-orange w-full px-10 py-9 [&>h3]:mb-4 [&>h3]:text-xl lg:[&>h3]:text-4xl [&>p]:mb-4 lg:[&>p]:text-lg [&>ul]:list-disc [&>ul]:pl-5 lg:[&>ul]:[&>li]:text-lg [&>ul>li]:mb-3"
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</div>
				</div>
				<div className="col-span-6 -mt-10 -mb-10 flex items-center justify-center">
					<DecoratedImage
						imageSrc={featuredimg}
						imageData={featuredImageData}
						decorationConfig={featuredImageDecorationConfig}
						className="h-full max-h-112 min-h-full w-full"
					/>
				</div>
			</div>
		</section>
	);
};

export default ContentWithImage;
