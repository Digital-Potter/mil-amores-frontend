import { render, screen } from '@testing-library/react';

import type { NavigationResponse } from '@/helpers/cms/types';

import TopBar from './TopBar';

jest.mock('next/link', () => {
	const MockLink = ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => {
		return <a href={href}>{children}</a>;
	};
	MockLink.displayName = 'MockLink';
	return MockLink;
});
jest.mock('../SolidButton', () => {
	const MockSolidButton = ({
		label,
		href,
	}: {
		label: string;
		href?: string;
		classes?: string;
		isTopBar?: boolean;
		alwaysIcon?: boolean;
	}) => {
		return (
			<a href={href} data-testid="solid-button">
				{label}
			</a>
		);
	};
	MockSolidButton.displayName = 'MockSolidButton';
	return MockSolidButton;
});
jest.mock('./Indicator', () => {
	const MockIndicator = () => <div data-testid="indicator" />;
	MockIndicator.displayName = 'MockIndicator';
	return MockIndicator;
});
jest.mock('./MobileNav', () => {
	const MockMobileNav = ({ navItems }: { navItems: { id: string }[] }) => {
		return <div data-testid="mobile-nav">{navItems.length} items</div>;
	};
	MockMobileNav.displayName = 'MockMobileNav';
	return MockMobileNav;
});

const navItem = (overrides: { id: string; label: string; slug: string }) => ({
	_id: overrides.id,
	label: overrides.label,
	type: 'page' as const,
	openInNewTab: false,
	order: 0,
	resolved: { slug: overrides.slug, title: overrides.label },
	children: [],
});

const mockNav: NavigationResponse = {
	success: true,
	count: 2,
	menus: [
		{
			_id: 'left',
			name: 'left',
			slug: 'left-menu',
			location: 'header',
			items: [
				navItem({ id: '1', label: 'Home', slug: 'home' }),
				navItem({ id: '2', label: 'About', slug: 'about' }),
			],
		},
		{
			_id: 'right',
			name: 'right',
			slug: 'right-menu',
			location: 'header',
			items: [navItem({ id: '3', label: 'Menu', slug: 'our-menu' })],
		},
	],
};

describe('TopBar', () => {
	it('renders left-menu items', () => {
		render(
			<TopBar headerNav={mockNav} siteStructure={{ homepageSlug: 'home' }} />,
		);
		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('About')).toBeInTheDocument();
	});

	it('renders the right-menu CTA via SolidButton', () => {
		render(
			<TopBar headerNav={mockNav} siteStructure={{ homepageSlug: 'home' }} />,
		);
		expect(screen.getByTestId('solid-button')).toHaveTextContent('Menu');
	});

	it('renders MobileNav with all items including the CTA', () => {
		render(
			<TopBar headerNav={mockNav} siteStructure={{ homepageSlug: 'home' }} />,
		);
		expect(screen.getByTestId('mobile-nav')).toHaveTextContent('3 items');
	});
});
