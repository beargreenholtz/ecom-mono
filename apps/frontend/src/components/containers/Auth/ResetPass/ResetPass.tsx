import React, { useState } from 'react';
import axios from 'axios';

import ResetPassView from './ResetPass.view';

const ResetPass = () => {
	const [email, setEmail] = useState('');

	console.log(import.meta.env.VITE_VITE_BACkEND_URL);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACkEND_URL}/user/passwordresetrequest`,
				{
					email: email,
				},
			);

			console.log('User ID:', response);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Error during registration:', error.response?.data?.message);
			} else {
				console.error('An unknown error occurred');
			}
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	return <ResetPassView email={email} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />;
};

ResetPass.displayName = 'ResetPass';
ResetPass.defaultProps = {};

export default React.memo(ResetPass);
