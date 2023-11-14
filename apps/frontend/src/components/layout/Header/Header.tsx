import React from 'react';
import { useDispatch } from 'react-redux';

import * as authActions from '@/store/actions/auth';

import HeaderView from './Header.view';

const Header = () => {
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(authActions.logout());
	};

	return <HeaderView logout={logout} />;
};

export default React.memo(Header);
