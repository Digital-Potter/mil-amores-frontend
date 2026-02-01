import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { PhoneIcon } from '@/components/icons';
import MilAmoresMainLogo from '@/components/vectors/MilAmoresMainLogo';
import { getMenuPages } from '@/helpers/api-connections/pagesData';
import type { NavProps } from '@/types/pages';

import SolidButton from '../SolidButton';
import Indicator from './Indicator';
import MobileNav from './MobileNav';

const TopBar = async () => {
	const menuData: NavProps[] = await getMenuPages();

	const featuredItem = menuData.find((el) => el.label.includes('Menu')) || {
		label: 'Menu',
		link: '/our-menu',
	};
	const menuItems = menuData.filter(
		(el) => !el.label.includes(featuredItem?.label as string),
	);

	return (
		<header className="bg-dp-softer-ma-cream z-50">
			<div className="dp-container flex h-36 flex-row items-center justify-between lg:h-52">
				<Link href="/">
					<MilAmoresMainLogo
						width={'100%'}
						height={'100%'}
						className="h-24 w-38 lg:h-42.5 lg:w-72"
					/>
				</Link>
				<div className="flex flex-row items-center">
					<div className="mr-10 hidden flex-row items-center justify-between gap-2 lg:flex">
						<PhoneIcon width={45} height={45} className="fill-dp-ma-red" />
						<a
							href="tel:7578085269"
							className="text-dp-ma-red hover:text-dp-ma-orange flex flex-col transition-all"
						>
							<span className="text-small font-light">Place your order</span>
							<span className="text-2xl font-bold">(757) 808-5269</span>
						</a>
					</div>
					<nav className="dp-box-design mr-7 hidden p-1 lg:block">
						<ul className="flex flex-row gap-1">
							{menuItems.map((page: NavProps) => (
								<li
									key={page._id}
									className="font-primary-font relative text-2xl font-semibold"
								>
									<Link
										href={page.label === 'Home' ? '/' : page.link}
										className={twMerge(
											'text-dp-ma-orange hover:text-dp-ma-red block rounded-2xl bg-black/0 px-5 py-2.5 transition-all hover:bg-black/5',
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
							href={featuredItem.link}
							label={featuredItem.label}
							classes="order-2 lg:order-1"
							isTopBar={true}
							alwaysIcon={true}
						/>
						<div className="order-1 block lg:hidden">
							{menuData.length > 0 && <MobileNav navItems={menuData} />}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default TopBar;
