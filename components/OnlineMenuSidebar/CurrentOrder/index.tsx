'use client';

import { useContext, useMemo } from 'react';

import { OrderingContext } from '@/contexts/OrderingProvider';

type Props = {
	phone?: string;
};

const CurrentOrder = ({ phone }: Props) => {
	const { items, totalItems, setCurrentOrder } = useContext(OrderingContext);

	/** Derive order total from items — no mutable variable needed */
	const orderTotal = useMemo(
		() => items.reduce((acc, item) => acc + item.quantity * item.price, 0),
		[items],
	);

	const onRemove = (name: string, option: string) => {
		setCurrentOrder(
			items.filter((item) => !(item.name === name && item.option === option)),
		);
	};

	if (totalItems === 0) return null;

	return (
		<div className="px-8 py-7">
			<p className="mb-9 text-center text-balance">
				Review the list of items you have chosen and the location you want to
				call:
			</p>
			<ul className="mb-10 lg:mb-18">
				{items.map((item) => (
					<li
						key={`${item.name}-${item.option}`}
						className="mb-4 flex items-start justify-between"
					>
						<p className="w-9">{item.quantity}x</p>
						<p className="flex-1">
							{item.name}
							<br />
							<small className="text-dp-highlighter-ma-green/70">
								{item.option}
							</small>
						</p>
						<p>${(item.quantity * item.price).toFixed(2)}</p>
						<button
							className="text-dp-ma-red ml-2 flex font-bold"
							onClick={() => onRemove(item.name, item.option)}
							aria-label={`Remove ${item.name} ${item.option}`}
						>
							×
						</button>
					</li>
				))}
			</ul>
			<div className="border-dp-highlighter-ma-green/20 flex justify-between border-t pt-5">
				<p className="text-lg">
					Estimated Total
					<br />
					<small>(without taxes)</small>
				</p>
				<p className="text-xl font-bold">${orderTotal.toFixed(2)}</p>
			</div>

			{phone && (
				<div className="mt-7 text-center">
					<p className="text-dp-ma-red mb-2 text-sm font-semibold">
						Call to order
					</p>
					<a
						href={`tel:${phone}`}
						className="text-dp-highlighter-ma-green text-xl font-bold"
					>
						{phone}
					</a>
				</div>
			)}
		</div>
	);
};

export default CurrentOrder;
