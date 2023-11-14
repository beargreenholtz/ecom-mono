---
to: src/components/containers/<%= h.changeCase.pascalCase(pageName.toLowerCase()) %>/<%= h.changeCase.pascalCase(containerName.toLowerCase()) %>/<%= h.changeCase.pascalCase(containerName.toLowerCase()) %>.tsx
---
<% name = containerName.toLowerCase() %>import React from 'react';

import <%= h.changeCase.pascalCase(name) %>View from './<%= h.changeCase.pascalCase(name) %>.view';

type TProps = {}

const <%= h.changeCase.pascalCase(name) %> = (props: TProps) => {
  return <<%= h.changeCase.pascalCase(name) %>View />;
};

export default React.memo(<%= h.changeCase.pascalCase(name) %>);
