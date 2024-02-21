import React from 'react';

import Modal from '@/ui/Modal';
import Input from '@/ui/Input';
import type { FormFields } from '@/types/api/user';

import classes from './Register.module.scss';

type TProps = {
	readonly formData: {
		readonly username: string;
		readonly email: string;
		readonly name: string;
		readonly password: string;
		readonly confirmPassword: string;
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
	readonly onClickCloseButton: () => void;
};

const RegisterView = (props: TProps) => {
	const firstObject = Object.keys(props.errors)[0];

	return (
		<>
			<Modal isShow={props.isShowingModal} onClickCloseButton={props.onClickCloseButton}>
				error
			</Modal>
			<div className={`${classes['container']} ${classes['glow']}`}>
				<div className={classes['registerContainer']}>
					<h2 className={classes['registerContainer__title']}>Register</h2>
					<form onSubmit={props.handleSubmit}>
						<Input
							type="email"
							error={props.errors['email']}
							value={props.formData.email}
							inputName="email"
							firstErrorItem={firstObject}
							onChangeInput={props.handleInputChange}
						/>
						<Input
							type="text"
							error={props.errors['username']}
							value={props.formData.username}
							inputName="username"
							firstErrorItem={firstObject}
							onChangeInput={props.handleInputChange}
						/>
						<Input
							type="text"
							error={props.errors['name']}
							value={props.formData.name}
							inputName="name"
							firstErrorItem={firstObject}
							onChangeInput={props.handleInputChange}
						/>
						<Input
							type={props.isShowPassword ? 'text' : 'password'}
							error={props.errors['password']}
							value={props.formData.password}
							inputName="password"
							firstErrorItem={firstObject}
							onChangeInput={props.handleInputChange}
						/>
						<Input
							type={props.isShowPassword ? 'text' : 'password'}
							error={props.errors['confirmPassword']}
							value={props.formData.confirmPassword}
							inputName="confirmPassword"
							firstErrorItem={firstObject}
							onChangeInput={props.handleInputChange}
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
