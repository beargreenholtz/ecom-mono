import React from 'react';

import Modal from '@/ui/Modal';

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

	return (
		<>
			<Modal isShow={props.isShowingModal} onClickCloseButton={props.toggleModal}>
				error
			</Modal>
			<div className={classes['container']}>
				<div className={classes['registerContainer']}>
					<h2 className={classes['registerContainer__title']}>Register</h2>
					<form onSubmit={props.handleSubmit}>
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
									onChange={props.handleInputChange}
								/>
							</div>
						))}
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
