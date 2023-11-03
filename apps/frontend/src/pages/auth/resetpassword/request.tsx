import React from 'react';
import type { NextPage } from 'next';

import ResetPass from '@/containers/Auth/ResetPass';

const resetPassPage: NextPage = () => {
	return <ResetPass />;
};

resetPassPage.displayName = 'resetPassPage';
resetPassPage.defaultProps = {};

export default resetPassPage;
