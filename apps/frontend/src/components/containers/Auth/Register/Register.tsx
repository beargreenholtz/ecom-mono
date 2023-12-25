import React, { useEffect, useState } from 'react';
import axios, { AxiosError, isAxiosError } from 'axios';

import { useDispatch } from 'react-redux';

import useApi from '@/utils/useApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useModal from '@/utils/useModal';
import * as authActions from '@/store/actions/auth';
import useValidation from '@/utils/input-validate';

import RegisterView from './Register.view';

const Register = () => {
	const dispatch = useDispatch();
	const [storedData, persistData] = useLocalStorage('jwt_token');

	const [resetErrors, errors, handleValidation] = useValidation();

	const [errorForm, setErrorForm] = useState('');
	const [isShowingModal, toggleModal] = useModal();

	const [formData, setFormData] = useState({
		email: '',
		username: '',
		name: '',
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
		resetErrors();

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

		setIsButtonDisabled(true);
		setTimeout(() => {
			setIsButtonDisabled(false);
		}, 5000);

		'Form data:', formData;

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
		window.open(`${import.meta.env.VITE_BACkEND_URL}/user/google-auth`, '_self');
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
			error;
		}
	};

	useEffect(() => {
		getUserFromGoogle();
	}, []);

	return (
		<RegisterView
			errors={errors}
			isShowPassword={isShowPassword}
			formData={formData}
			isShowingModal={isShowingModal}
			errorForm={errorForm}
			isButtonDisabled={isButtonDisabled}
			handlePasswordToggle={handlePasswordToggle}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
			handleClickGoogle={onClickGoogle}
			onClickCloseButton={toggleModal}
		/>
	);
};

export default React.memo(Register);
