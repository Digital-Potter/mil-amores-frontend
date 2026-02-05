'use server';

export const pullMenuCatsData = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_CMS}/api/menu/categories`,
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

export const pullMenuCatById = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_CMS}/api/menu/categories/${id}`,
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
