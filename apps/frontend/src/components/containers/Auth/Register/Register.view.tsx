import React from 'react';

import Modal from '@/ui/Modal';

import classes from './Register.module.scss';

type TProps = {
	formData: {
		username: string;
		email: string;
		name: string;
		password: string;
		confirmPassword: string;
	};
	showPassword: boolean;
	isShowingModal: boolean;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	handlePasswordToggle: () => void;
	onClickGoogle: () => void;
	toggleModal: () => void;
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
			type: `${props.showPassword ? 'text' : 'password'}`,
			id: 'password',
			name: 'password',
		},
		{
			label: 'Confirm Password',
			type: `${props.showPassword ? 'text' : 'password'}`,
			id: 'confirmPassword',
			name: 'confirmPassword',
		},
	];

	return (
		<>
			<Modal isShow={!props.isShowingModal} onClickCloseButton={props.toggleModal}>
				error
			</Modal>
			<div className={classes['container']}>
				<div className={classes['registerContainer']}>
					<h2 className={classes['registerContainer__title']}>Register</h2>
					<form onSubmit={props.onSubmit}>
						{formFields.map((field) => (
							<div className={classes['inputContainer']} key={field.name}>
								<label className={classes['inputContainer__label']} htmlFor={field.id}>
									{field.label}
								</label>
								<input
									className={classes['inputContainer__input']}
									type={field.type}
									id={field.id}
									name={field.name}
									value={props.formData[field.name as keyof typeof props.formData]}
									onChange={props.onInputChange}
								/>
							</div>
						))}
						<button
							type="button"
							className={classes['passwordToggle']}
							onClick={props.handlePasswordToggle}
						>
							{props.showPassword ? 'Hide' : 'Show'}
						</button>
						<button type="submit">Register</button>
					</form>
					<button type="submit" onClick={props.onClickGoogle}>
						Google
					</button>
				</div>
			</div>
		</>
	);
};

RegisterView.displayName = 'RegisterView';
RegisterView.defaultProps = {};

export default React.memo(RegisterView);
