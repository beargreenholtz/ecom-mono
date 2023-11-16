import React from 'react';

import classes from './Login.module.scss';

type TProps = {
	readonly formData: {
		email: string;
		password: string;
	};
	readonly errorForm: string;
	readonly showPassword: boolean;
	readonly isButtonDisabled: boolean;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handlePasswordToggle: () => void;
	readonly handleClickGoogle: () => void;
	readonly handleOnClickPassReset: () => void;
};

const LoginView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<div className={classes['loginContainer']}>
				<h2 className={classes['loginContainer__title']}>Login</h2>
				<form onSubmit={props.handleSubmit}>
					<div className={classes['inputContainer']}>
						<input
							type="email"
							id="email"
							name="email"
							placeholder=" "
							value={props.formData.email}
							onChange={props.handleInputChange}
						/>
						<label htmlFor="email">Email:</label>
					</div>

					<div className={classes['inputContainer']}>
						<input
							type={props.showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							placeholder=" "
							value={props.formData.password}
							onChange={props.handleInputChange}
						/>
						<label htmlFor="password">Password:</label>
					</div>

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
