import React from 'react';

import classes from './Input.module.scss';

type TProps = {
	readonly inputName: string;
	readonly value: string;
	readonly type: string;
	readonly error: string | undefined;
	readonly firstErrorItem: string | undefined;
	readonly inputRef: React.RefObject<HTMLInputElement | null>;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputView = (props: TProps) => {
	return (
		<div className={classes['inputContainer']}>
			<input
				ref={(props.inputRef && props.inputRef) as React.RefObject<HTMLInputElement>}
				type={props.type}
				id={props.inputName}
				name={props.inputName}
				placeholder=" "
				value={props.value}
				onChange={props.handleInputChange}
			/>
			<label htmlFor={props.inputName}>
				{`${props.inputName.charAt(0).toUpperCase() + props.inputName.slice(1)}:`}
			</label>

			<span className={classes['inputContainer__error']}>{props.error}</span>
		</div>
	);
};

export default React.memo(InputView);
