export interface Ctas {
	error?: string;
	loading?: boolean;
	msg: string;
	slider: CtaProps;
	sliders: CtaProps[];
}

export interface CtaProps {
	isLive: boolean;
	order: number;
	title: string;
	subtitle: string;
	details: string;
	featuredimg: string;
	buttons: CtaButtons[];
}

export interface CtaButtons {
	label: string;
	link: string;
	position: number;
	primary: boolean;
}
