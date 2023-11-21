import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as authActions from '@/store/actions/auth';
import { useLocalStorage } from './hooks/useLocalStorage';

import AppRouter from './App.router';

const App = () => {
	const dispatch = useDispatch();

	const [storedData, persistData] = useLocalStorage('jwt_token');

	useEffect(() => {
		if (typeof storedData !== 'string') return;

		dispatch(authActions.loginSuccess(storedData));
	}, []);

	return <AppRouter />;
};

export default React.memo(App);
