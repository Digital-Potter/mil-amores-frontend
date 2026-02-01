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
	alwaysIcon?: boolean;
}

const SolidButton = (props: SolidButtonProps) => {
	const pathName = usePathname();
	const {
		label,
		onClick,
		href,
		classes = '',
		isTopBar = false,
		alwaysIcon = false,
	} = props;

	return href ? (
		<Link
			data-testid={'solid-link'}
			href={href}
			className={twJoin(
				'font-primary-font hover:text-dp-softer-ma-cream hover:bg-dp-ma-red group border-dp-highlighter-ma-green hover:border-dp-ma-red relative flex items-center rounded-4xl border-2 px-4 py-3.5 text-base font-bold uppercase shadow-2xl transition-all md:px-9 md:py-4 lg:text-lg',
				classes,
				isTopBar && pathName === `/${href}`
					? 'bg-dp-highlighter-ma-green text-white'
					: 'bg-dp-highlighter-ma-green text-dp-softer-ma-cream',
			)}
		>
			<ButtonLabel label={label} alwaysIcon={alwaysIcon} />
			<ButtonIcon alwaysIcon={alwaysIcon} />
		</Link>
	) : (
		<button
			data-testid={'solid-button'}
			onClick={onClick}
			className={twMerge(
				'font-primary-font rounded-dp-20 hover:text-dp-softer-ma-cream hover:bg-dp-ma-red group border-dp-highlighter-ma-green hover:border-dp-highlighter-ma-green relative flex items-center border-2 px-4 py-3.5 font-bold uppercase shadow-2xl transition-all md:px-9 md:py-4 lg:text-sm',
				classes,
				isTopBar && pathName === `/${href}`
					? 'bg-dp-highlighter-ma-green text-white'
					: 'bg-dp-text-dp-softer-ma-cream text-dp-dark',
			)}
		>
			<ButtonLabel label={label} alwaysIcon={alwaysIcon} />{' '}
			<ButtonIcon alwaysIcon={alwaysIcon} />
		</button>
	);
};

const ButtonIcon = ({ alwaysIcon }: { alwaysIcon: boolean }) => {
	return (
		<RightArrow
			className={twJoin(
				'group-hover:fill-dp-softer-ma-cream fill-dp-softer-ma-cream transition-all',
				alwaysIcon
					? 'translate-x-1 opacity-100'
					: 'translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100',
			)}
		/>
	);
};

const ButtonLabel = (props: { label: string; alwaysIcon: boolean }) => {
	const { label, alwaysIcon } = props;
	return (
		<span
			className={twJoin(
				'text-center transition-all',
				alwaysIcon
					? '-translate-x-1'
					: 'translate-x-2 group-hover:-translate-x-1',
			)}
		>
			{label}
		</span>
	);
};

export default SolidButton;
