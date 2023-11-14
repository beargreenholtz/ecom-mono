import React from 'react';

import classes from './Otp.module.scss';

type TProps = {
	readonly inputOtp: string[];
	readonly handleInputPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
};

const OtpView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<div className={classes['containerOtp']}>
				<form onSubmit={props.handleSubmit}>
					<div className={classes['inputContainer']}>
						<label>One Time Password</label>
						<div className={classes['inputContainer__otp']}>
							{props.inputOtp.map((data: string, index: number) => {
								return (
									<input
										className="otp-field"
										type="text"
										name="otp"
										maxLength={1}
										key={index}
										value={data}
										onPaste={(e) => props.handleInputPaste(e)}
										onChange={(e) => props.handleInputChange(e, index)}
										onFocus={(e) => e.target.select()}
									/>
								);
							})}
						</div>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default React.memo(OtpView);
