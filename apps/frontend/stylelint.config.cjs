module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	plugins: ['stylelint-declaration-strict-value'],
	rules: {
		'selector-class-pattern': [
			'^[a-z][A-Za-z0-9]*((--([a-z][A-Za-z0-9]*)(__([a-z][A-Za-z0-9]*))?)|(__([a-z][A-Za-z0-9]*)(--([a-z][A-Za-z0-9]*))?))?$',
		],
		'at-rule-empty-line-before': null,
		'property-no-vendor-prefix': null,
		'value-no-vendor-prefix': null,
		'selector-id-pattern': null,
		'color-named': ['never'],
		'declaration-block-no-duplicate-properties': [true],
		'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hwb'],
		'selector-pseudo-class-no-unknown': [true],

		'scss/operator-no-newline-after': null,
		'scss/at-import-partial-extension': null,
		'scss/percent-placeholder-pattern':
			/^_[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])$/,
	},
};
