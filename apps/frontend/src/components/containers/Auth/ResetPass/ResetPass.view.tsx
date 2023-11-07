import React from 'react';

import classes from './ResetPass.module.scss';

type TProps = {
	readonly email: string;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ResetPassView = (props: TProps) => {
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

ResetPassView.displayName = 'ResetPassView';
ResetPassView.defaultProps = {};

export default React.memo(ResetPassView);
