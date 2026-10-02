'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const SESSION_KEY = 'dp_session_id';

/**
 * Read or mint a per-tab session id stored in `sessionStorage`. The same id
 * is sent with every visit beacon for the lifetime of this browser tab so
 * the CMS dashboard can group pageviews into sessions.
 */
function getSessionId(): string {
	if (typeof window === 'undefined') return '';
	let id = window.sessionStorage.getItem(SESSION_KEY);
	if (!id) {
		id =
			typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
				? crypto.randomUUID()
				: Math.random().toString(36).slice(2) + Date.now().toString(36);
		try {
			window.sessionStorage.setItem(SESSION_KEY, id);
		} catch {
			// sessionStorage may be unavailable (private mode, blocked) — id stays in-memory.
		}
	}
	return id;
}

type TrackPageVisitProps = {
	/** CMS base URL (no trailing slash), e.g. `https://api.digitalpotter.io`. */
	apiUrl: string;
	/** Tenant slug sent as `x-tenant-id`. */
	tenantId: string;
};

/**
 * Fires `POST /api/track/visit` on every client-side navigation so the
 * theDavid admin "Visits" chart and reports have data. Mount once in the
 * root layout inside `<Suspense>` (required by `useSearchParams`).
 *
 * `apiUrl` and `tenantId` are passed from the server layout so the tenant
 * slug can stay a server-only setting. Uses `fetch keepalive` so the request
 * survives the unload that follows a link click. Failures are swallowed —
 * analytics must never break the page.
 */
export default function TrackPageVisit({
	apiUrl,
	tenantId,
}: TrackPageVisitProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const lastPath = useRef<string | null>(null);

	useEffect(() => {
		if (!apiUrl || !tenantId) return;
		if (typeof window === 'undefined') return;

		const qs = searchParams.toString();
		const fullPath = pathname + (qs ? `?${qs}` : '');
		// Guard against React-StrictMode double-invocation in dev and against
		// SearchParams hooks firing for cosmetic state changes.
		if (lastPath.current === fullPath) return;
		lastPath.current = fullPath;

		const pageUrl = window.location.origin + fullPath;
		const referrer = document.referrer || undefined;
		const sessionId = getSessionId();

		fetch(`${apiUrl.replace(/\/$/, '')}/api/track/visit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-tenant-id': tenantId,
			},
			body: JSON.stringify({ pageUrl, referrer, sessionId }),
			keepalive: true,
		}).catch(() => {
			// Silently ignore — analytics must never break the site.
		});
	}, [pathname, searchParams, apiUrl, tenantId]);

	return null;
}
