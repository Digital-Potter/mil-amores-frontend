// Specials adapter — calls thedavid CMS storefront API and reshapes the
// response to match the legacy SpecialProps type this app's components
// consume.
import type { allImages } from '@/types/images';
import type { LocationProps } from '@/types/locations';
import type { SpecialProps } from '@/types/specials';

const TENANT_SLUG = process.env.TENANT_SLUG ?? 'mil-amores';

interface MediaLike {
	url?: string;
}

interface NewSpecialItem {
	item?: { title?: string; slug?: string; basePrice?: number };
	customTitle?: string;
	quantity?: number;
	dineInOnly?: boolean;
	priceOverride?: number;
	isAvailable?: boolean;
}

interface NewLocationSummary {
	_id: string;
	name: string;
	slug: string;
}

interface NewSpecialDiscount {
	type?: string;
	value?: number;
}

interface NewSpecial {
	_id: string;
	title: string;
	subtitle?: string;
	slug: string;
	description?: string;
	disclaimer?: string;
	position?: number;
	discount?: NewSpecialDiscount;
	items?: NewSpecialItem[];
	locations?: NewLocationSummary[];
	featuredImage?: MediaLike;
	status?: string;
}

function legacyDiscountType(type: string | undefined): string {
	if (type === 'percent') return '%';
	if (type === 'fixed') return '$';
	return '';
}

function toLegacyImage(m: MediaLike | undefined): allImages {
	const url = m?.url ?? '';
	return {
		fullSize: url,
		othersizes: { tablet: url, mobile: url },
	};
}

function adaptSpecial(s: NewSpecial): SpecialProps {
	const discountValue = s.discount?.value ?? 0;
	return {
		_id: s._id,
		isLive: s.status ? s.status === 'published' : true,
		title: s.title,
		subtitle: s.subtitle ?? '',
		description: s.description ?? '',
		position: s.position ?? 0,
		discount: discountValue as unknown as SpecialProps['discount'],
		discountType: legacyDiscountType(s.discount?.type),
		disclaimer: s.disclaimer ?? '',
		products: (s.items ?? []).map((it) => ({
			_id: '',
			product: it.customTitle?.trim() || it.item?.title || '',
			quantity: it.quantity ?? 1,
			dineInOnly: it.dineInOnly ?? false,
			priceOverride: it.priceOverride ?? 0,
		})),
		locations: (s.locations ?? []).map(
			(l) =>
				({
					_id: l._id,
					locationName: l.name,
					link: l.slug,
				}) as unknown as LocationProps,
		),
		featuredImage: toLegacyImage(s.featuredImage),
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

export const pullSpecialsData = async (): Promise<SpecialProps[]> => {
	const data = await fetchJson<{ data: NewSpecial[] }>(
		`/api/storefront/specials`,
		{ cache: 'no-cache' },
	);
	return (data?.data ?? []).map(adaptSpecial);
};
