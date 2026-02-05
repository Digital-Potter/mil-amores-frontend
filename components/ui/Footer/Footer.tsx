import Link from 'next/link';

import MilAmoresTextLogo from '@/components/vectors/MilAmoresTextLogo';
import { getMenuPages } from '@/helpers/api-connections/pagesData';
import { NavProps } from '@/types/pages';

const Footer = async () => {
	const menuData: NavProps[] = await getMenuPages();

	return (
		<footer className="dp-container grid grid-cols-6 gap-9 py-14 lg:grid-cols-12 lg:py-16">
			<div className="col-span-6 flex items-center justify-center gap-9 lg:col-span-3">
				<MilAmoresTextLogo className="h-18 w-48 lg:h-28 lg:w-96" />
			</div>
			<div className="col-span-6 flex flex-col items-center justify-center">
				<nav className="bg-dp-softer-ma-cream mx-auto h-max w-max rounded-4xl py-2">
					<ul className="flex flex-row items-center justify-center gap-1 px-2">
						{menuData.map((el) => (
							<li key={el._id}>
								<Link
									href={el.link}
									className="font-Croissant hover:bg-dp-highlighter-ma-green/10 block h-full rounded-4xl bg-amber-50/0 px-4 py-3 text-base transition-all lg:text-xl"
								>
									{el.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<p className="mt-3 text-xs lg:text-sm">
					Created and Powered by{' '}
					<a
						href="https://digitalpotter.io"
						target="_blank"
						rel="noreferrer"
						className="font-semibold"
					>
						Digital Potter, LLC
					</a>
				</p>
			</div>
			<div className="col-span-6 flex flex-col items-center lg:col-span-3 lg:items-start">
				<h6 className="text-dp-ma-orange mb-2.5 text-center text-xl">
					Location Info
				</h6>
				<p className="text-dp-ma-red mb-1.5 text-center text-xl font-bold lg:text-left">
					747 Scotland St
					<br />
					Williamsburg VA 23185
				</p>
				<p className="text-dp-ma-red text-center text-base font-light lg:text-left">
					Monday-Thursday 11am-8pm
					<br />
					Friday:11am-10pm
					<br />
					Saturday: 12pm-12am
					<br />
					Sunday Closed
				</p>
			</div>
		</footer>
	);
};

export default Footer;
