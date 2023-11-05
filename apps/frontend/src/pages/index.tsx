import React from 'react';
import type { NextPage } from 'next';

import Register from '@/containers/Auth/Register';

const MainPage: NextPage = () => {
	return <Register />;
};

MainPage.displayName = 'MainPage';
MainPage.defaultProps = {};

export default MainPage;
