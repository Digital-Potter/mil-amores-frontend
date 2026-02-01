export const getMenuPages = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_CMS}/api/pages/pages-menu`,
			{
				cache: 'no-cache',
				headers: { storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` },
			},
		);

		const data = await res.json();
		if (!res.ok) {
			throw new Error('An error occurred while fetching the data');
		}

		return data;
	} catch (error) {
		return new Error('An error occurred while fetching the data', {
			cause: error,
		});
	}
};

export const getAllPages = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/pages`, {
			cache: 'no-cache',
			headers: { storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` },
		});

		const data = await res.json();

		return data;
	} catch (error) {
		return new Error('An error occurred while fetching the data', {
			cause: error,
		});
	}
};

export const getPageByLink = async (link: string) => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/pages/${link}`, {
		next: { revalidate: 60 },
		headers: { storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` },
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
