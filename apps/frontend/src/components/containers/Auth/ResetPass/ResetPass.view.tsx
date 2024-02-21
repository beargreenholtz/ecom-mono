import React from 'react';

import classes from './ResetPass.module.scss';

type TProps = {
	readonly email: string;
	readonly errorForm: string;
	readonly isButtonDisabled: boolean;
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
					<button
						className={props.isButtonDisabled ? classes['disabled'] : ''}
						disabled={props.isButtonDisabled}
						type="submit"
					>
						Submit
					</button>
				</form>
				{props.errorForm && <p className={classes['containerInner__error']}>{props.errorForm}</p>}
			</div>
		</div>
	);
};

export default React.memo(ResetPassView);
