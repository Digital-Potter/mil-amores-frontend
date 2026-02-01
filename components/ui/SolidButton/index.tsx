'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { RightArrow } from '@/components/icons';

interface SolidButtonProps {
	label: string;
	href?: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	classes?: string;
	isTopBar?: boolean;
}

const SolidButton = (props: SolidButtonProps) => {
	const pathName = usePathname();
	const { label, onClick, href, classes = '', isTopBar = false } = props;

	return href ? (
		<Link
			href={href}
			className={twJoin(
				'font-primary-font hover:text-dp-softer-ma-cream hover:bg-dp-ma-red group border-dp-highlighter-ma-green hover:border-dp-ma-red relative flex items-center rounded-4xl border-2 px-4 py-3.5 text-xs font-bold uppercase shadow-2xl transition-all md:px-9 md:py-4 lg:text-sm',
				classes,
				isTopBar && pathName === `/${href}`
					? 'bg-dp-highlighter-ma-green text-white'
					: 'bg-dp-highlighter-ma-green text-dp-softer-ma-cream',
			)}
		>
			<ButtonLabel label={label} />
			<ButtonIcon />
		</Link>
	) : (
		<button
			onClick={onClick}
			className={twMerge(
				'font-primary-font rounded-dp-20 hover:text-dp-softer-ma-cream hover:bg-dp-ma-red group border-dp-green hover:border-dp-green relative flex items-center border-2 px-4 py-3.5 text-xs font-bold uppercase shadow-2xl transition-all md:px-9 md:py-4 lg:text-sm',
				classes,
				isTopBar && pathName === `/${href}`
					? 'bg-dp-highlighter-ma-green text-white'
					: 'bg-dp-text-dp-softer-ma-cream text-dp-dark',
			)}
		>
			<ButtonLabel label={label} /> <ButtonIcon />
		</button>
	);
};

const ButtonIcon = () => {
	return (
		<RightArrow className="group-hover:fill-dp-text-dp-softer-ma-cream translate-x-0 fill-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
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
