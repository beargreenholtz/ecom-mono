import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import useApi from '@/utils/useApi';
import ResetPassVerifyView from './ResetPassVerify.view';

const ResetPassVerify = () => {
	const { token } = useParams();

	const [passwordInputState, setPasswordInputState] = useState('');
	const [isSuccesPasswordResetState, setIsSuccesPasswordResetState] = useState(false);
	const [errorState, setErrorState] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		const dispatch = useDispatch();

		const decodedUrl = decodeURI(`${import.meta.env.VITE_BACkEND_URL}/user/passwordreset/${token}`);

		console.log(errorState);

		e.preventDefault();

		try {
			const response = await useApi(
				{
					url: decodedUrl,
					method: 'post',
					data: {
						newPassword: passwordInputState,
					},
				},
				dispatch,
			);

			console.log('User ID:', response);
			setIsSuccesPasswordResetState(true);
		} catch (error) {
			if (error instanceof AxiosError) setErrorState(error.message);

			console.log(error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordInputState(e.target.value);
	};

	return (
		<ResetPassVerifyView
			error={errorState}
			passwordInputState={passwordInputState}
			isSuccesPasswordReset={isSuccesPasswordResetState}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(ResetPassVerify);
