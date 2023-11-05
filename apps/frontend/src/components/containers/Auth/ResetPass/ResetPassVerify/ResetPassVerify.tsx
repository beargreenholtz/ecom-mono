import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import ResetPassVerifyView from './ResetPassVerify.view';

const ResetPassVerify = () => {
	const router = useRouter();

	const [passwordInputState, setPasswordInputState] = useState('');
	const [succesPasswordResetState, setSuccesPasswordResetState] = useState(false);
	const [errorState, setErrorState] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		const { token } = router.query;

		const decodedUrl = decodeURI(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/passwordreset/${token}`);

		console.log(errorState);

		e.preventDefault();

		try {
			const response = await axios.post(decodedUrl, {
				newPassword: passwordInputState,
			});
			ssda;
			console.log('User ID:', response);
			setSuccesPasswordResetState(true);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setErrorState(error.message);
			} else {
				setErrorState('Generic Error');
			}
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordInputState(e.target.value);
	};

	return (
		<ResetPassVerifyView
			error={errorState}
			passwordInputState={passwordInputState}
			succesPasswordReset={succesPasswordResetState}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

ResetPassVerify.displayName = 'ResetPassVerify';
ResetPassVerify.defaultProps = {};

export default React.memo(ResetPassVerify);
