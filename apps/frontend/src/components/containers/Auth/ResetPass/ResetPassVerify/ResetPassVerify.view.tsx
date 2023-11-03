import React from 'react';

import classes from './ResetPassVerify.module.scss';

type TProps = {
	readonly passwordInputState: string;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ResetPassVerifyView = (props: TProps) => {
	return (
		<div className={classes['container']}>
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
		</div>
	);
};

ResetPassVerifyView.displayName = 'ResetPassVerifyView';
ResetPassVerifyView.defaultProps = {};

export default React.memo(ResetPassVerifyView);
