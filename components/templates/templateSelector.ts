import React, { createElement } from 'react';

import { PageProps } from '@/types/pages';

import AboutTemplate from './AboutTemplate';
import NotFoundTemplate from './NotFoundTemplate';
import OurMenu from './OurMenu';

interface TemplateMap {
	keyword: string;
	template: React.ComponentType<any>;
}

const templates: TemplateMap[] = [
	{ keyword: 'about', template: AboutTemplate },
	{ keyword: 'menu', template: OurMenu },
	// { keyword: "services", template: ServicesTemplate },
];

export function templateSelector(
	link: string,
	pageData: PageProps,
): React.ReactElement {
	const normalizedLink = link.toLowerCase();

	const match = templates.find(({ keyword }) =>
		normalizedLink.includes(keyword),
	);

	const Component = match?.template ?? NotFoundTemplate;
	return createElement(Component, pageData);
}

export default templateSelector;
