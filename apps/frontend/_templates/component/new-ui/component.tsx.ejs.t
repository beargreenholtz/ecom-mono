---
to: src/components/ui/<%= h.changeCase.pascalCase(name.toLowerCase()) %>/<%= h.changeCase.pascalCase(name.toLowerCase()) %>.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import <%= h.changeCase.pascalCase(name) %>iew from './<%= h.changeCase.pascalCase(name) %>.iew';

type TProps = {}

const <%= h.changeCase.pascalCase(name) %> = (props: TProps) => {
  return <<%= h.changeCase.pascalCase(name) %>iew />;
};

export default React.memo(<%= h.changeCase.pascalCase(name) %>);
