import React from 'react';

import classes from './Login.module.scss';

type TProps = {
	formData: {
		email: string;
		password: string;
	};
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	showPassword: boolean;
	handlePasswordToggle: () => void;
	onClickGoogle: () => void;
	handleOnClickPassReset: () => void;
};

const LoginView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<h2>Login</h2>
			<form onSubmit={props.onSubmit}>
				<div className={classes['inputContainer']}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						value={props.formData.email}
						onChange={props.onInputChange}
					/>
				</div>

				<div className={classes['inputContainer']}>
					<label htmlFor="password">Password:</label>
					<div className={classes['passwordInputContainer']}>
						<input
							type={props.showPassword ? 'text' : 'password'}
							id="password"
							name="password"
							value={props.formData.password}
							onChange={props.onInputChange}
						/>
					</div>
				</div>

				<button type="submit">Login</button>
			</form>
			<button type="button" onClick={props.onClickGoogle}>
				Google
			</button>
			<button type="button" onClick={props.handleOnClickPassReset}>
				Reset Password
			</button>
		</div>
	);
};

LoginView.displayName = 'LoginView';
LoginView.defaultProps = {};

export default React.memo(LoginView);
