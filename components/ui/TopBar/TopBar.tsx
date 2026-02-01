import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { getMenuPages } from '@/helpers/api-connections/pagesData';
import type { NavProps } from '@/types/pages';

import SolidButton from '../SolidButton';
import Indicator from './Indicator';
import MobileNav from './MobileNav';

const TopBar = async () => {
	const menuData: NavProps[] = await getMenuPages();

	return (
		<header className="sticky top-0 z-50 flex h-25 flex-row items-center justify-between">
			<Link href="/">LOGO</Link>
			<nav className="dp-box-design hidden p-1 lg:block">
				<ul className="flex flex-row gap-1">
					{menuData.map((page: NavProps) => (
						<li
							key={page._id}
							className="font-primary-font relative font-semibold uppercase"
						>
							<Link
								href={page.label === 'Home' ? '/' : page.link}
								className={twMerge(
									'bg-dp-dark-green/0 hover:bg-dp-dark-green block rounded-2xl px-5 py-2.5 transition-all hover:text-white',
								)}
							>
								{page.label}
								<Indicator
									itemPath={page.link}
									isHome={page.label === 'Home' ? true : false}
								/>
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="flex flex-row items-center gap-2 md:gap-4 lg:gap-8">
				<SolidButton
					href="/contact-digital-potter"
					label="Let´s Connect"
					classes="order-2 lg:order-1"
					isTopBar={true}
				/>
				<div className="order-1 block lg:hidden">
					<MobileNav navItems={menuData} />
				</div>
			</div>
		</header>
	);
};

export default TopBar;
