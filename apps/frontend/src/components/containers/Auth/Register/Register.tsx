/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import axios, { type AxiosError } from 'axios';
import RegisterView from './Register.view';

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
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

		if (
			formData.username.trim() === '' ||
			formData.email.trim() === '' ||
			formData.name.trim() === '' ||
			formData.password.trim() === ''
		) {
			console.error('All Inputs Required');

			return;
		}

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])\S{8,}$/.test(formData.password)) {
			console.error(
				'Password should have at least 1 lowercase, 1 uppercase, and 1 unique character, and be at least 8 characters long',
			);

			return;
		}

		if (formData.password !== formData.confirmPassword) {
			console.error('Passwords dont match');

			return;
		}

		console.log('Form data:', formData);

		await axios
			.post('http://localhost:5000/user/signup', {
				name: formData.username,
				username: formData.username,
				email: formData.email,
				password: formData.password,
			})
			.then(
				(res) => {
					const { userId, email, token } = res.data;

					console.log('Registration successful!');
					console.log('User ID:', userId);
					console.log('User Email:', email);
					console.log('JWT Token:', token);
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

	const onClickGoogle = () => {
		window.open(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/googleauth`, '_self');
	};

	const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.NEXT_PUBLIC_BACkEND_URL}/user/success`;
			const { data } = await axios.get(url, { withCredentials: true });

			setUser(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<RegisterView
			showPassword={showPassword}
			formData={formData}
			handlePasswordToggle={handlePasswordToggle}
			onInputChange={handleInputChange}
			onSubmit={handleSubmit}
			onClickGoogle={onClickGoogle}
		/>
	);
};

Register.displayName = 'Register';
Register.defaultProps = {};

export default React.memo(Register);
