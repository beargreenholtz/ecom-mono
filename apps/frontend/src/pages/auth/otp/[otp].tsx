import React from 'react';
import type { NextPage } from 'next';

import Otp from '@/containers/Auth/Otp';

const otpPage: NextPage = () => {
	return <Otp />;
};

otpPage.displayName = 'otpPage';
otpPage.defaultProps = {};

export default otpPage;
