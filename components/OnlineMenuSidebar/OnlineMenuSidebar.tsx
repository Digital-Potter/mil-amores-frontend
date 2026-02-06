'use client';

import { GoogleMapsEmbed } from '@next/third-parties/google';

import { LocationProps } from '@/types/locations';

import CurrentOrder from './CurrentOrder';

type Props = {
	location: LocationProps | null;
};

const OnlineMenuSidebar = ({ location }: Props) => {
	const phone = location?.phones?.[0]?.phone;

	return (
		<aside className="bg-dp-softer-ma-cream sticky top-5 overflow-hidden rounded-2xl">
			{location ? (
				<div className="relative pb-5 lg:pb-20">
					<div className="relative z-10 overflow-hidden rounded-3xl">
						<GoogleMapsEmbed
							apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
							height="250"
							width="100%"
							mode="place"
							q={location.address.replace(/ /g, '+').replace(/,/g, '')}
						/>
					</div>
					<div className="no-scrollbar lg:h-max lg:max-h-[calc(100vh-30vh)] lg:overflow-y-scroll">
						<div className="px-8 py-7">
							<h5 className="text-dp-ma-orange mb-3 text-center text-2xl lg:text-4xl">
								Mil Amores Taqueria
							</h5>
							<h6 className="text-dp-ma-orange mb-10 text-center text-balance">
								{location.locationName}
							</h6>
							<p className="mb-5 text-center font-bold text-balance">
								{location.address}
							</p>
							{phone && (
								<a
									href={`tel:${phone}`}
									className="mx-auto mb-5 flex w-max text-center text-xl font-bold lg:text-base xl:text-2xl"
								>
									{phone}
								</a>
							)}
						</div>
						<CurrentOrder phone={phone} />
					</div>
				</div>
			) : (
				<div className="px-8 py-7 text-center text-balance">
					<p className="mb-7">
						You can find the information of our store in About Us
					</p>
					<CurrentOrder />
				</div>
			)}
		</aside>
	);
};

export default OnlineMenuSidebar;
