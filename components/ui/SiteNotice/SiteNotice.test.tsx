import { fireEvent, render } from '@testing-library/react';

import type { StoreSettingsRecord } from '@/helpers/cms/types';

import SiteNotice from './index';

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

const on: StoreSettingsRecord = {
	noticePopup: {
		content: '<p>Hello <a href="/x">there</a></p>',
		showOn: { everywhere: false, homepage: true, items: [] },
	},
};

describe('SiteNotice mount point', () => {
	it('renders no markup when noticePopup is absent', () => {
		expect(render(<SiteNotice settings={{}} />).container.innerHTML).toBe('');
		expect(render(<SiteNotice settings={null} />).container.innerHTML).toBe('');
	});

	it('renders no markup for blank content', () => {
		const blank: StoreSettingsRecord = {
			noticePopup: { ...on.noticePopup!, content: '<p></p>' },
		};
		expect(render(<SiteNotice settings={blank} />).container.innerHTML).toBe(
			'',
		);
	});

	it('renders the region, close button and script when on', () => {
		const html = render(<SiteNotice settings={on} />).container.innerHTML;
		expect(html).toContain('aria-label="Site notice"');
		expect(html).toContain('aria-label="Close the notice"');
		expect(html).toContain('<script>');
		expect(html).toContain('Hello <a href="/x">there</a>');
	});

	it('stays closed for the visit after the close button is used', () => {
		window.sessionStorage.clear();
		const { container, getByLabelText } = render(<SiteNotice settings={on} />);
		fireEvent.click(getByLabelText('Close the notice'));
		expect(container.querySelector('[data-site-notice]')).toBeNull();
		expect(window.sessionStorage.length).toBe(1);
	});
});
