import React, { type MouseEvent, type ReactNode } from 'react';
import ModalView from './Modal.view';

type TProps = {
	children: ReactNode;
	isShow: boolean;
	onClickCloseButton: () => void;
};

const Modal = (props: TProps) => {
	const handlClickModal = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	if (!props.isShow) {
		return null;
	}

	return (
		<ModalView
			isShow={props.isShow}
			handlClickModal={handlClickModal}
			onClickCloseButton={props.onClickCloseButton}
		>
			{props.children}
		</ModalView>
	);
};

export default React.memo(Modal);
