import { DoubleChevronDown } from '@/components/icons';

type InternalPagesProps = {
	title: string;
	subtitle?: string;
	anchorText?: string;
	anchorLink?: string;
};

const InternalPagesHero = (props: InternalPagesProps) => {
	const { title, subtitle, anchorText, anchorLink } = props;
	return (
		<section>
			<div className="dp-container text-center">
				<h1 className="mx-auto mb-4 max-w-4xl text-4xl font-bold text-balance lg:text-7xl">
					{title}
				</h1>
				<h2 className="text-dp-ma-orange mx-auto mb-8 max-w-5xl text-2xl text-balance lg:mb-10 lg:text-4xl">
					{subtitle}
				</h2>
				{anchorText && anchorLink && (
					<a href={anchorLink} className="text-dp-ma-red uppercase">
						{anchorText}{' '}
						<DoubleChevronDown className="fill-dp-ma-red inline-block h-4 w-4 animate-bounce" />
					</a>
				)}
			</div>
		</section>
	);
};

export default InternalPagesHero;
