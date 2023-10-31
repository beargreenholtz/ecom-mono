import React from 'react';
import type { NextPage } from 'next';

import Register from '@/containers/Auth/Register';

const registerPage: NextPage = () => {
	return <Register />;
};

registerPage.displayName = 'registerPage';
registerPage.defaultProps = {};

export default registerPage;
