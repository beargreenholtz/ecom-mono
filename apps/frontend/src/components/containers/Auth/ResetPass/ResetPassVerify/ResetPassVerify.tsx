import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ResetPassVerifyView from './ResetPassVerify.view';

const ResetPassVerify = () => {
	const { token } = useParams();

	const [passwordInputState, setPasswordInputState] = useState('');
	const [succesPasswordResetState, setSuccesPasswordResetState] = useState(false);
	const [errorState, setErrorState] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		const decodedUrl = decodeURI(`${import.meta.env.VITE_BACkEND_URL}/user/passwordreset/${token}`);

		console.log(errorState);

		e.preventDefault();

		try {
			const response = await axios.post(decodedUrl, {
				newPassword: passwordInputState,
			});

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
