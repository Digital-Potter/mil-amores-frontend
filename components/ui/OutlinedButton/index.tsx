import Link from 'next/link';
import type { MouseEvent } from 'react';
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
		'relative text-base lg:text-lg flex items-center bg-dp-softer-ma-cream hover:bg-dp-ma-orange text-dp-highlighter-ma-green font-primary-font uppercase font-bold px-4 py-3.5 rounded-4xl border-2 border-dp-dark md:px-9 md:py-4 hover:border-dp-ma-orange transition-all group shadow-2xl';

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
		<RightArrow className="fill-dp-softer-ma-cream group-hover:fill-dp-softer-ma-cream translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
	);
};

const ButtonLabel = (props: { label: string }) => {
	const { label } = props;
	return (
		<span className="text-dp-highlighter-ma-green group-hover:text-dp-softer-ma-cream translate-x-2 transition-all group-hover:-translate-x-1">
			{label}
		</span>
	);
};

export default OutlinedButton;
