import { jsonLdHtml } from './structuredData';

describe('jsonLdHtml', () => {
	it('escapes "<" in generated objects and stays valid JSON', () => {
		const data = { name: '</script><script>alert(1)</script>' };
		const html = jsonLdHtml(data);
		expect(html).not.toContain('<');
		expect(JSON.parse(html)).toEqual(data);
	});

	it('escapes "<" in owner-written strings too', () => {
		expect(jsonLdHtml('{"a":"</script>"}')).toBe('{"a":"\\u003c/script>"}');
	});

	it('is empty for nothing', () => {
		expect(jsonLdHtml(null)).toBe('');
		expect(jsonLdHtml(undefined)).toBe('');
	});
});
