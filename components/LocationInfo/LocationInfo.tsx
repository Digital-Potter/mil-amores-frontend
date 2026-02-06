import { pullLocationsData } from '@/helpers/api-connections/pullLocationsData';
import { LocationProps } from '@/types/locations';

import LocationItem from './LocationItem';

const LocationInfo = async () => {
	const locations: LocationProps[] = await pullLocationsData();

	return (
		<section id="location-info">
			<div className="dp-container">
				{locations.map(
					(location: LocationProps) =>
						location.isLive && (
							<LocationItem key={location._id} location={location} />
						),
				)}
			</div>
		</section>
	);
};

export default LocationInfo;
