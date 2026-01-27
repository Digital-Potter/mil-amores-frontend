const createImageAlt = (imageUri: string) => {
	const altText = imageUri
		.replace('uploads/PlitzTemplateUno/', '')
		.replace(/\.(webp|jpg|png|svg)/g, '')
		.replace(/-/g, ' ');

	return altText;
};

export default createImageAlt;
