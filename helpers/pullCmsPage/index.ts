// Sections-first page helper. Returns the raw new-CMS page payload
// so storefront templates can render `page.sections[]` directly with
// one component per section type. Page templates are registered in
// `components/pageTemplates/registry.ts`; the dynamic `[link]` route
// resolves `page.template` against that registry.

const TENANT_SLUG = process.env.TENANT_SLUG ?? 'mil-amores';

export interface CmsMedia {
	_id?: string;
	url?: string;
	alt?: string;
	width?: number;
	height?: number;
	filename?: string;
}

export interface CmsBlockColumn {
	title?: string;
	subtitle?: string;
	content?: string;
	image?: string | CmsMedia;
	gallery?: string[];
}

export interface CmsBlockButton {
	label?: string;
	url?: string;
	style?: 'primary' | 'secondary';
	openInNewTab?: boolean;
}

export interface CmsTestimonialItem {
	quote?: string;
	author?: string;
	role?: string;
	source?: string;
	rating?: number;
	image?: string | CmsMedia;
}

export interface CmsFeatureGridItem {
	icon?: string;
	title?: string;
	subtitle?: string;
	description?: string;
	image?: string | CmsMedia;
}

export interface CmsSectionContent {
	htmlContent?: string;
	columns?: CmsBlockColumn[];
	buttons?: CmsBlockButton[];
	image?: string | CmsMedia;
	testimonials?: CmsTestimonialItem[];
	items?: CmsFeatureGridItem[];
	legacyMarker?: string;
	legacyBoxId?: string;
	legacyEposition?: number;
	legacyEtitle?: string;
	legacyEsubtitle?: string;
}

export interface CmsSectionSettings {
	columns?: number;
	layout?: 'full' | 'contained' | 'narrow';
	paddingTop?: 'none' | 'small' | 'medium' | 'large';
	paddingBottom?: 'none' | 'small' | 'medium' | 'large';
}

export interface CmsPageSection {
	_id?: string;
	_type:
		| 'hero'
		| 'text'
		| 'image'
		| 'gallery'
		| 'cta'
		| 'feature_grid'
		| 'testimonials'
		| 'video'
		| 'faq'
		| 'contact_form'
		| 'html'
		| 'blog_feed'
		| 'product_list'
		| 'course_list'
		| 'blog_list'
		| 'category_grid'
		| 'carousel'
		| 'booking_calendar';
	label?: string;
	title?: string;
	subtitle?: string;
	order: number;
	settings?: CmsSectionSettings;
	content?: CmsSectionContent;
	isGlobal?: boolean;
}

export interface CmsPage {
	_id: string;
	tenant: string;
	title: string;
	subtitle?: string;
	slug: string;
	content?: string;
	featuredImage?: CmsMedia;
	sections: CmsPageSection[];
	seo?: { metaTitle?: string; metaDescription?: string };
	status: string;
	template?: string | null;
	publishedAt?: string;
	createdAt: string;
	updatedAt: string;
}

interface CmsPageResponse {
	success: boolean;
	page: CmsPage;
}

interface CmsPagesListResponse {
	success: boolean;
	items: CmsPage[];
	total?: number;
}

export async function listCmsPages(): Promise<CmsPage[]> {
	if (!process.env.NEXT_PUBLIC_API) return [];
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/api/storefront/pages?limit=200`,
			{
				next: { revalidate: 60 },
				headers: { 'x-tenant-id': TENANT_SLUG },
			},
		);
		if (!res.ok) return [];
		const data = (await res.json()) as CmsPagesListResponse;
		return data.items ?? [];
	} catch {
		return [];
	}
}

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
	if (!process.env.NEXT_PUBLIC_API) return null;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/api/storefront/pages/${encodeURIComponent(slug)}`,
			{
				next: { revalidate: 60 },
				headers: { 'x-tenant-id': TENANT_SLUG },
			},
		);
		if (!res.ok) return null;
		const data = (await res.json()) as CmsPageResponse;
		return data.page ?? null;
	} catch {
		return null;
	}
}
