---
to: src/components/ui/<%= h.changeCase.pascalCase(name.toLowerCase()) %>/<%= h.changeCase.pascalCase(name.toLowerCase()) %>.test.tsx
---
<% name = name.toLowerCase() %>import React from 'react';
import { render } from '@testing-library/react';

import <%= h.changeCase.pascalCase(name) %> from './<%= h.changeCase.pascalCase(name) %>';

describe('<<%= h.changeCase.pascalCase(name) %>>', () => {
	it('Should render the component unchanged', () => {
		const { container } = render(<<%= h.changeCase.pascalCase(name) %> />);

		expect(container).toMatchSnapshot();
	});
});
