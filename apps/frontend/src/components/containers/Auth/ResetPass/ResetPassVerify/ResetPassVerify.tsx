import React, { useState } from 'react';
import axios, { type AxiosError } from 'axios';
import { useRouter } from 'next/router';

import ResetPassVerifyView from './ResetPassVerify.view';

const ResetPassVerify = () => {
	const router = useRouter();

	const [passwordInputState, setPasswordInputState] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		const { token } = router.query;

		const decodedUrl = decodeURI(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/passwordreset/${token}`);

		console.log(decodedUrl);

		e.preventDefault();
		await axios
			.post(decodedUrl, {
				newPassword: passwordInputState,
			})
			.then(
				(res) => {
					console.log('User ID:', res);
				},
				(error: Error | AxiosError) => {
					if (axios.isAxiosError(error)) {
						console.error('Error during registration:', error?.response?.data?.message);
					} else {
						console.log('An unknown error occurred');
					}
				},
			);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordInputState(e.target.value);
	};

	return (
		<ResetPassVerifyView
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
			passwordInputState={passwordInputState}
		/>
	);
};

ResetPassVerify.displayName = 'ResetPassVerify';
ResetPassVerify.defaultProps = {};

export default React.memo(ResetPassVerify);
