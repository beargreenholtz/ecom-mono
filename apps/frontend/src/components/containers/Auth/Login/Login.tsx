import React, { useState } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import { passowrdvaliteregex } from '@/utils/password-validate';
import useValidation from '@/utils/input-validate';
import useApi from '@/utils/useApi';
import LoginView from './Login.view';

const Login = () => {
	const dispatch = useDispatch();

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [resetErrors, errors, handleValidation] = useValidation();

	const [errorForm, setErrorForm] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		resetErrors();

		setErrorForm('');

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!handleValidation(formData)) {
			return;
		}

		if (formData.email.trim() === '' || formData.password.trim() === '') {
			setErrorForm('All Inputs Required');

			return;
		}

		if (!passowrdvaliteregex.test(formData.password)) {
			setErrorForm(
				'Password should have at least 1 lowercase, 1 uppercase, and 1 unique character, and be at least 8 characters long',
			);

			return;
		}

		setIsButtonDisabled(true);
		setTimeout(() => {
			setIsButtonDisabled(false);
		}, 5000);

		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/login-generate-otp`,
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

			if (!response) throw 'no response';

			const encryptedOtpPayload = response.data.otp?.encryptedOtpPayload;

			window.location.href = `${import.meta.env.VITE_CLIENT_URL}/auth/otp/${encryptedOtpPayload}`;
		} catch (error) {
			if (isAxiosError(error)) {
				setErrorForm(error.response?.data?.message);
			}
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
			formData={formData}
			errorForm={errorForm}
			isButtonDisabled={isButtonDisabled}
			errors={errors}
			handlePasswordToggle={handlePasswordToggle}
			handleOnClickPassReset={handleOnClickPassReset}
			handleSubmit={handleSubmit}
			handleClickGoogle={onClickGoogle}
			handleChangeInput={handleInputChange}
		/>
	);
};

export default React.memo(Login);
