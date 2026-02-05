import { pullSpecialsData } from '@/helpers/api-connections/pullSpecialsData';

import CarouselSetup from './CarouselSetup';

const SpecialsCarousel = async () => {
	const specials = await pullSpecialsData();

	return <CarouselSetup specials={specials} />;
};

export default SpecialsCarousel;
