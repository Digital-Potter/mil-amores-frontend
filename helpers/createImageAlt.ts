const createImageAlt = (imageUri: string) => {
	const altText = imageUri
		.replace(`uploads/${process.env.NEXT_PUBLIC_CLIENT_ID}/`, '')
		.replace(/\.(webp|jpg|png|svg)/g, '')
		.replace(/-/g, ' ');

	return altText;
};

export default createImageAlt;
