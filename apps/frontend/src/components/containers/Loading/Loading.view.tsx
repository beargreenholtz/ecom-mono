import React from 'react';
import classes from './Loading.module.scss';

const LoadingView = () => {
	return (
		<div className={classes['container']}>
			<div className={classes['pacMan']} />
		</div>
	);
};

LoadingView.displayName = 'LoadingView';

export default React.memo(LoadingView);
