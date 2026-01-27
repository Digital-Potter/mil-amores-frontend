import nextConfig from 'eslint-config-next';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = [
	...nextConfig,
	{
		plugins: {
			'unused-imports': unusedImports,
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			// Unused imports detection
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			// Import sorting
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},
];

export default eslintConfig;
