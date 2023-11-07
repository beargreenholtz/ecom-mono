import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { passowrdvaliteregex } from '@/utils/password-validate';
import useApi from '@/utils/useApi';
import LoginView from './Login.view';

const Login = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.email.trim() === '' || formData.password.trim() === '') {
			console.error('All Inputs Required');

			return;
		}

		if (!passowrdvaliteregex.test(formData.password)) {
			console.error(
				'Password should have at least 1 lowercase, 1 uppercase, and 1 unique character, and be at least 8 characters long',
			);

			return;
		}

		console.log('Form data:', formData);

		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/loginGenerateOtp`,
					method: 'post',
					data: {
						email: formData.email,
						password: formData.password,
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			const token: string = response?.data.otp.encryptedOtpPayload;

			window.location.href = `${import.meta.env.VITE_CLIENT_URL}/auth/otp/${token}`;
		} catch (error) {
			console.error('An error occurred during otp:', error);
		}
	};

	const onClickGoogle = () => {
		window.open(`${import.meta.env.VITE_BACkEND_URL}/user/googleauth`, '_self');
	};

	const handleOnClickPassReset = () => {
		window.location.href = `${import.meta.env.VITE_CLIENT_URL}/auth/resetpassword/request`;
	};

	return (
		<LoginView
			showPassword={showPassword}
			formData={formData}
			handlePasswordToggle={handlePasswordToggle}
			handleOnClickPassReset={handleOnClickPassReset}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
			handleClickGoogle={onClickGoogle}
		/>
	);
};

export default React.memo(Login);
