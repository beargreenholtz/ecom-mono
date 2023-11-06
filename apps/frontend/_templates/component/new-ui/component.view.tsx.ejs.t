---
to: src/components/ui/<%= h.changeCase.pascalCase(name.toLowerCase()) %>/<%= h.changeCase.pascalCase(name.toLowerCase()) %>.iew.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import classes from './<%= h.changeCase.pascalCase(name) %>.module.scss';

type TProps = {}

const <%= h.changeCase.pascalCase(name) %>iew = (props: TProps) => {
  return <React.Fragment></React.Fragment>;
};

<%= h.changeCase.pascalCase(name) %>iew.displayName = '<%= h.changeCase.pascalCase(name) %>iew';
<%= h.changeCase.pascalCase(name) %>iew.defaultProps = {};

export default React.memo(<%= h.changeCase.pascalCase(name) %>iew);
