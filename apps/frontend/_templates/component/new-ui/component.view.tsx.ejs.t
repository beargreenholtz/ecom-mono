---
to: src/components/ui/<%= h.changeCase.pascalCase(name.toLowerCase()) %>/<%= h.changeCase.pascalCase(name.toLowerCase()) %>.iew.tsx
---
<% name = name.toLowerCase() %>import React from 'react';

import classes from './<%= h.changeCase.pascalCase(name) %>.module.scss';

type TProps = {}

const <%= h.changeCase.pascalCase(name) %>iew = (props: TProps) => {
  return <React.Fragment></React.Fragment>;
};

export default React.memo(<%= h.changeCase.pascalCase(name) %>iew);
