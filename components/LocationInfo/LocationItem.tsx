import { GoogleMapsEmbed } from '@next/third-parties/google';
import Image from 'next/image';

import createImageAlt from '@/helpers/createImageAlt';
import { LocationProps } from '@/types/locations';

import { CalendarClock, LocationPin, MobilePhone } from '../icons';

type LocationItemProps = {
	location: LocationProps;
};

const LocationItem = (props: LocationItemProps) => {
	const { location } = props;

	return (
		<div id={location.link} className="grid grid-cols-6 items-stretch gap-9">
			<div className="relative col-span-6 grid xl:col-span-2">
				<div className="flex h-96 flex-col items-start justify-end lg:h-130">
					<div className="relative block h-full w-full overflow-hidden rounded-4xl">
						<div className="absolute right-5 bottom-7 left-5 z-20 lg:right-10 lg:bottom-10 lg:left-10">
							<h3 className="font-Croissant text-3xl text-balance text-white lg:text-5xl">
								{location.locationName}
							</h3>
						</div>
						<div className="absolute bottom-0 z-10 h-64 w-full -bg-linear-180 from-transparent to-black/80" />
						<Image
							src={`${process.env.NEXT_PUBLIC_CMS}/${location.featuredImg.fullSize}`}
							alt={createImageAlt(location.featuredImg.fullSize)}
							width={500}
							height={520}
							className="z-0 h-full w-full object-cover object-center"
						/>
					</div>
				</div>
			</div>
			<div className="col-span-6 overflow-hidden rounded-4xl object-cover md:col-span-3 xl:col-span-2">
				<GoogleMapsEmbed
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
					height={520}
					width={'100%'}
					mode="place"
					q={location.address.replace(/ /g, '+').replace(/,/g, '')}
				/>
			</div>
			<div className="col-span-6 flex h-full flex-col gap-8 md:col-span-3 xl:col-span-2">
				<h4 className="text-dp-ma-orange text-3xl lg:text-5xl">
					Location and Schedule
				</h4>
				<div className="flex items-start justify-start gap-4 pl-5 lg:gap-10">
					<LocationPin className="fill-dp-ma-orange w-6" />
					<p className="text-dp-ma-red flex-1 text-xl font-bold text-balance lg:text-2xl">
						{location.address}
					</p>
				</div>
				<div className="flex items-start justify-start gap-4 pl-5 lg:gap-10">
					<MobilePhone className="fill-dp-ma-orange w-4.5" />
					<p className="text-dp-ma-red flex-1 text-2xl font-bold text-balance lg:text-4xl">
						<a href={`tel:${location.phones[0].phone}`}>
							{location.phones[0].phone}
						</a>
					</p>
				</div>
				<div className="flex items-start justify-start gap-4 pl-5 lg:gap-10">
					<CalendarClock className="fill-dp-ma-orange w-8" />
					<div
						className="text-dp-ma-red flex-1 font-bold text-balance [&>p]:text-lg [&>p]:leading-10 lg:[&>p]:text-2xl"
						dangerouslySetInnerHTML={{ __html: location.schedule }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default LocationItem;
