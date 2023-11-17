import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as authActions from '@/store/actions/auth';

import AppRouter from './App.router';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('jwt_token');

		if (!token) return;

		dispatch(authActions.loginSuccess(token));
	}, []);

	return <AppRouter />;
};

export default React.memo(App);
