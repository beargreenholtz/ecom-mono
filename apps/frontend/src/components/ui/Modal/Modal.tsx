import React, { type MouseEvent, type ReactNode } from 'react';
import ModalView from './Modal.view';

type TProps = {
	children: ReactNode;
	isShow: boolean;
	onClickCloseButton: () => void;
};

const Modal = (props: TProps) => {
	const onClickModal = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	if (!props.isShow) {
		return null;
	}

	return (
		<ModalView
			isShow={props.isShow}
			onClickModal={onClickModal}
			onClickCloseButton={props.onClickCloseButton}
		>
			{props.children}
		</ModalView>
	);
};

export default React.memo(Modal);
