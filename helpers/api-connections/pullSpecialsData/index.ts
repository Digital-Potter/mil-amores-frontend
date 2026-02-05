export const pullSpecialsData = async () => {
	const siteId = process.env.NEXT_PUBLIC_CLIENT_ID || 'PlitzTemplateUno';
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/menu/specials`, {
		next: { revalidate: 60 }, // Revalidate every 60 seconds instead of no-cache
		headers: { storedId: `${siteId}` },
	});

	const data = await res.json();

	return data;
};
