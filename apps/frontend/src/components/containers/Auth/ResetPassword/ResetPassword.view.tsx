import React from 'react';

import classes from './ResetPassword.module.scss';

type TProps = {
	readonly email: string;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ResetPasswordView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<div className={classes['containerInner']}>
				<h2>Reset Password</h2>
				<form onSubmit={props.handleSubmit}>
					<div className={classes['inputContainer']}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							value={props.email}
							onChange={props.handleInputChange}
						/>
					</div>
					<button type="submit" className={classes['inputContainer__button']}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default React.memo(ResetPasswordView);
