import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { PhoneIcon } from '@/components/icons';
import MilAmoresMainLogo from '@/components/vectors/MilAmoresMainLogo';
import { resolveMenuItemHref } from '@/helpers/cms/links';
import type {
	NavigationResponse,
	StoreSettingsRecord,
} from '@/helpers/cms/types';

import SolidButton from '../SolidButton';
import Indicator from './Indicator';
import MobileNav, { type RenderedNavItem } from './MobileNav';

interface TopBarProps {
	headerNav: NavigationResponse;
	siteStructure?: StoreSettingsRecord['siteStructure'];
}

const TopBar = (props: TopBarProps) => {
	const { headerNav, siteStructure } = props;

	const menusBySlug = new Map(headerNav.menus.map((m) => [m.slug, m]));
	const leftMenu = menusBySlug.get('left-menu') ?? headerNav.menus[0];
	const rightMenu =
		menusBySlug.get('right-menu') ??
		headerNav.menus.find((m) => m._id !== leftMenu?._id);

	const leftItems: RenderedNavItem[] = (leftMenu?.items ?? []).map((item) => {
		const href = resolveMenuItemHref(item, siteStructure);
		return {
			id: item._id,
			label: item.label,
			href,
			isHome: href === '/',
		};
	});

	const ctaItem = rightMenu?.items?.[0];
	const ctaHref = ctaItem
		? resolveMenuItemHref(ctaItem, siteStructure)
		: '/our-menu';
	const ctaLabel = ctaItem?.label ?? 'Our Menu';

	const mobileItems: RenderedNavItem[] = ctaItem
		? [
				...leftItems,
				{
					id: ctaItem._id,
					label: ctaLabel,
					href: ctaHref,
					isHome: ctaHref === '/',
				},
			]
		: leftItems;

	return (
		<header className="bg-dp-softer-ma-cream z-50">
			<div className="dp-container flex h-36 flex-row items-center justify-between xl:h-52">
				<Link href="/">
					<MilAmoresMainLogo
						width={'100%'}
						height={'100%'}
						className="h-24 w-38 xl:h-42.5 xl:w-72"
					/>
				</Link>
				<div className="flex flex-row items-center">
					<div className="mr-10 hidden flex-row items-center justify-between gap-2 xl:flex">
						<PhoneIcon width={45} height={45} className="fill-dp-ma-red" />
						<a
							href="tel:7578085269"
							className="text-dp-ma-red hover:text-dp-ma-orange flex flex-col transition-all"
						>
							<span className="text-small font-light">Place your order</span>
							<span className="text-2xl font-bold">(757) 808-5269</span>
						</a>
					</div>
					<nav className="dp-box-design mr-7 hidden p-1 xl:block">
						<ul className="flex flex-row gap-1">
							{leftItems.map((item) => (
								<li
									key={item.id}
									className="font-Croissant relative text-2xl font-semibold"
								>
									<Link
										href={item.href}
										className={twMerge(
											'text-dp-ma-orange hover:text-dp-ma-red block rounded-2xl bg-black/0 px-5 py-2.5 transition-all hover:bg-black/5',
										)}
									>
										{item.label}
										<Indicator itemHref={item.href} isHome={item.isHome} />
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex flex-row items-center gap-2 md:gap-4 xl:gap-8">
						<SolidButton
							href={ctaHref}
							label={ctaLabel}
							classes="order-2 xl:order-1"
							isTopBar={true}
							alwaysIcon={true}
						/>
						<div className="order-1 block xl:hidden">
							{mobileItems.length > 0 && <MobileNav navItems={mobileItems} />}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default TopBar;
