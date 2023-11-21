import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import useApi from '@/utils/useApi';
import useModal from '@/utils/useModal';
import type { TValidateInputs } from '@/types/user';
import { passowrdvaliteregex } from '@/utils/password-validate';
import * as authActions from '@/store/actions/auth';

import RegisterView from './Register.view';

const Register = () => {
	const dispatch = useDispatch();

	const [isShowingModal, toggleModal] = useModal();

	const [formDataState, setformDataState] = useState({
		username: '',
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [isShowPassword, setIsShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setIsShowPassword(!isShowPassword);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		console.log(isShowingModal);

		setformDataState((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const validateInput = (inputs: TValidateInputs) => {
		if (Object.values(inputs).some((value) => value.trim() === '')) {
			console.error('All Inputs Required');

			return false;
		}

		if (!passowrdvaliteregex.test(inputs.password)) {
			console.error(
				'Password should have at least 1 lowercase, 1 uppercase, and 1 unique character, and be at least 8 characters long',
			);

			return false;
		}

		if (inputs.password !== inputs.confirmPassword) {
			console.error('Passwords dont match');

			return false;
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateInput(formDataState)) {
			return;
		}

		console.log('Form data:', formDataState);

		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/signup`,
					method: 'post',
					data: {
						name: formDataState.username,
						username: formDataState.username,
						email: formDataState.email,
						password: formDataState.password,
					},
				},
				dispatch,
				toggleModal,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			const token: string = response?.headers.authorization;

			dispatch(authActions.loginSuccess(token));
		} catch (error) {
			console.error('An error occurred during registration:', error);
		}
	};

	const onClickGoogle = () => {
		window.open(`${import.meta.env.VITE_BACkEND_URL}/user/google-auth`, '_self');
	};

	const getUserFromGoogle = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BACkEND_URL}/user/success`, {
				withCredentials: true,
			});

			if (response instanceof AxiosError) {
				throw response;
			}

			const token = response?.headers.authorization;

			dispatch(authActions.loginSuccess(token));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserFromGoogle();
	}, []);

	return (
		<RegisterView
			isShowPassword={isShowPassword}
			formData={formDataState}
			isShowingModal={isShowingModal}
			handlePasswordToggle={handlePasswordToggle}
			toggleModal={toggleModal}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
			handleClickGoogle={onClickGoogle}
		/>
	);
};

export default React.memo(Register);
