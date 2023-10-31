module.exports = {
	'apps/frontend/**/*.js': [
		'yarn pnpify eslint --config ./.eslintrc.cjs --ignore-path ./.eslintignore --fix',
		() => 'tsc --noEmit',
	],
	'apps/frontend/**/*.{ts,js,cjs,json,yaml}': 'yarn prettier --write',
	'apps/frontend/**/*': 'yarn inflint --config ./inflint.config.ts',
	'apps/frontend/src/**/*.scss': 'yarn stylelint --config ./apps/frontend/stylelint.config.cjs --fix',
};
