import React, { useState } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as authActions from '@/store/actions/auth';
import useApi from '@/utils/useApi';
import OtpView from './Otp.view';

const Otp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { otp } = useParams();

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [errorForm, setErrorForm] = useState('');

	let decodedUrl: string;

	if (typeof otp === 'string') {
		decodedUrl = decodeURI(otp);
	}

	const [inputOtpState, setInputOtpState] = useState(['', '', '', '', '', '']);

	const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pasteArray = e.clipboardData.getData('text').split('');

		setInputOtpState((prev) => [...prev.map((_, indexMap) => pasteArray[indexMap] || '')]);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		if (e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === 'insertFromPaste') return;

		setInputOtpState((prev) => [
			...prev.map((char, indexMap) => (indexMap === index ? e.target.value : char)),
		]);

		const nextInput = e.target.nextElementSibling;

		if (nextInput instanceof HTMLInputElement) {
			nextInput.focus();
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsButtonDisabled(true);
		setTimeout(() => {
			setIsButtonDisabled(false);
		}, 5000);

		if (inputOtpState.includes('')) {
			setErrorForm('Otp should be 6 characters');

			return;
		}

		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/login-otp`,
					method: 'post',
					data: {
						token: decodedUrl,
						otp: inputOtpState.join(''),
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			const jwttoken: string = response?.headers.authorization;

			dispatch(authActions.loginSuccess(jwttoken));

			navigate('/');
		} catch (error) {
			if (isAxiosError(error)) {
				setErrorForm(error.response?.data?.message);
			}
		}
	};

	return (
		<OtpView
			isButtonDisabled={isButtonDisabled}
			inputOtp={inputOtpState}
			errorForm={errorForm}
			handleInputPaste={handleInputPaste}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default React.memo(Otp);
