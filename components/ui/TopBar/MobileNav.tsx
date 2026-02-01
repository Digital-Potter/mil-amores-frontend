'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import type { NavProps } from '@/types/pages';

import mobileNavStyles from './nav.module.css';

interface MobileNavProps {
	navItems: NavProps[];
}

const MobileNav = ({ navItems }: MobileNavProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<>
			<div className={mobileNavStyles.openerContainer}>
				<button
					className={mobileNavStyles.opener}
					onClick={handleOpen}
					aria-label="Open navigation menu"
					aria-expanded={isOpen}
					aria-controls="mobile-nav"
				>
					<div className={mobileNavStyles.openerLineOne} />
					<div className={mobileNavStyles.openerLineTwo} />
					<div className={mobileNavStyles.openerLineThree} />
				</button>
			</div>

			<div
				id="mobile-nav"
				className={twMerge(
					mobileNavStyles.mobileNavContainer,
					isOpen ? mobileNavStyles.mobileOpen : mobileNavStyles.mobileClose,
				)}
				aria-hidden={!isOpen}
			>
				<button
					className={mobileNavStyles.closer}
					onClick={handleClose}
					aria-label="Close navigation menu"
				>
					<div className={mobileNavStyles.closeLineOne} />
					<div className={mobileNavStyles.closeLineTwo} />
				</button>

				<nav role="navigation" aria-label="Mobile navigation">
					<ul className={mobileNavStyles.mobileNavList}>
						{navItems.map((navItem) => (
							<li key={navItem._id} className={mobileNavStyles.navMobileItem}>
								<Link
									href={navItem.link}
									onClick={handleClose}
									className="font-primary-font w-full rounded-xl bg-transparent py-2 text-base font-bold uppercase transition-all duration-300 hover:bg-black/5 hover:text-black/80"
								>
									{navItem.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="mt-20">
						<a
							href="tel:7578085269"
							className="text-dp-ma-red flex flex-col justify-center text-center"
						>
							<span className="text-small font-light">Place your order</span>
							<span className="text-xl font-bold">(757) 808-5269</span>
						</a>
					</div>
				</nav>
			</div>
		</>
	);
};

export default MobileNav;
