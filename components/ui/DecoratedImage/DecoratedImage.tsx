import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import Decorations from '@/components/vectors/Decorations/Decorations';

interface DecoratedImageProps {
	imageSrc: string;
	imageData: {
		alt: string;
		width: number;
		height: number;
	};
	decorationConfig: {
		showTopLeft?: boolean;
		sizeClassesTl?: string;
		showTopRight?: boolean;
		sizeClassesTr?: string;
		showBottomLeft?: boolean;
		sizeClassesBl?: string;
		showBottomRight?: boolean;
		sizeClassesBr?: string;
	};
	className?: string;
}

export const DecoratedImage = (props: DecoratedImageProps) => {
	const { imageSrc, imageData, decorationConfig, className } = props;

	return (
		<div className={twMerge('relative', className)}>
			{decorationConfig.showTopLeft && (
				<div
					className={twMerge(
						'absolute -top-6 -left-6 w-32 rotate-90 xl:-top-14 xl:-left-14 xl:w-72',
						decorationConfig.sizeClassesTl,
					)}
				>
					<Decorations
						style={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			)}
			{decorationConfig.showTopRight && (
				<div
					className={twMerge(
						'absolute -top-6 -right-6 w-32 rotate-180 xl:-top-14 xl:-right-14 xl:w-72',
						decorationConfig.sizeClassesTr,
					)}
				>
					<Decorations
						style={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			)}
			{decorationConfig.showBottomLeft && (
				<div
					className={twMerge(
						'absolute -bottom-6 -left-6 w-32 xl:-bottom-14 xl:-left-14 xl:w-72',
						decorationConfig.sizeClassesBl,
					)}
				>
					<Decorations
						style={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			)}
			{decorationConfig.showBottomRight && (
				<div
					className={twMerge(
						'absolute -right-6 -bottom-6 w-32 rotate-270 xl:-right-14 xl:-bottom-14 xl:w-72',
						decorationConfig.sizeClassesBr,
					)}
				>
					<Decorations
						style={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			)}
			<Image
				src={`${process.env.NEXT_PUBLIC_CMS}/${imageSrc}`}
				alt={imageData.alt}
				width={imageData.width}
				height={imageData.height}
				className="h-full w-full rounded-4xl object-cover"
			/>
		</div>
	);
};

export default DecoratedImage;
