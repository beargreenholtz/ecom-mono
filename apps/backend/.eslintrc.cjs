module.exports = {
	root: true,
	extends: ['../../.eslintrc.cjs'],
	parserOptions: {
		ecmaVersion: 13,
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['node'],
	rules: {
		'node/no-sync': 'error',
	},
	overrides: [
		{
			files: ['./src/data/**/*.ts'],
			rules: {
				'max-lines': 'off',
			},
		},
	],
};
