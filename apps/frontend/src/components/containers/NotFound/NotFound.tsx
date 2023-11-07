import React from 'react';

import NotFoundView from './NotFound.view';

const NotFound = () => {
	return <NotFoundView />;
};

NotFound.displayName = 'NotFound';
NotFound.defaultProps = {};

export default React.memo(NotFound);
