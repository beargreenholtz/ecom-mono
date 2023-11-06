import { useState } from 'react';

const useModal = (): [boolean, () => void] => {
	const [isShowing, setIsShowing] = useState(false);

	const toggle = (): void => {
		setIsShowing(!isShowing);
	};

	return [isShowing, toggle];
};

export default useModal;
