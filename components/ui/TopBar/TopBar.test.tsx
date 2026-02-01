import { render, screen } from '@testing-library/react';

import { getMenuPages } from '@/helpers/api-connections/pagesData';

import TopBar from './TopBar';

jest.mock('@/helpers/api-connections/pagesData');
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
	const MockMobileNav = ({ navItems }: { navItems: any[] }) => {
		return <div data-testid="mobile-nav">{navItems.length} items</div>;
	};
	MockMobileNav.displayName = 'MockMobileNav';
	return MockMobileNav;
});

const mockMenuData = [
	{ _id: '1', label: 'Home', link: '/' },
	{ _id: '2', label: 'About', link: '/about' },
	{ _id: '3', label: 'Menu', link: '/menu' },
];

describe('TopBar', () => {
	beforeEach(() => {
		(getMenuPages as jest.Mock).mockResolvedValue(mockMenuData);
	});

	it('renders navigation items', async () => {
		const component = await TopBar();
		render(component);
		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('About')).toBeInTheDocument();
		expect(screen.getByText('Menu')).toBeInTheDocument();
	});

	it('renders SolidButton with correct props', async () => {
		const component = await TopBar();
		render(component);
		const button = screen.getByText('Menu');
		expect(button).toBeInTheDocument();
	});

	it('renders MobileNav component', async () => {
		const component = await TopBar();
		render(component);
		expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
	});
});
