import React from 'react';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

// import Loading from '@/containers/Loading';
import { store } from './store/app';
import AppRouter from './App.router';

const App = () => {
	return (
		<Provider store={store}>
			{/* <Suspense fallback={<Loading />}> */}
			<AppRouter />
			{/* </Suspense> */}
		</Provider>
	);
};

App.displayName = 'App';
App.defaultProps = {};

export default React.memo(App);
