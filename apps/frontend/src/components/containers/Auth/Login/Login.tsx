import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { passowrdvaliteregex } from '@/utils/password-validate';
import useApi from '@/utils/useApi';

import LoginView from './Login.view';

const Login = () => {
	const dispatch = useDispatch();

	const [formDataState, setformDataState] = useState({
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setformDataState((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formDataState.email.trim() === '' || formDataState.password.trim() === '') {
			console.error('All Inputs Required');

			return;
		}

		if (!passowrdvaliteregex.test(formDataState.password)) {
			console.error(
				'Password should have at least 1 lowercase, 1 uppercase, and 1 unique character, and be at least 8 characters long',
			);

			return;
		}

		console.log('Form data:', formDataState);

		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/login-generate-otp`,
					method: 'post',
					data: {
						email: formDataState.email,
						password: formDataState.password,
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			const encryptedOtpPayload = response.data.otp?.encryptedOtpPayload;

			window.location.href = `${import.meta.env.VITE_CLIENT_URL}/auth/otp/${encryptedOtpPayload}`;
		} catch (error) {
			console.error('An error occurred during otp:', error);
		}
	};

	const onClickGoogle = () => {
		window.open(`${import.meta.env.VITE_BACkEND_URL}/user/google-auth`, '_self');
	};

	const handleOnClickPassReset = () => {
		window.location.href = `${import.meta.env.VITE_CLIENT_URL}/auth/password-reset/request`;
	};

	return (
		<LoginView
			showPassword={showPassword}
			formData={formDataState}
			handlePasswordToggle={handlePasswordToggle}
			handleOnClickPassReset={handleOnClickPassReset}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
			handleClickGoogle={onClickGoogle}
		/>
	);
};

export default React.memo(Login);
