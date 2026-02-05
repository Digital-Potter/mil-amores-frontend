export const pullLocationsData = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/locations`, {
		next: { revalidate: 60 },
		headers: {
			storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
		},
	});

	const data = await res.json();

	return data;
};

export const pullLocationBySlug = async (slug: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_CMS}/api/locations/${slug}`,
		{
			next: { revalidate: 60 },
			headers: {
				storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
			},
		},
	);

	const data = await res.json();

	return data;
};
