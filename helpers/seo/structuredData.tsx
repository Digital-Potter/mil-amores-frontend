import type { StoreSettingsRecord, TenantChrome } from '@/helpers/cms/types';

export function siteBaseUrl(): string {
	const env =
		process.env.NEXT_PUBLIC_SITE_URL ??
		process.env.NEXT_PUBLIC_URL ??
		process.env.SITE_URL ??
		null;
	if (env) {
		try {
			return new URL(env).origin;
		} catch {
			// fall through
		}
	}
	return 'http://localhost:3003';
}

export function resolveSiteOrigin(domain?: string | null): string {
	if (domain && domain.trim().length > 0) {
		const raw = domain.trim();
		const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
		try {
			return new URL(withProto).origin;
		} catch {
			// fall through
		}
	}
	return siteBaseUrl();
}

export function absoluteUrl(path?: string): string {
	if (!path) return siteBaseUrl();
	if (path.startsWith('http://') || path.startsWith('https://')) return path;
	return siteBaseUrl() + (path.startsWith('/') ? path : `/${path}`);
}

type Json = Record<string, unknown>;

export function organizationSchema(
	tenant: TenantChrome,
	settings: StoreSettingsRecord | null,
): Json {
	const social = settings?.socialLinks ?? {};
	const sameAs = [
		social.facebook,
		social.instagram,
		social.twitter,
		social.youtube,
		social.tiktok,
	].filter((v): v is string => typeof v === 'string' && v.length > 0);

	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: tenant.settings.storeName,
		url: siteBaseUrl(),
	};
	if (tenant.settings.logoUrl) {
		out.logo = absoluteUrl(tenant.settings.logoUrl);
	}
	if (tenant.settings.storeDescription) {
		out.description = tenant.settings.storeDescription;
	}
	if (tenant.settings.contactEmail) out.email = tenant.settings.contactEmail;
	if (tenant.settings.contactPhone)
		out.telephone = tenant.settings.contactPhone;
	if (tenant.settings.address) out.address = tenant.settings.address;
	if (sameAs.length > 0) out.sameAs = sameAs;
	return out;
}

export function websiteSchema(
	tenant: TenantChrome,
	settings: StoreSettingsRecord | null,
): Json {
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: tenant.settings.storeName,
		url: siteBaseUrl(),
		publisher: {
			'@type': 'Organization',
			name: tenant.settings.storeName,
			url: siteBaseUrl(),
		},
	};
	const description =
		settings?.seo?.defaultDescription || tenant.settings.storeDescription;
	if (description) out.description = description;
	return out;
}

type JsonLdInput = object | string | null | undefined;

export function JsonLd({ data }: { data: JsonLdInput }) {
	if (data === null || data === undefined) return null;
	const html = typeof data === 'string' ? data : JSON.stringify(data);
	if (!html || html.trim().length === 0) return null;
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
