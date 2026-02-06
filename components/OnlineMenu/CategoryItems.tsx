'use client';

import Image from 'next/image';
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';

import { MenuItemProps, OrderingContext } from '@/contexts/OrderingProvider';
import { pullMenuCatById } from '@/helpers/api-connections/pullMenuCatsData';
import createImageAlt from '@/helpers/createImageAlt';
import { Features, MenuCategoryProps, MenuItem } from '@/types/menus';

import SemiTransparentLogo from '../vectors/SemiTransparentLogo';

type CategoryItemsProps = {
	catId: string;
	currentCategory: MenuCategoryProps;
};

const createItemKey = (title: string, optionTitle: string) =>
	`${title.replaceAll(' ', '-')}-${optionTitle.replaceAll(' ', '-')}`;

const CategoryItems = ({ catId, currentCategory }: CategoryItemsProps) => {
	const { items: orderItems, setCurrentOrder } = useContext(OrderingContext);

	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		const getItems = async () => {
			const res = await pullMenuCatById(catId);

			if (res) {
				setMenuItems(res.items);
			}
		};

		getItems();
	}, [catId]);

	/** Filter and sort once per items change */
	const sortedItems = useMemo(
		() =>
			menuItems
				.filter((item) => item.isLive)
				.sort((a, b) => a.position - b.position),
		[menuItems],
	);

	/** Pre-compute keys for all item options to avoid repeated string operations */
	const itemKeys = useMemo(() => {
		const map: Record<string, string> = {};
		for (const item of sortedItems) {
			for (const option of item.options) {
				map[`${item._id}-${option._id}`] = createItemKey(
					item.title,
					option.optionTitle,
				);
			}
		}
		return map;
	}, [sortedItems]);

	/** Deduplicate feature labels across all visible items */
	const featuresLabels = useMemo(() => {
		const seen = new Set<string>();
		const labels: Features[] = [];

		for (const item of sortedItems) {
			for (const feature of item.features) {
				if (!seen.has(feature.label)) {
					seen.add(feature.label);
					labels.push(feature);
				}
			}
		}

		return labels;
	}, [sortedItems]);

	/** Map of "itemTitle-optionTitle" → quantity string, derived from order context */
	const itemsOptionsQty = useMemo(() => {
		const map: Record<string, string> = {};

		for (const item of sortedItems) {
			for (const option of item.options) {
				const key = `${item.title.replaceAll(' ', '-')}-${option.optionTitle.replaceAll(' ', '-')}`;
				const existing = orderItems.find(
					(el) => el.option === option.optionTitle && el.name === item.title,
				);
				map[key] = existing ? existing.quantity.toString() : '0';
			}
		}

		return map;
	}, [orderItems, sortedItems]);

	const onChange = (
		e: ChangeEvent<HTMLInputElement>,
		itemName: string,
		itemOption: string,
		optionPrice: number,
	) => {
		e.preventDefault();

		const quantity = parseInt(e.target.value, 10);
		const currentItem: MenuItemProps = {
			name: itemName,
			option: itemOption,
			price: optionPrice,
			quantity,
		};

		const otherItems = orderItems.filter(
			(item) => !(item.name === itemName && item.option === itemOption),
		);

		if (quantity === 0) {
			setCurrentOrder(otherItems);
		} else {
			setCurrentOrder([...otherItems, currentItem]);
		}
	};

	if (sortedItems.length === 0) return null;

	return (
		<>
			{currentCategory && (
				<div className="bg-dp-softer-ma-cream -mt-15 flex flex-row items-center gap-9 rounded-4xl px-4 pt-17 pb-3 lg:px-7">
					<div className="max-h-64 w-1/2 max-w-137.5 lg:w-1/3">
						{!currentCategory.featuredImage.fullSize.includes('placeholder') ? (
							<Image
								src={`${process.env.NEXT_PUBLIC_CMS}/${currentCategory.featuredImage.fullSize}`}
								alt={currentCategory.categoryTitle}
								width={500}
								height={385}
								className="max-h-64 min-h-full min-w-full overflow-hidden rounded-4xl object-cover"
							/>
						) : (
							<div className="bg-dp-ma-red flex h-full min-h-48 w-full items-center justify-center rounded-4xl">
								<SemiTransparentLogo className="max-w-1/2" />
							</div>
						)}
					</div>
					<div
						className="py-12"
						dangerouslySetInnerHTML={{
							__html: currentCategory.categoryDescription,
						}}
					/>
				</div>
			)}

			{featuresLabels.length > 0 && (
				<div className="mb-7 flex flex-wrap gap-2">
					{featuresLabels.map((feature) => (
						<div
							key={feature._id}
							className="bg-dp-highlighter-ma-green text-dp-softer-ma-cream rounded-lg px-2 py-1 text-[0.625rem]"
						>
							({feature.label}) – {feature.description}
						</div>
					))}
				</div>
			)}

			<ul>
				{sortedItems.map((item) => (
					<li
						key={item._id}
						className="border-dp-highlighter-ma-green/10 flex flex-col items-start justify-center gap-6 border-b py-7 md:flex-row"
					>
						{/* Item image */}
						<div className="relative min-h-48 w-full overflow-hidden rounded-xl md:w-1/4">
							{!item.featuredImg?.fullSize.includes('placeholder') ? (
								<Image
									src={`${process.env.NEXT_PUBLIC_CMS}/${item.featuredImg?.fullSize}`}
									alt={createImageAlt(item.featuredImg.fullSize)}
									fill
									sizes="(max-width: 768px) 100vw, 33vw"
									className="object-cover"
								/>
							) : (
								<div className="bg-dp-ma-red flex h-full min-h-48 w-full items-center justify-center">
									<SemiTransparentLogo className="max-w-1/2" />
								</div>
							)}
						</div>

						{/* Item details */}
						<div className="w-full md:w-3/4">
							<h4 className="mb-3 text-2xl text-balance lg:text-4xl">
								{item.title}{' '}
								{item.features.length > 0 &&
									item.features.map((feature) => (
										<span
											key={feature._id}
											className="font-Poppins text-[0.625rem] font-light"
										>
											({feature.label})
										</span>
									))}
							</h4>

							{item.subtitle && (
								<p className="mb-5 text-balance">{item.subtitle}</p>
							)}

							{!item.description.includes('<p>-</p>') && (
								<div dangerouslySetInnerHTML={{ __html: item.description }} />
							)}

							<div className="flex w-full flex-col flex-wrap py-5 md:flex-row">
								{item.options.map((option) => (
									<div
										key={option._id}
										className="flex items-center justify-between gap-4 py-3 pr-7 md:w-1/2 md:justify-center lg:w-1/3"
									>
										<div className="flex w-max flex-col">
											<p className="text-sm leading-tight">
												{option.optionTitle !== 'Dish'
													? option.optionTitle
													: ''}
											</p>
											{option.optionSubtitle !== '-' && (
												<p className="text-dp-ma-orange max-w-24 text-[0.65rem] lg:max-w-32">
													{option.optionSubtitle}
												</p>
											)}
										</div>
										<div className="bg-dp-highlighter-ma-green/20 block h-px flex-1" />
										<p className="flex w-max items-center text-xl">
											<span className="text-sm font-extralight">$</span>
											{option.price}
											<input
												type="number"
												id={itemKeys[`${item._id}-${option._id}`]}
												name={itemKeys[`${item._id}-${option._id}`]}
												value={
													itemsOptionsQty[
														itemKeys[`${item._id}-${option._id}`]
													] ?? '0'
												}
												className="border-dp-highlighter-ma-green text-dp-highlighter-ma-green ml-2 w-12 rounded-lg border bg-white/0 text-center"
												min="0"
												max="100"
												onChange={(e) =>
													onChange(
														e,
														item.title,
														option.optionTitle,
														option.price,
													)
												}
											/>
										</p>
									</div>
								))}
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default CategoryItems;
