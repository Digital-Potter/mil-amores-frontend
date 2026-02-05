export const getAllCategories = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/categories`, {
		next: { revalidate: 60 },
		headers: {
			storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
		},
	});

	const data = await res.json();

	return data;
};

export const getCategoryByLink = async (link: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_CMS}/api/categories/${link}`,
		{
			next: { revalidate: 60 },
			headers: {
				storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
			},
		},
	);

	if (res.status === 404) {
		return new Error('Post not found');
	}

	if (!res.ok) {
		return new Error('An error occurred while fetching the data');
	}

	const data = await res.json();

	return data;
};

export const getAllPosts = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/blogposts`, {
		next: { revalidate: 60 },
		headers: {
			storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
		},
	});

	const data = await res.json();

	return data;
};

export const getPostByLink = async (link: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_CMS}/api/blogposts/${link}`,
		{
			next: { revalidate: 60 },
			headers: {
				storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
			},
		},
	);

	if (res.status === 404) {
		return new Error('Post not found');
	}

	if (!res.ok) {
		return new Error('An error occurred while fetching the data');
	}

	const data = await res.json();

	return data;
};
