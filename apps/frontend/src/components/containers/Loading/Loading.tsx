import React from 'react';

import LoadingView from './Loading.view';

const Loading = () => {
	return <LoadingView />;
};

Loading.displayName = 'Loading';
Loading.defaultProps = {};

export default React.memo(Loading);
