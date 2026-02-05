import { PageProps } from '@/types/pages';

export const getMenuPages = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_CMS}/api/pages/pages-menu`,
			{
				next: { revalidate: 60 },
				headers: {
					storedId:
						`${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
				},
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
			next: { revalidate: 60 },
			headers: {
				storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
			},
		});

		const data = await res.json();

		return data;
	} catch (error) {
		return new Error('An error occurred while fetching the data', {
			cause: error,
		});
	}
};

export const getPageByLink = async (
	link: string,
): Promise<PageProps | null> => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/pages/${link}`, {
		next: { revalidate: 60 },
		headers: {
			storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
		},
	});

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error('An error occurred while fetching the data');
	}

	const data = await res.json();

	return data;
};
