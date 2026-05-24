// Locations data adapter — calls thedavid CMS storefront API and reshapes
// the response to match the legacy LocationProps type this app's components
// consume.
import type { allImages } from '@/types/images';
import type { LocationProps } from '@/types/locations';

const TENANT_SLUG = process.env.TENANT_SLUG ?? 'mil-amores';

interface MediaLike {
	_id?: string;
	url?: string;
	filename?: string;
	alt?: string;
	width?: number;
	height?: number;
}

interface NewPhone {
	phone: string;
	primary?: boolean;
	label?: string;
}

interface NewAddress {
	line1?: string;
	line2?: string;
	city?: string;
	region?: string;
	postalCode?: string;
	country?: string;
}

interface NewLocation {
	_id: string;
	name: string;
	slug: string;
	position?: number;
	address?: NewAddress;
	phones?: NewPhone[];
	scheduleNote?: string;
	featuredImage?: MediaLike;
	gallery?: MediaLike[];
	seo?: { metaTitle?: string };
	status?: string;
}

function joinAddress(a: NewAddress | undefined): string {
	if (!a) return '';
	return [a.line1, a.line2, a.city, a.region, a.postalCode, a.country]
		.filter((p) => p && p.trim().length > 0)
		.join(', ');
}

function toLegacyImage(m: MediaLike | undefined): allImages {
	const url = m?.url ?? '';
	return {
		fullSize: url,
		othersizes: { tablet: url, mobile: url },
	};
}

function adaptLocation(l: NewLocation): LocationProps {
	return {
		_id: l._id,
		isLive: l.status ? l.status === 'published' : true,
		position: l.position ?? 0,
		locationName: l.name,
		seoTitle: l.seo?.metaTitle ?? l.name,
		link: l.slug,
		address: joinAddress(l.address),
		phones: (l.phones ?? []).map((p) => ({
			phone: p.phone,
			primary: !!p.primary,
		})),
		schedule: l.scheduleNote ?? '',
		featuredImg: toLegacyImage(l.featuredImage),
		gallery: (l.gallery ?? []).map(toLegacyImage),
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

export const pullLocationsData = async (): Promise<LocationProps[]> => {
	const data = await fetchJson<{ data: NewLocation[] }>(
		`/api/storefront/locations`,
		{ next: { revalidate: 60 } },
	);
	return (data?.data ?? []).map(adaptLocation);
};

export const pullLocationBySlug = async (
	slug: string,
): Promise<LocationProps> => {
	const data = await fetchJson<{ location: NewLocation }>(
		`/api/storefront/locations/${encodeURIComponent(slug)}`,
		{ next: { revalidate: 60 } },
	);
	if (!data?.location) {
		return { message: 'Location not found' } as unknown as LocationProps;
	}
	return adaptLocation(data.location);
};
