import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { AxiosError, isAxiosError } from 'axios';
import useApi from '@/utils/useApi';
import ResetPassView from './ResetPass.view';

const ResetPass = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [errorForm, setErrorForm] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsButtonDisabled(true);
		setTimeout(() => {
			setIsButtonDisabled(false);
		}, 5000);

		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/password-reset-request`,
					method: 'post',
					data: {
						email: email,
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			console.log('User ID:', response);
		} catch (error) {
			if (isAxiosError(error)) {
				setErrorForm(error.response?.data?.message);
			}
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setErrorForm('');
	};

	return (
		<ResetPassView
			errorForm={errorForm}
			email={email}
			isButtonDisabled={isButtonDisabled}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(ResetPass);
