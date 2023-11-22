import React, { type MouseEventHandler, type ReactNode } from 'react';
import * as ReactDOM from 'react-dom';

import classes from './Modal.module.scss';

type TProps = {
	readonly children: ReactNode;
	readonly isShow: boolean;
	readonly onClickCloseButton: MouseEventHandler<HTMLElement>;
	readonly handlClickModal: MouseEventHandler<HTMLElement>;
};

const ModalView = (props: TProps) => {
	return ReactDOM.createPortal(
		<div className={classes['modalWrapper']} onClick={props.onClickCloseButton}>
			<div className={classes['modal']} onClick={props.handlClickModal}>
				<div className={classes['modal__body']}>{props.children}</div>
				<div className={classes['footer']}>
					<button
						type="button"
						className={classes['footer__button']}
						onClick={props.onClickCloseButton}
					>
						Close Modal
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
};

ModalView.displayName = 'ModalView';
ModalView.defaultProps = {};

export default React.memo(ModalView);
