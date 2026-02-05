export const getAllSliders = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CMS}/api/sliders`, {
		next: { revalidate: 60 },
		headers: {
			storedId: `${process.env.NEXT_PUBLIC_CLIENT_ID}` || 'PlitzTemplateUno',
		},
	});

	const data = await res.json();

	return data;
};
