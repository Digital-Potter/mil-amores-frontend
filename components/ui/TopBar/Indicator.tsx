'use client';

import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type IndicatorProps = {
	itemHref: string;
	isHome: boolean;
};

const Indicator = (props: IndicatorProps) => {
	const { itemHref, isHome } = props;

	const pathName = usePathname();

	const isActive =
		(isHome && pathName === '/') || (!isHome && pathName === itemHref);

	return (
		<div
			className={twMerge(
				'absolute top-0 right-0 bottom-0 left-0 z-0 flex rounded-2xl',
				isActive ? 'bg-dp-highlighter-ma-green/10' : '',
			)}
		/>
	);
};

export default Indicator;
