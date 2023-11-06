import React, { useEffect, useState, type Dispatch } from 'react';
import axios, { AxiosError } from 'axios';
import { useDispatch, connect } from 'react-redux';

import useHttp from '@/utils/useHttp';
import useModal from '@/utils/useModal';
import * as authActions from '../../../../store/actions/auth';
import type * as fromApp from '../../../../store/app';

import RegisterView from './Register.view';

interface IPropsFromState {
	readonly isAuthenticated: boolean;
}

interface IPropsFromDispatch {
	loginSuccess: () => authActions.LoginSuccessAction;
}

interface TProps extends IPropsFromState, IPropsFromDispatch {}

const Register = (props: TProps) => {
	const dispatch = useDispatch();
	const [isShowingModal, toggleModal] = useModal();

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

		console.log(isShowingModal);

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	type TValidateInputs = {
		username: string;
		email: string;
		password: string;
		name: string;
		confirmPassword: string;
	};

	const validateInput = (inputs: TValidateInputs) => {
		if (
			inputs.username.trim() === '' ||
			inputs.email.trim() === '' ||
			inputs.name.trim() === '' ||
			inputs.password.trim() === ''
		) {
			console.error('All Inputs Required');

			return false;
		}

		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])\S{8,}$/.test(inputs.password)) {
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

		if (!validateInput(formData)) {
			return;
		}

		console.log('Form data:', formData);

		try {
			const response = await useHttp(
				{
					url: `${process.env.NEXT_PUBLIC_BACkEND_URL}/user/signup`,
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

			const tokenWithTime = {
				token: response?.headers.authorization,
				timestamp: new Date().getTime() + 30 * 60 * 1000,
			};

			localStorage.setItem('jwt_token', JSON.stringify(tokenWithTime));
			props.loginSuccess();
		} catch (error) {
			console.error('An error occurred during registration:', error);
		}
	};

	const onClickGoogle = () => {
		window.open(`${process.env.NEXT_PUBLIC_BACkEND_URL}/user/googleauth`, '_self');
	};

	const getUserFromGoogle = async () => {
		try {
			const url = `${process.env.NEXT_PUBLIC_BACkEND_URL}/user/success`;
			const response = await axios.get(url, { withCredentials: true });

			const tokenWithTime = {
				token: response.headers.authorization,
				timestamp: new Date().getTime() + 30 * 60 * 1000,
			};

			localStorage.setItem('jwt_token', JSON.stringify(tokenWithTime));
			props.loginSuccess();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserFromGoogle();
	}, []);

	return (
		<RegisterView
			showPassword={showPassword}
			formData={formData}
			isShowingModal={isShowingModal}
			handlePasswordToggle={handlePasswordToggle}
			toggleModal={toggleModal}
			onInputChange={handleInputChange}
			onSubmit={handleSubmit}
			onClickGoogle={onClickGoogle}
		/>
	);
};

Register.displayName = 'Register';
Register.defaultProps = {};

const mapStateToProps = (state: fromApp.RootState) => {
	return {
		isAuthenticated: state.user.isAuthenticated,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<authActions.AuthActionTypes>): IPropsFromDispatch => {
	return {
		loginSuccess: () => {
			dispatch(authActions.loginSuccess());

			return authActions.loginSuccess();
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Register));
