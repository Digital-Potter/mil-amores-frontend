import { allImages } from './images';

export interface Locations {
	error?: string;
	loading?: boolean;
	msg: string;
	location: LocationProps;
	locations: LocationProps[];
}

export interface LocationProps {
	_id: string;
	isLive: boolean;
	position: number;
	locationName: string;
	seoTitle: string;
	link: string;
	address: string;
	phones: PhoneNumber[];
	schedule: string;
	featuredImg: allImages;
	gallery: allImages[];
}

export interface PhoneNumber {
	phone: string;
	primary: boolean;
}
