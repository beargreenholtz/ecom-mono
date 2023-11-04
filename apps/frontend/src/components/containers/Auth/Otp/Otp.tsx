import React, { useState } from 'react';
import axios, { type AxiosError } from 'axios';

import OtpView from './Otp.view';

const Otp = () => {
	const [inputOtpState, setInputOtpState] = useState(new Array(6).fill(''));

	const handleInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		console.log(e.clipboardData.getData('text'));

		const pasteArray = e.clipboardData.getData('text').split('');

		const finalArray: string[] = [];

		for (let i = 0; i < 6; i++) {
			if (!pasteArray[i]) {
				finalArray.push('');
			} else {
				finalArray.push(pasteArray[i]);
			}
		}

		console.log(finalArray);

		setInputOtpState(() => {
			return finalArray;
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		setInputOtpState((prev) => [
			...prev.map((char, indexMap) => (indexMap === index ? e.target.value : char)),
		]);

		console.log(e.target.value);
		const nextInput = e.target.nextElementSibling as HTMLInputElement | null;

		if (nextInput) {
			nextInput.focus();
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		axios
			.post(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/loginotp`, {
				otp: inputOtpState.join(''),
				email: 'bare1212@gmail.com',
			})
			.then(
				(res) => {
					console.log(res);
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
