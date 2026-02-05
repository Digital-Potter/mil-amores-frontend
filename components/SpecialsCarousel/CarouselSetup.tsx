'use client';

import { useEffect, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import createImageAlt from '@/helpers/createImageAlt';
import { SpecialProps } from '@/types/specials';

import DecoratedImage from '../ui/DecoratedImage';
import HotPepper from '../vectors/HotPepper';

interface CarouselSetupProps {
	specials: SpecialProps[];
}

const CarouselSetup = ({ specials }: CarouselSetupProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const imageDecorationConfig = {
		showTopLeft: true,
		showBottomRight: true,
		sizeClassesTl: '-left-5 xl:-left-8 -top-5 xl:-top-8 w-20 xl:w-40',
		sizeClassesBr: '-right-5 xl:-right-8 -bottom-5 xl:-bottom-8 w-20 xl:w-40',
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % specials.length);
		}, 10000); // Change slide every 10 second

		return () => clearInterval(interval);
	}, [specials.length]);

	return (
		<section className={twMerge('bg-dp-softer-ma-cream mt-10 mb-10 pb-10')}>
			<div className="dp-container grid grid-cols-6 lg:grid-cols-12">
				{specials
					.sort((a, b) => a.position - b.position)
					.map((special, index) => (
						<div
							key={special._id}
							className={twJoin(
								'col-start-1 col-end-7 row-start-1 transition-opacity duration-1000 lg:col-end-13',
								index === currentSlide && 'z-10 opacity-100',
								index !== currentSlide && 'z-0 opacity-0',
							)}
						>
							<div className="grid grid-cols-6 gap-9 lg:grid-cols-12">
								<div className="order-1 col-span-6 flex h-full flex-col justify-between lg:col-span-4">
									<div className="text-dp-ma-orange mb-10 flex flex-row items-center justify-start gap-3">
										<HotPepper className="h-11 w-10 lg:h-16 lg:w-16" />
										<span className="font-Croissant ml-2 text-xl lg:text-3xl">
											Spicy Stuff
										</span>
									</div>
									<div className="mb-10 flex flex-col">
										<h3 className="text-4xl font-bold text-balance lg:text-7xl">
											{special.title}
										</h3>
									</div>
									<div className="z-20 flex flex-row items-center gap-3.5">
										{specials.map((_, dotIndex) => (
											<button
												key={dotIndex}
												className={twMerge(
													'cursor-pointer rounded-full',
													dotIndex === currentSlide
														? 'bg-dp-highlighter-ma-green h-5 w-5'
														: 'h-3 w-3 bg-gray-300',
												)}
												onClick={() => setCurrentSlide(dotIndex)}
											/>
										))}
									</div>
								</div>
								<div className="order-3 col-span-6 lg:order-2 lg:col-span-4">
									{special.featuredImage && (
										<DecoratedImage
											imageSrc={`${special.featuredImage.fullSize}`}
											imageData={{
												alt: createImageAlt(special.featuredImage.fullSize),
												width: 500,
												height: 448,
											}}
											decorationConfig={imageDecorationConfig}
											className="-mb-10 h-80 lg:-mt-32 lg:mb-0 xl:h-112"
										/>
									)}
								</div>
								<div className="order-2 col-span-6 flex flex-col justify-between lg:order-3 lg:col-span-4">
									<div className="flex flex-col gap-7 lg:ml-10">
										<h4 className="text-2xl text-balance lg:text-3xl">
											{special.subtitle}
										</h4>
										<div
											className={twMerge(
												'prose text-dp-dark-ma-brown lg:prose-lg max-w-none text-base font-bold text-balance [&>p]:lg:text-2xl',
											)}
											dangerouslySetInnerHTML={{ __html: special.description }}
										/>
									</div>
									<span className="mt-4 text-xs lg:ml-10 lg:text-sm">
										{special.disclaimer}
									</span>
								</div>
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default CarouselSetup;
