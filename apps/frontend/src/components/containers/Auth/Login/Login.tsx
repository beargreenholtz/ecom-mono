import React, { useState } from 'react';

import axios from 'axios';
import LoginView from './Login.view';

const Login = () => {
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

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])\S{8,}$/.test(formData.password)) {
			console.error(
				'Password should have at least 1 lowercase, 1 uppercase, and 1 unique character, and be at least 8 characters long',
			);

			return;
		}

		console.log('Form data:', formData);

		try {
			const response = await axios.post('http://localhost:5000/user/loginGenerateOtp', {
				email: formData.email,
				password: formData.password,
			});

			const token: string = response.data.otp.encryptedOtpPayload;

			window.location.href = `http://localhost/auth/otp/${token}`;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Error during registration:', error.response?.data?.message);
			} else {
				console.log('An unknown error occurred');
			}
		}
	};

	const onClickGoogle = () => {
		window.open(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/googleauth`, '_self');
	};

	const handleOnClickPassReset = () => {
		window.location.href = 'http://localhost/auth/resetpassword/request';
	};

	return (
		<LoginView
			showPassword={showPassword}
			formData={formData}
			handlePasswordToggle={handlePasswordToggle}
			handleOnClickPassReset={handleOnClickPassReset}
			onInputChange={handleInputChange}
			onSubmit={handleSubmit}
			onClickGoogle={onClickGoogle}
		/>
	);
};

Login.displayName = 'Login';
Login.defaultProps = {};

export default React.memo(Login);
