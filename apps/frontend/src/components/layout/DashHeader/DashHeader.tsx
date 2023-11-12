import React from 'react';

import { useDispatch } from 'react-redux';
import * as authActions from '@/store/actions/auth';

import DashHeaderView from './DashHeader.view';

const DashHeader = () => {
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(authActions.logout());
	};

	return <DashHeaderView logout={logout} />;
};

export default React.memo(DashHeader);
