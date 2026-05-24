const createImageAlt = (imageUri: string) => {
	if (!imageUri) return '';
	const basename = imageUri.split('/').pop() ?? imageUri;
	return basename
		.replace(/\.(webp|jpg|jpeg|png|svg)$/i, '')
		.replace(/[-_]/g, ' ');
};

export default createImageAlt;
