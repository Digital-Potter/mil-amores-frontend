import Link from 'next/link';
import React, { MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { RightArrow } from '@/components/icons';

interface SolidButtonProps {
	label: string;
	href?: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SolidButton = (props: SolidButtonProps) => {
	const { label, onClick, href } = props;

	const commonClasses =
		'relative text-sm flex items-center bg-dp-ma-red text-dp-softer-ma-cream font-primary-font uppercase font-bold px-7 py-3.5 rounded-dp-20 border-2 border-white md:px-9 md:py-4 hover:text-dp-green hover:border-white hover:bg-dp-ma-red transition-all group shadow-2xl';

	return href ? (
		<Link href={href} className={twMerge(commonClasses)}>
			<ButtonLabel label={label} />
			<ButtonIcon />
		</Link>
	) : (
		<button onClick={onClick} className={twMerge(commonClasses)}>
			<ButtonLabel label={label} /> <ButtonIcon />
		</button>
	);
};

const ButtonIcon = () => {
	return (
		<RightArrow className="group-hover:fill-dp-green translate-x-0 fill-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
	);
};

const ButtonLabel = (props: { label: string }) => {
	const { label } = props;
	return (
		<span className="translate-x-2 text-center transition-all group-hover:-translate-x-1">
			{label}
		</span>
	);
};

export default SolidButton;
