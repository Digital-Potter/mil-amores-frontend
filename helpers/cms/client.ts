const TENANT_SLUG = process.env.TENANT_SLUG ?? 'mil-amores';

const baseUrl = () => {
	const v = process.env.NEXT_PUBLIC_API;
	if (!v) throw new Error('NEXT_PUBLIC_API env var not set');
	return v.replace(/\/$/, '');
};

type FetchOpts = {
	revalidate?: number | false;
	tags?: string[];
};

export async function apiGet<T = unknown>(
	path: string,
	opts: FetchOpts = {},
): Promise<T> {
	const res = await fetch(`${baseUrl()}${path}`, {
		headers: { 'x-tenant-id': TENANT_SLUG },
		next:
			opts.revalidate === false
				? { revalidate: 0, tags: opts.tags }
				: { revalidate: opts.revalidate ?? 60, tags: opts.tags },
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`CMS GET ${path} → ${res.status}: ${text}`);
	}
	return res.json() as Promise<T>;
}
