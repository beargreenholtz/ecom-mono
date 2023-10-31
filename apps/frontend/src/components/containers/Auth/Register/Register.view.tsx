import React from 'react';
import classes from './Register.module.scss';

type TProps = {
	formData: {
		username: string;
		email: string;
		name: string;
		password: string;
		confirmPassword: string;
	};
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	showPassword: boolean;
	handlePasswordToggle: () => void;
	onClickGoogle: () => void;
};

const RegisterView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<h2>Register</h2>
			<form onSubmit={props.onSubmit}>
				<div className={classes['inputContainer']}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						name="username"
						value={props.formData.username}
						onChange={props.onInputChange}
					/>
				</div>

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
					<label htmlFor="name">Name:</label>
					<input
						type="text"
						id="name"
						name="name"
						value={props.formData.name}
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

				<div className={classes['inputContainer']}>
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						type={props.showPassword ? 'text' : 'password'}
						id="confirmPassword"
						name="confirmPassword"
						value={props.formData.confirmPassword}
						onChange={props.onInputChange}
					/>
					<button
						type="button"
						className={classes['passwordToggle']}
						onClick={props.handlePasswordToggle}
					>
						{props.showPassword ? 'Hide' : 'Show'}
					</button>
				</div>

				<button type="submit">Register</button>
			</form>
			<button type="submit" onClick={props.onClickGoogle}>
				Google
			</button>
		</div>
	);
};

RegisterView.displayName = 'RegisterView';
RegisterView.defaultProps = {};

export default React.memo(RegisterView);
