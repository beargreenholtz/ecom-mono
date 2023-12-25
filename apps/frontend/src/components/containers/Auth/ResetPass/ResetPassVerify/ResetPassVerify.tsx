import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import useApi from '@/utils/useApi';
import ResetPassVerifyView from './ResetPassVerify.view';

const ResetPassVerify = () => {
	const dispatch = useDispatch();

	const { token } = useParams();

	const [passwordInputState, setPasswordInputState] = useState('');
	const [isSuccesPasswordResetState, setIsSuccesPasswordResetState] = useState(false);
	const [errorState, setErrorState] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const decodedUrl = decodeURI(`${import.meta.env.VITE_BACkEND_URL}/user/password-reset/${token}`);

		errorState;

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

			'User ID:', response;
			setIsSuccesPasswordResetState(true);
		} catch (error) {
			if (error instanceof AxiosError) setErrorState(error.message);

			error;
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
