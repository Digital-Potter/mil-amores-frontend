'use client';

import Link from 'next/link';
import type { MouseEvent } from 'react';
import { Fragment, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { NavProps } from '@/types/pages';

// Styling
import mobileNavStyles from './nav.module.css';

interface MobileNavProps {
	navItems: NavProps[];
}

const MobileNav = (props: MobileNavProps) => {
	const { navItems } = props;
	const navRef = useRef<HTMLDivElement>(null);

	const onOpen = (e: MouseEvent) => {
		e.preventDefault();

		if (navRef) {
			navRef.current?.classList.add(`${mobileNavStyles.mobileOpen}`);
			navRef.current?.classList.remove(`${mobileNavStyles.mobileClose}`);
		}
	};

	const onClose = (e: MouseEvent) => {
		e.preventDefault();

		if (navRef) {
			navRef.current?.classList.add(`${mobileNavStyles.mobileClose}`);
			navRef.current?.classList.remove(`${mobileNavStyles.mobileOpen}`);
		}
	};

	return (
		<Fragment>
			<div className={mobileNavStyles.openerContainer}>
				<button className={mobileNavStyles.opener} onClick={onOpen}>
					<div className={mobileNavStyles.openerLineOne} />
					<div className={mobileNavStyles.openerLineTwo} />
					<div className={mobileNavStyles.openerLineThree} />
				</button>
			</div>

			<div
				ref={navRef}
				className={twMerge(
					`${mobileNavStyles.mobileNavContainer}`,
					`${mobileNavStyles.mobileClose}`,
				)}
			>
				<button className={mobileNavStyles.closer} onClick={onClose}>
					<div className={mobileNavStyles.closeLineOne} />
					<div className={mobileNavStyles.closeLineTwo} />
				</button>

				<nav role="navigation">
					<ul className={mobileNavStyles.mobileNavList}>
						{navItems.map((navItem) => (
							<li key={navItem._id} className={mobileNavStyles.navMobileItem}>
								<Link
									href={navItem.link}
									onMouseUp={onClose}
									className="font-primary-font bg-dp-body/0 hover:text-dp-dark-green hover:bg-dp-body/5 w-full rounded-xl py-2 text-base font-bold uppercase transition-all duration-300 group-hover:transition-all"
								>
									{navItem.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</Fragment>
	);
};

export default MobileNav;
