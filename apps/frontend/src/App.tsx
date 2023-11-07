import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/app';
import AppRouter from './App.router';

const App = () => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};

export default React.memo(App);
