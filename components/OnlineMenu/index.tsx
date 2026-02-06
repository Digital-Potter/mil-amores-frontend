import { Suspense } from 'react';

import { pullLocationsData } from '@/helpers/api-connections/pullLocationsData';
import { pullMenuCatsData } from '@/helpers/api-connections/pullMenuCatsData';
import { LocationProps } from '@/types/locations';
import { MenuCategoryProps } from '@/types/menus';

import MenuSkeleton from './MenuSkeleton';
import MenuTabs from './MenuTabs';

/**
 * Async server component that fetches menu categories and location data
 * in parallel, then passes pre-sorted/filtered data to the client.
 */
const OnlineMenuContent = async () => {
	const [categories, locations] = await Promise.all([
		pullMenuCatsData() as Promise<MenuCategoryProps[]>,
		pullLocationsData() as Promise<LocationProps[]>,
	]);

	const sortedCategories = categories
		.filter((cat) => cat.isLive && cat.items.length > 0)
		.sort((a, b) => a.position - b.position);

	const primaryLocation = locations?.[0] ?? null;

	if (sortedCategories.length === 0) {
		return (
			<p className="py-10 text-center">
				No menu categories available at this time.
			</p>
		);
	}

	return <MenuTabs categories={sortedCategories} location={primaryLocation} />;
};

/**
 * Non-async wrapper that renders the intro text immediately
 * and streams the menu content via Suspense.
 */
const OnlineMenu = () => {
	return (
		<section id="online-menu">
			<div className="dp-container py-10">
				<p className="mx-auto mb-3 max-w-5xl text-center">
					Our menu is for phone ordering only at this time. Please choose all
					the items you want and a list will be compiled for you to make your
					ordering experience easier.
				</p>
				<p className="mx-auto mb-7 max-w-5xl text-center">
					Please Call Us When Ready!
				</p>
				<Suspense fallback={<MenuSkeleton />}>
					<OnlineMenuContent />
				</Suspense>
			</div>
		</section>
	);
};

export default OnlineMenu;
