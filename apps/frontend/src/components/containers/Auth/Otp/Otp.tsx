import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import OtpView from './Otp.view';

const Otp = () => {
	const router = useRouter();

	const { otp } = router.query;

	let decodedUrl: string;

	if (typeof otp === 'string') {
		decodedUrl = decodeURI(otp);
	}

	const [inputOtpState, setInputOtpState] = useState(new Array(6).fill(''));

	const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pasteArray = e.clipboardData.getData('text').split('');

		setInputOtpState((prev) => [
			...prev.map((char, indexMap) => (char = pasteArray[indexMap] ? pasteArray[indexMap] : '')),
		]);
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

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/loginotp`, {
				token: decodedUrl,
				otp: inputOtpState.join(''),
			});

			console.log(response);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('Error during registration:', error.response?.data?.message);
			} else {
				console.log('An unknown error occurred');
			}
		}
	};

	return (
		<OtpView
			handleInputPaste={handleInputPaste}
			handleInputChange={handleInputChange}
			inputOtp={inputOtpState}
			handleSubmit={handleSubmit}
		/>
	);
};

Otp.displayName = 'Otp';
Otp.defaultProps = {};

export default React.memo(Otp);
