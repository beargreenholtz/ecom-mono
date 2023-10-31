---
to: src/components/layout/<%= h.changeCase.pascalCase(name.toLowerCase()) %>/<%= h.changeCase.pascalCase(name.toLowerCase()) %>.view.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import classes from './<%= h.changeCase.pascalCase(name) %>.module.scss';

type TProps = {}

const <%= h.changeCase.pascalCase(name) %>View = (props: TProps) => {

  return <React.Fragment></React.Fragment>;
};

<%= h.changeCase.pascalCase(name) %>View.displayName = '<%= h.changeCase.pascalCase(name) %>View';
<%= h.changeCase.pascalCase(name) %>View.defaultProps = {};

export default React.memo(<%= h.changeCase.pascalCase(name) %>View);
