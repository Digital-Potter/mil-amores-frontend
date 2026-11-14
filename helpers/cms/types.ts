export interface TenantChrome {
	_id: string;
	name: string;
	slug: string;
	domain?: string;
	settings: {
		storeName: string;
		storeDescription: string;
		contactEmail: string;
		contactPhone: string;
		address: string;
		logoUrl: string;
	};
}

export interface StoreSettingsRecord {
	socialLinks?: Partial<
		Record<'facebook' | 'instagram' | 'twitter' | 'youtube' | 'tiktok', string>
	>;
	policies?: Partial<
		Record<
			'refundPolicy' | 'privacyPolicy' | 'termsOfService' | 'shippingPolicy',
			string
		>
	>;
	storefront?: {
		domain?: string;
	};
	siteStructure?: {
		homepageSlug?: string | null;
		blogSlug?: string | null;
	};
	seo?: {
		defaultTitle?: string;
		titleTemplate?: string;
		defaultDescription?: string;
		defaultOgImage?: string;
		faviconUrl?: string;
		appleTouchIconUrl?: string;
		generatedIcons?: {
			faviconIcoUrl?: string;
			favicon16Url?: string;
			favicon32Url?: string;
			favicon96Url?: string;
			favicon192Url?: string;
			favicon512Url?: string;
			appleTouchUrl?: string;
		};
		robots?: { allowIndexing?: boolean; extraDirectives?: string };
		sitemap?: {
			enabled?: boolean;
			includePages?: boolean;
			includeBlog?: boolean;
			includeProducts?: boolean;
			includeCategories?: boolean;
			customUrls?: {
				loc: string;
				lastmod?: string;
				priority?: number;
				changefreq?:
					| 'always'
					| 'hourly'
					| 'daily'
					| 'weekly'
					| 'monthly'
					| 'yearly'
					| 'never';
			}[];
		};
	};
	googleAnalytics?: {
		measurementId?: string;
		trackingEnabled?: boolean;
	};
	webmasterTools?: {
		googleSiteVerification?: string;
		bingSiteVerification?: string;
	};
	/** Present only when the owner has the site notice on. */
	noticePopup?: NoticePopupPayload;
}

export type NoticeItemType =
	| 'page'
	| 'product'
	| 'course'
	| 'blogPost'
	| 'productCategory'
	| 'blogCategory';

export interface NoticePopupPayload {
	/** Strict-sanitized HTML from the API. */
	content: string;
	showOn: {
		everywhere: boolean;
		homepage: boolean;
		items: { type: NoticeItemType; slug: string; path: string }[];
	};
}

export interface StoreSettingsResponse {
	success: true;
	tenant: TenantChrome;
	settings: StoreSettingsRecord | null;
}

export type NavigationLocation = 'header' | 'footer' | 'sidebar' | 'mobile';

export type MenuItemType =
	| 'page'
	| 'blog_post'
	| 'blog_category'
	| 'product'
	| 'product_category'
	| 'course'
	| 'custom';

export interface ResolvedMegaMenuColumn {
	_id: string;
	name: string;
	slug: string;
	title?: string;
	subtitle?: string;
	items: ResolvedMenuItem[];
}

export interface ResolvedMenuItem {
	_id: string;
	label: string;
	type: MenuItemType;
	url?: string;
	openInNewTab: boolean;
	order: number;
	cssClass?: string;
	icon?: string;
	description?: string;
	headline?: string;
	isMegaMenu?: boolean;
	megaMenuColumns?: ResolvedMegaMenuColumn[];
	megaMenuTitle?: string;
	megaMenuSubtitle?: string;
	reference?: string;
	resolved?: { slug: string; title: string };
	children: ResolvedMenuItem[];
}

export interface NavigationMenu {
	_id: string;
	name: string;
	slug: string;
	location: NavigationLocation;
	title?: string;
	subtitle?: string;
	items: ResolvedMenuItem[];
}

export interface NavigationResponse {
	success: true;
	count: number;
	menus: NavigationMenu[];
}
