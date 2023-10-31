import React from 'react';
import type { NextPage } from 'next';

import Login from '@/containers/Auth/Login';

const loginPage: NextPage = () => {
	return <Login />;
};

loginPage.displayName = 'loginPage';
loginPage.defaultProps = {};

export default loginPage;
