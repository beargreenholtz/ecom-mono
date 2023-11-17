import React from 'react';

import Modal from '@/ui/Modal';
import Input from '@/ui/Input';
import type { FormFields } from '@/types/user';

import classes from './Register.module.scss';

type TProps = {
	readonly formData: {
		username: string;
		email: string;
		name: string;
		password: string;
		confirmPassword: string;
	};
	readonly isButtonDisabled: boolean;
	readonly errorForm: string;
	readonly isShowPassword: boolean;
	readonly isShowingModal: boolean;
	readonly errors: FormFields;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handlePasswordToggle: () => void;
	readonly handleClickGoogle: () => void;
	readonly toggleModal: () => void;
};

const RegisterView = (props: TProps) => {
	const formFields = [
		{
			label: 'Username',
			type: 'text',
			id: 'username',
			name: 'username',
		},
		{
			label: 'Email',
			type: 'email',
			id: 'email',
			name: 'email',
		},
		{
			label: 'Name',
			type: 'text',
			id: 'name',
			name: 'name',
		},
		{
			label: 'Password',
			type: `${props.isShowPassword ? 'text' : 'password'}`,
			id: 'password',
			name: 'password',
		},
		{
			label: 'Confirm Password',
			type: `${props.isShowPassword ? 'text' : 'password'}`,
			id: 'confirmPassword',
			name: 'confirmPassword',
		},
	];

	const firstObject = Object.keys(props.errors)[0];

	return (
		<>
			<Modal isShow={props.isShowingModal} onClickCloseButton={props.toggleModal}>
				error
			</Modal>
			<div className={classes['container']}>
				<div className={classes['registerContainer']}>
					<h2 className={classes['registerContainer__title']}>Register</h2>
					<form onSubmit={props.handleSubmit}>
						<Input
							type="email"
							error={props.errors['email']}
							value={props.formData.email}
							handleInputChange={props.handleInputChange}
							inputName="email"
							firstErrorItem={firstObject}
						/>
						<Input
							type="text"
							error={props.errors['username']}
							value={props.formData.username}
							handleInputChange={props.handleInputChange}
							inputName="username"
							firstErrorItem={firstObject}
						/>
						<Input
							type="text"
							error={props.errors['name']}
							value={props.formData.name}
							handleInputChange={props.handleInputChange}
							inputName="name"
							firstErrorItem={firstObject}
						/>
						<Input
							type={props.isShowPassword ? 'text' : 'password'}
							error={props.errors['password']}
							value={props.formData.password}
							handleInputChange={props.handleInputChange}
							inputName="password"
							firstErrorItem={firstObject}
						/>
						<Input
							type={props.isShowPassword ? 'text' : 'password'}
							error={props.errors['confirmPassword']}
							value={props.formData.confirmPassword}
							handleInputChange={props.handleInputChange}
							inputName="confirmPassword"
							firstErrorItem={firstObject}
						/>

						<button
							type="button"
							className={classes['passwordToggle']}
							onClick={props.handlePasswordToggle}
						>
							{props.isShowPassword ? 'Hide' : 'Show'}
						</button>
						<button
							className={props.isButtonDisabled ? classes['disabled'] : ''}
							disabled={props.isButtonDisabled}
							type="submit"
						>
							Register
						</button>
					</form>
					<button type="submit" onClick={props.handleClickGoogle}>
						Google
					</button>
					{props.errorForm && (
						<span className={classes['registerContainer__error']}>{props.errorForm}</span>
					)}
				</div>
			</div>
		</>
	);
};

export default React.memo(RegisterView);
