import React, { useEffect, useState } from 'react';
import axios, { AxiosError, isAxiosError } from 'axios';

import { useDispatch } from 'react-redux';

import useApi from '@/utils/useApi';
import useModal from '@/utils/useModal';
import type { TValidateInputs } from '@/types/user';
import { passowrdvaliteregex } from '@/utils/password-validate';
import * as authActions from '@/store/actions/auth';

import RegisterView from './Register.view';

const Register = () => {
	const dispatch = useDispatch();

	const [errorForm, setErrorForm] = useState('');
	const [isShowingModal, toggleModal] = useModal();

	const [formData, setFormData] = useState({
		username: '',
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const [isShowPassword, setIsShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setIsShowPassword(!isShowPassword);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setErrorForm('');

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const validateInput = (inputs: TValidateInputs) => {
		if (Object.values(inputs).some((value) => value.trim() === '')) {
			setErrorForm('All Inputs Required');

			return false;
		}

		if (!passowrdvaliteregex.test(inputs.password)) {
			setErrorForm(
				'Password should have at least 1 lowercase, 1 uppercase, and 1 unique character, and be at least 8 characters long',
			);

			return false;
		}

		if (inputs.password !== inputs.confirmPassword) {
			setErrorForm('Passwords dont match');

			return false;
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsButtonDisabled(true);
		setTimeout(() => {
			setIsButtonDisabled(false);
		}, 5000);

		if (!validateInput(formData)) {
			return;
		}

		console.log('Form data:', formData);

		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/signup`,
					method: 'post',
					data: {
						name: formData.username,
						username: formData.username,
						email: formData.email,
						password: formData.password,
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
			if (isAxiosError(error)) {
				setErrorForm(error.response?.data?.message);
			}
		}
	};

	const onClickGoogle = () => {
		window.open(`${import.meta.env.VITE_BACkEND_URL}/user/googleauth`, '_self');
	};

	//move to shop main page
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
			formData={formData}
			isShowingModal={isShowingModal}
			errorForm={errorForm}
			isButtonDisabled={isButtonDisabled}
			handlePasswordToggle={handlePasswordToggle}
			toggleModal={toggleModal}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
			handleClickGoogle={onClickGoogle}
		/>
	);
};

export default React.memo(Register);
