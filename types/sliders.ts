export interface Sliders {
	error?: string;
	loading?: boolean;
	msg: string;
	slider: SliderProps;
	sliders: SliderProps[];
}

export interface SliderProps {
	isLive: boolean;
	order: number;
	title: string;
	subtitle: string;
	details: string;
	featuredimg: string;
	buttons: SliderCtas[];
}

export interface SliderCtas {
	label: string;
	link: string;
	position: number;
	primary: boolean;
}
