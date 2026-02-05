import { getAllSliders } from '@/helpers/api-connections/pullSlidersData';
import { CtaProps } from '@/types/ctas';

import SolidButton from '../ui/SolidButton';
import Wiggles from '../vectors/Wiggles';

const RedCta = async () => {
	const getCtasData: CtaProps[] = await getAllSliders();

	const redCtaData = getCtasData[0];

	return (
		<section className="bg-dp-ma-red">
			<div className="dp-container flex items-center justify-center">
				<div className="flex max-w-5xl flex-row items-start">
					<Wiggles className="lg:h-3xs h-36 w-36 lg:w-3xs" />
					<div className="mx-2 flex flex-col items-center justify-center text-center lg:mx-10">
						<h3 className="mb-3 text-3xl text-white lg:text-5xl">
							{redCtaData.title}
						</h3>
						<h4 className="text-dp-softer-ma-cream mb-3 text-xl text-balance lg:text-4xl">
							{redCtaData.subtitle}
						</h4>
						<div
							className="mb-7 text-balance text-white"
							dangerouslySetInnerHTML={{ __html: redCtaData.details }}
						/>
						<SolidButton
							label={redCtaData.buttons[0].label}
							href={redCtaData.buttons[0].link}
							classes="bg-white border-white [&>span]:text-dp-highlighter-ma-green hover:bg-dp-softer-ma-cream hover:border-dp-softer-ma-cream hover:[&>svg]:fill-dp-highlighter-ma-green!"
						/>
					</div>
					<Wiggles className="lg:h-3xs h-36 w-36 scale-x-[-1] lg:w-3xs" />
				</div>
			</div>
		</section>
	);
};

export default RedCta;
