import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import useApi from '@/utils/useApi';

import ResetPassVerifyView from './ResetPassVerify.view';

const ResetPassVerify = () => {
	const { token } = useParams();

	const dispatch = useDispatch();

	const [passwordInputState, setPasswordInputState] = useState('');
	const [isSuccessPasswordResetState, setIsSuccessPasswordResetState] = useState(false);
	const [errorState, setErrorState] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		const decodedUrl = decodeURI(`${import.meta.env.VITE_BACkEND_URL}/user/password-reset/${token}`);

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

			setIsSuccessPasswordResetState(true);
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
			isSuccessPasswordResetState={isSuccessPasswordResetState}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(ResetPassVerify);
