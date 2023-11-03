import React from 'react';
import type { NextPage } from 'next';

import ResetPassVerify from '@/containers/Auth/ResetPass/ResetPassVerify';

const resetPassVerifyPage: NextPage = () => {
	return <ResetPassVerify />;
};

resetPassVerifyPage.displayName = 'resetPassVerifyPage';
resetPassVerifyPage.defaultProps = {};

export default resetPassVerifyPage;
