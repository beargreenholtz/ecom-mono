import React from 'react';

import LoginView from './Login.view';

type TProps = {};

const Login = (props: TProps) => {
	return <LoginView />;
};

Login.displayName = 'Login';
Login.defaultProps = {};

export default React.memo(Login);
