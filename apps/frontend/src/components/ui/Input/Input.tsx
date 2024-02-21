import React, { useState, useEffect, useRef } from 'react';

import InputView from './Input.view';

type TProps = {
	readonly inputName: string;
	readonly value: string;
	readonly type: string;
	readonly error: string | undefined;
	readonly firstErrorItem: string | undefined;
	readonly onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: TProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [error, setError] = useState(props.error);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError('');
		props.onChangeInput(e);
	};

	useEffect(() => {
		setError(props.error);

		if (props.error && props.firstErrorItem === props.inputName && inputRef.current) {
			inputRef.current.focus();
		}
	}, [props.error]);

	return (
		<InputView
			firstErrorItem={props.firstErrorItem}
			inputName={props.inputName}
			value={props.value}
			error={error}
			type={props.type}
			inputRef={inputRef}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(Input);
