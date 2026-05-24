import type { ComponentType } from 'react';

import type { CmsPage } from '@/helpers/pullCmsPage';

import AboutTemplate from './AboutTemplate';
import DefaultTemplate from './DefaultTemplate';
import HomeTemplate from './HomeTemplate';
import MenuTemplate from './MenuTemplate';

export interface PageTemplateProps {
	page: CmsPage;
}

const REGISTRY: Record<string, ComponentType<PageTemplateProps>> = {
	default: DefaultTemplate,
	home: HomeTemplate,
	about: AboutTemplate,
	menu: MenuTemplate,
};

export function resolveTemplate(
	name: string | null | undefined,
): ComponentType<PageTemplateProps> {
	if (!name) return DefaultTemplate;
	return REGISTRY[name] ?? DefaultTemplate;
}
