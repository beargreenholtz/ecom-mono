import React from 'react';

import classes from './Login.module.scss';

type TProps = {
	readonly formData: {
		email: string;
		password: string;
	};
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly showPassword: boolean;
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
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={props.formData.email}
							onChange={props.handleInputChange}
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
								onChange={props.handleInputChange}
							/>
						</div>
					</div>

					<button type="submit">Login</button>
				</form>
				<button type="button" onClick={props.handleClickGoogle}>
					Google
				</button>
				<button type="button" onClick={props.handleOnClickPassReset}>
					Reset Password
				</button>
			</div>
		</div>
	);
};

export default React.memo(LoginView);
