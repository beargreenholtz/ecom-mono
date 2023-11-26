import React from 'react';

import classes from './ResetPasswordVerify.module.scss';

type TProps = {
	readonly error: string;
	readonly passwordInputState: string;
	readonly isSuccessPasswordResetState: boolean;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ResetPassVerifyView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<div className={classes['containerInner']}>
				<h2>New Password</h2>
				<form onSubmit={props.handleSubmit}>
					<div className={classes['inputContainer']}>
						<label htmlFor="newpassword">New Password</label>
						<input
							type="password"
							name="newpassword"
							value={props.passwordInputState}
							onChange={props.handleInputChange}
						/>
					</div>
					<button type="submit" className={classes['inputContainer__button']}>
						Submit
					</button>
				</form>
				{props.isSuccessPasswordResetState && <span>Password has been reset</span>}
				{props.error && <span>{props.error}</span>}
			</div>
		</div>
	);
};

export default React.memo(ResetPassVerifyView);
