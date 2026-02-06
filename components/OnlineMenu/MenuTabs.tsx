'use client';

import { MouseEvent, useMemo, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { OrderingProvider } from '@/contexts/OrderingProvider';
import { LocationProps } from '@/types/locations';
import { MenuCategoryProps } from '@/types/menus';

import { RightArrow } from '../icons';
import { OnlineMenuSidebar } from '../OnlineMenuSidebar';
import CategoryItems from './CategoryItems';

type Props = {
	categories: MenuCategoryProps[];
	location: LocationProps | null;
};

const MenuTabs = ({ categories, location }: Props) => {
	const defaultCategoryId = categories[0]?._id ?? '';

	const [currentCategoryId, setCurrentCategoryId] = useState(defaultCategoryId);

	const currentCategory = useMemo(
		() => categories.find((cat) => cat._id === currentCategoryId),
		[categories, currentCategoryId],
	);

	const onClick = (e: MouseEvent<HTMLButtonElement>, id: string) => {
		e.preventDefault();

		const menuSection = document.getElementById('online-menu');
		if (menuSection) {
			menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}

		setCurrentCategoryId(id);
	};

	if (!currentCategory) {
		return (
			<div className="text-center">
				No menu categories available at this time.
			</div>
		);
	}

	return (
		<OrderingProvider>
			<div
				id="full-menu"
				className="grid grid-cols-6 gap-12 pt-10 pb-20 lg:grid-cols-12 lg:pb-40"
			>
				<div className="col-start-1 col-end-7 self-start lg:col-end-10">
					{/* Category tabs */}
					<div className="bg-dp-ma-red sticky top-5 z-30 w-full rounded-4xl">
						<button
							type="button"
							aria-label="Scroll categories right"
							className="absolute top-0 right-4 bottom-0 z-30 rounded-full"
							onClick={(e) => {
								const scroller =
									e.currentTarget.parentElement?.querySelector<HTMLDivElement>(
										'.overflow-x-auto',
									);
								scroller?.scrollBy({ left: 240, behavior: 'smooth' });
							}}
						>
							<RightArrow className="fill-dp-softer-ma-cream h-5 w-5 lg:h-6 lg:w-6" />
						</button>
						<div className="from-dp-ma-red/0 to-dp-ma-red pointer-events-none absolute right-0 z-20 h-full w-28 rounded-r-4xl bg-linear-90 from-5% to-70%" />
						<div className="no-scrollbar z-0 flex w-full overflow-x-auto rounded-4xl">
							<ul className="mr-20 flex items-center justify-start rounded-4xl">
								{categories.map((category) => (
									<li key={category._id} className="inline-flex h-full">
										<button
											className={twJoin(
												'font-Croissant hover:bg-dp-softer-ma-cream/10 flex w-max cursor-pointer rounded-4xl px-5 py-3 font-bold transition-all lg:px-9 lg:py-4',
												currentCategoryId === category._id
													? 'bg-dp-highlighter-ma-green text-dp-softer-ma-cream pointer-events-none text-lg lg:text-2xl'
													: 'text-dp-softer-ma-cream mx-2 my-1 text-base lg:text-xl',
											)}
											onClick={(e) => onClick(e, category._id)}
										>
											{category.categoryTitle}
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Category items — instant switch, no loading */}
					<CategoryItems
						catId={currentCategoryId}
						currentCategory={currentCategory}
					/>
				</div>

				{/* Sidebar with location info + current order */}
				<div className="col-span-6 lg:col-span-3">
					<OnlineMenuSidebar location={location} />
				</div>
			</div>
		</OrderingProvider>
	);
};

export default MenuTabs;
