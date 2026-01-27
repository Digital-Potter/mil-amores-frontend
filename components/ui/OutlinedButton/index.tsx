import Link from 'next/link';
import React, { MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import { RightArrow } from '@/components/icons';

type OutlinedButtonProps = {
	label: string;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	href?: string;
	disabled?: boolean;
};

const OutlinedButton = (props: OutlinedButtonProps) => {
	const { label, onClick, href, disabled } = props;

	const commonClasses =
		'relative text-sm flex items-center bg-dp-softer-ma-cream text-white font-primary-font uppercase font-bold px-7 py-3.5 rounded-dp-20 border-2 border-dp-highlighter-ma-green md:px-9 md:py-4 hover:border-dp-highlighter-ma-green transition-all group shadow-2xl';

	const buttonOnly = disabled
		? 'group:pointer-events-none pointer-events-none cursor-not-allowed'
		: 'cursor-pointer';

	return href ? (
		<Link href={href} className={commonClasses}>
			<ButtonLabel label={label} />
			<ButtonIcon />
		</Link>
	) : (
		<button
			onClick={onClick}
			className={twMerge(commonClasses, buttonOnly)}
			disabled={disabled}
		>
			<ButtonLabel label={label.toString()} /> <ButtonIcon />
		</button>
	);
};

const ButtonIcon = () => {
	return (
		<RightArrow className="fill-dp-highlighter-ma-green group-hover:fill-dp-highlighter-ma-green translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
	);
};

const ButtonLabel = (props: { label: string }) => {
	const { label } = props;
	return (
		<span className="text-dp-highlighter-ma-green group-hover:text-dp-highlighter-ma-green translate-x-2 text-center transition-all group-hover:-translate-x-1">
			{label}
		</span>
	);
};

export default OutlinedButton;
