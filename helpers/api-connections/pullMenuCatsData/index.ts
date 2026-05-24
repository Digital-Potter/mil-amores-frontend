// Menu categories + items adapter — calls thedavid CMS storefront API and
// reshapes the response to match the legacy MenuCategoryProps / MenuItem
// types this app's components consume.
'use server';

import type { allImages } from '@/types/images';
import type { MenuCategoryProps, MenuItem } from '@/types/menus';

const TENANT_SLUG = process.env.TENANT_SLUG ?? 'mil-amores';

interface MediaLike {
	_id?: string;
	url?: string;
	alt?: string;
}

interface NewMenuCategory {
	_id: string;
	title: string;
	slug: string;
	description?: string;
	position?: number;
	featuredImage?: MediaLike;
	locations?: Array<{ _id: string; name: string; slug: string }>;
	status?: string;
	legacyIds?: { plitzCategoryId?: string };
}

interface NewMenuItemOption {
	_id?: string;
	title: string;
	subtitle?: string;
	price: number;
	currency?: string;
	isAvailable?: boolean;
}

interface NewMenuItemFeature {
	_id?: string;
	label: string;
	description?: string;
}

interface NewMenuItem {
	_id: string;
	title: string;
	subtitle?: string;
	slug: string;
	description?: string;
	position?: number;
	status?: string;
	categories?: Array<{ _id: string; title: string; slug: string }>;
	locations?: Array<{ _id: string; name: string; slug: string }>;
	featuredImage?: MediaLike;
	options?: NewMenuItemOption[];
	features?: NewMenuItemFeature[];
	isAvailable?: boolean;
	legacyIds?: { plitzMenuItemId?: string };
}

function toLegacyImage(m: MediaLike | undefined): allImages {
	const url = m?.url ?? '';
	return {
		fullSize: url,
		othersizes: { tablet: url, mobile: url },
	};
}

function adaptMenuItem(item: NewMenuItem): MenuItem {
	return {
		_id: item._id,
		user: '',
		isLive: item.status ? item.status === 'published' : true,
		title: item.title,
		subtitle: item.subtitle ?? '',
		description: item.description ?? '',
		position: item.position ?? 0,
		locations: (item.locations ?? []).map((l) => l._id),
		options: (item.options ?? []).map((o) => ({
			_id: o._id ?? '',
			optionTitle: o.title,
			optionSubtitle: o.subtitle ?? '',
			price: o.price,
			isAvailable: o.isAvailable ?? true,
		})),
		features: (item.features ?? []).map((f) => ({
			_id: f._id ?? '',
			label: f.label,
			description: f.description ?? '',
		})),
		categories: (item.categories ?? []).map((c) => c._id),
		featuredImg: toLegacyImage(item.featuredImage),
	};
}

function adaptCategory(
	c: NewMenuCategory,
	items: NewMenuItem[] = [],
): MenuCategoryProps {
	return {
		_id: c._id,
		user: '',
		isLive: c.status ? c.status === 'active' : true,
		categoryTitle: c.title,
		categoryDescription: c.description ?? '',
		position: c.position ?? 0,
		items: items.map(adaptMenuItem),
		featuredImage: toLegacyImage(c.featuredImage),
	};
}

async function fetchJson<T>(
	path: string,
	init?: { cache?: RequestCache; next?: { revalidate?: number } },
): Promise<T | null> {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API}${path}`, {
			...init,
			headers: { 'x-tenant-id': TENANT_SLUG },
		});
		if (res.status === 404) return null;
		if (!res.ok) return null;
		return (await res.json()) as T;
	} catch {
		return null;
	}
}

export const pullMenuCatsData = async (): Promise<MenuCategoryProps[]> => {
	const [catsRes, itemsRes] = await Promise.all([
		fetchJson<{ data: NewMenuCategory[] }>(`/api/storefront/menu-categories`, {
			next: { revalidate: 60 },
		}),
		fetchJson<{ data: NewMenuItem[] }>(`/api/storefront/menu-items?limit=500`, {
			next: { revalidate: 60 },
		}),
	]);

	const itemsByCategoryId = new Map<string, NewMenuItem[]>();
	for (const item of itemsRes?.data ?? []) {
		for (const cat of item.categories ?? []) {
			const list = itemsByCategoryId.get(cat._id) ?? [];
			list.push(item);
			itemsByCategoryId.set(cat._id, list);
		}
	}

	return (catsRes?.data ?? []).map((c) =>
		adaptCategory(c, itemsByCategoryId.get(c._id) ?? []),
	);
};

export const pullMenuCatById = async (
	idOrSlug: string,
): Promise<MenuCategoryProps | null> => {
	let slug = idOrSlug;
	if (/^[a-f0-9]{24}$/i.test(idOrSlug)) {
		const data = await fetchJson<{ data: NewMenuCategory[] }>(
			`/api/storefront/menu-categories`,
			{ next: { revalidate: 60 } },
		);
		const found = (data?.data ?? []).find((c) => c._id === idOrSlug);
		if (!found) return null;
		slug = found.slug;
	}

	const [categoryRes, itemsRes] = await Promise.all([
		fetchJson<{ category: NewMenuCategory }>(
			`/api/storefront/menu-categories/${encodeURIComponent(slug)}`,
			{ next: { revalidate: 60 } },
		),
		fetchJson<{ data: NewMenuItem[] }>(
			`/api/storefront/menu-items?category=${encodeURIComponent(slug)}`,
			{ next: { revalidate: 60 } },
		),
	]);

	if (!categoryRes?.category) return null;
	return adaptCategory(categoryRes.category, itemsRes?.data ?? []);
};
