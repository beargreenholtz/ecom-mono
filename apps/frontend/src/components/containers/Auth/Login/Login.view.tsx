import React from 'react';

import Input from '@/ui/Input';
import type { FormFields } from '@/types/user';
import classes from './Login.module.scss';

type TProps = {
	readonly formData: {
		email: string;
		password: string;
	};
	readonly errorForm: string;
	readonly showPassword: boolean;
	readonly isButtonDisabled: boolean;
	readonly errors: FormFields;
	readonly handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handlePasswordToggle: () => void;
	readonly handleClickGoogle: () => void;
	readonly handleOnClickPassReset: () => void;
};

const LoginView = (props: TProps) => {
	const firstObject = Object.keys(props.errors)[0];

	const takeover = () => {
		console.log('teatae');
	};

	return (
		<div className={classes['container']}>
			<div className={classes['loginContainer']}>
				<h2 className={classes['loginContainer__title']} onClick={takeover}>
					Login
				</h2>
				<form onSubmit={props.handleSubmit}>
					<Input
						type="email"
						error={props.errors['email']}
						value={props.formData.email}
						inputName="email"
						firstErrorItem={firstObject}
						onChangeInput={props.handleChangeInput}
					/>
					<Input
						type={props.showPassword ? 'text' : 'password'}
						value={props.formData.password}
						error={props.errors['password']}
						inputName="password"
						firstErrorItem={firstObject}
						onChangeInput={props.handleChangeInput}
					/>

					<button
						className={props.isButtonDisabled ? classes['disabled'] : ''}
						type="submit"
						disabled={props.isButtonDisabled}
					>
						Login
					</button>
				</form>
				<button type="button" onClick={props.handleClickGoogle}>
					Google
				</button>
				<button type="button" onClick={props.handleOnClickPassReset}>
					Reset Password
				</button>
				{props.errorForm && (
					<span className={classes['loginContainer__error']}>{props.errorForm}</span>
				)}
			</div>
		</div>
	);
};

export default React.memo(LoginView);
