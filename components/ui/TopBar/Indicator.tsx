'use client';

import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type IndicatorProps = {
	itemPath: string;
	isHome: boolean;
};

const Indicator = (props: IndicatorProps) => {
	const { itemPath, isHome } = props;

	const pathName = usePathname();

	return (
		<div
			className={twMerge(
				'absolute top-0 right-0 bottom-0 left-0 z-0 flex rounded-2xl',
				pathName === `/${itemPath}` || (isHome && pathName === '/')
					? 'bg-dp-highlighter-ma-green/10'
					: '',
			)}
		/>
	);
};

export default Indicator;
