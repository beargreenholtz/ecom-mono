import React from 'react';

import Login from '@/containers/Auth/Login';

interface IProps {}

const LoginPage: React.FC<IProps> = () => {
	return <Login />;
};

LoginPage.displayName = 'LoginPage';
LoginPage.defaultProps = {};

export default LoginPage;
