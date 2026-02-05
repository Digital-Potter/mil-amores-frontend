export const truncateToLength = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	// Slice to max length, then remove partial word at the end
	return text.slice(0, maxLength).split(' ').slice(0, -1).join(' ') + ' ...';
};
