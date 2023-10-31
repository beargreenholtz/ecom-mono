import React, { useState } from 'react';
import { useRouter } from 'next/router';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as menuActions from '../../../store/actions/menu';
import type * as fromApp from '../../../store/app';

import HeaderView from './Header.view';

type TProps =FromState {
	readonly isMenuOpen: boolean;
}

type TProps =FromDispatch {
	toggelMenu: (isMenuOpen: boolean) => menuActions.ToggleMenu;
}

type TProps = extends IPropsFromState, IPropsFromDispatch {
	readonly theme?: string;
	readonly float?: boolean;
	readonly fromNavMenu?: boolean;
}

const Header = (props: TProps) => {
	const { route } = useRouter();

	const [isMenuVisibleState, setIsMenuVisibleState] = useState<boolean>(false);

	const onToggleMenu = () => {
		if (props.isMenuOpen) {
			setIsMenuVisibleState(() => false);
			setTimeout(() => props.toggelMenu(false), 700);
			document.body.style.overflow = 'auto';
		} else {
			setTimeout(() => document.body?.scrollTo(0, 0), 1000);
			document.body.style.overflow = 'hidden';
			props.toggelMenu(true);
			setIsMenuVisibleState(() => true);
		}
	};

	const onCloseMenu = (linkName: string) => {
		const lowerCaseLinkName = linkName.toLowerCase();

		if (route.includes(lowerCaseLinkName)) {
			onToggleMenu();
		}

		if (lowerCaseLinkName === 'home' && route === '/') {
			onToggleMenu();
		}

		setTimeout(() => props.toggelMenu(false), 700);
	};

	return (
		<HeaderView
			isMenuOpen={props.isMenuOpen}
			isMenuVisible={isMenuVisibleState}
			theme={props.theme}
			float={props.float}
			fromNavMenu={props.fromNavMenu}
			onToggleMenu={onToggleMenu}
			onCloseMenu={onCloseMenu}
		/>
	);
};

Header.displayName = 'Header';
Header.defaultProps = {};

const mapStateToProps = (state: fromApp.RootState) => {
	return {
		isMenuOpen: state.user.isMenuOpen,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<menuActions.UserTypes>): IPropsFromDispatch => {
	return {
		toggelMenu: (isMenuOpen: boolean): menuActions.ToggleMenu =>
			dispatch(menuActions.toggleMenu(isMenuOpen)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
