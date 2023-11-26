import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import useApi from '@/utils/useApi';

import ResetPassView from './ResetPassword.view';

const ResetPassword = () => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

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

			console.log('User ID:', response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return <ResetPassView email={email} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />;
};

export default React.memo(ResetPassword);
