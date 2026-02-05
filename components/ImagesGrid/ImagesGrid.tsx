import Image from 'next/image';
import Link from 'next/link';

import { ExtraBoxesProps } from '@/types/pages';

type ImagesGridProps = {
	boxes: ExtraBoxesProps[];
};

const ImagesGrid = (props: ImagesGridProps) => {
	const { boxes } = props;

	if (!boxes || boxes.length === 0) {
		return null; // Don't render the grid if there are no boxes
	}

	const cardOne = boxes.filter((box) => box.eposition === 1)[0];
	const cardTwo = boxes.filter((box) => box.eposition === 2)[0];
	const cardThree = boxes.filter((box) => box.eposition === 3)[0];

	return (
		<div className="dp-container py-7 lg:py-2">
			<div className="grid grid-cols-6 items-center gap-9 lg:grid-cols-12">
				<div className="col-span-6 h-96 lg:h-137.5">
					<Link
						href={cardOne.esubtitle || '/our-menu'}
						className="relative block h-full w-full overflow-hidden rounded-4xl"
					>
						<div className="absolute right-5 bottom-7 left-5 z-20 lg:right-10 lg:bottom-10 lg:left-10">
							<p className="font-Croissant text-3xl text-balance text-white lg:text-5xl">
								{cardOne.etitle}
							</p>
						</div>
						<div className="absolute bottom-0 z-10 h-64 w-full -bg-linear-180 from-transparent to-black/80" />
						<Image
							src={`${process.env.NEXT_PUBLIC_CMS}/${cardOne.eimg}`}
							alt={cardOne.econtent}
							fill
							className="z-0 object-cover object-center"
						/>
					</Link>
				</div>
				<div className="col-span-6 h-80 lg:col-span-3 lg:h-120">
					<Link
						href={cardTwo.esubtitle || '/our-menu'}
						className="relative block h-full w-full overflow-hidden rounded-4xl"
					>
						<div className="absolute right-5 bottom-7 left-5 z-20 lg:right-10 lg:bottom-10 lg:left-10">
							<p className="font-Croissant text-3xl text-balance text-white lg:text-5xl">
								{cardTwo.etitle}
							</p>
						</div>
						<div className="absolute bottom-0 z-10 h-64 w-full -bg-linear-180 from-transparent to-black/80" />
						<Image
							src={`${process.env.NEXT_PUBLIC_CMS}/${cardTwo.eimg}`}
							alt={cardTwo.econtent}
							fill
							className="z-0 object-cover object-center"
						/>
					</Link>
				</div>
				<div className="col-span-6 h-80 lg:col-span-3 lg:h-120">
					<Link
						href={cardThree.esubtitle || '/our-menu'}
						className="relative block h-full w-full overflow-hidden rounded-4xl"
					>
						<div className="absolute right-5 bottom-7 left-5 z-20 lg:right-10 lg:bottom-10 lg:left-10">
							<p className="font-Croissant text-3xl text-balance text-white lg:text-5xl">
								{cardThree.etitle}
							</p>
						</div>
						<div className="absolute bottom-0 z-10 h-64 w-full -bg-linear-180 from-transparent to-black/80" />
						<Image
							src={`${process.env.NEXT_PUBLIC_CMS}/${cardThree.eimg}`}
							alt={cardThree.econtent}
							fill
							className="z-0 object-cover object-center"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ImagesGrid;
