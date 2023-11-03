import React, { useState } from 'react';
import axios, { type AxiosError } from 'axios';

import ResetPassView from './ResetPass.view';

const ResetPass = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await axios
			.post(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/passwordresetrequest`, {
				email: email,
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
		setEmail(e.target.value);
	};

	return <ResetPassView email={email} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />;
};

ResetPass.displayName = 'ResetPass';
ResetPass.defaultProps = {};

export default React.memo(ResetPass);
