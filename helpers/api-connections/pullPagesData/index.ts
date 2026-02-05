export const getAllPages = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/pages`, {
		next: { revalidate: 60 },
		headers: {
			storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
		},
	});

	const data = await res.json();

	return data;
};

export const getPageByLink = async (link: string) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/pages/${link}`, {
		next: { revalidate: 60 },
		headers: {
			storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
		},
	});

	if (res.status === 404) {
		return new Error('Page not found');
	}

	if (!res.ok) {
		return new Error('An error occurred while fetching the data');
	}

	const data = await res.json();

	return data;
};
