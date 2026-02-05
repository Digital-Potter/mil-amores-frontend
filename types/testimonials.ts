export interface TestimonialsProps {
	error?: string;
	loading?: boolean;
	msg: string;
	testimonial: TestimonialProps;
	testimonials: TestimonialProps[];
}

export interface TestimonialProps {
	_id: string;
	isLive: boolean;
	order: number;
	details: string;
	picture: string;
	rating: number;
	source: string;
	author: string;
	company: string;
	worktitle: string;
}
