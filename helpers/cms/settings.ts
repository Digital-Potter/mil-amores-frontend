import { apiGet } from './client';
import type {
	NavigationLocation,
	NavigationResponse,
	StoreSettingsResponse,
} from './types';

export function fetchStoreSettings() {
	return apiGet<StoreSettingsResponse>('/api/storefront/store-settings');
}

export async function fetchStoreSettingsOrNull(): Promise<StoreSettingsResponse | null> {
	try {
		return await fetchStoreSettings();
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[cms] fetchStoreSettings failed:', err);
		}
		return null;
	}
}

export function fetchNavigation(location?: NavigationLocation) {
	const qs = location ? `?location=${location}` : '';
	return apiGet<NavigationResponse>(`/api/storefront/navigation${qs}`);
}

export async function fetchNavigationOrEmpty(
	location?: NavigationLocation,
): Promise<NavigationResponse> {
	try {
		return await fetchNavigation(location);
	} catch (err) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn('[cms] fetchNavigation failed:', err);
		}
		return { success: true, count: 0, menus: [] };
	}
}
