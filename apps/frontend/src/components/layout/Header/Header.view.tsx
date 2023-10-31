import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { concatClasses } from '@/utils/component';
import Svg from '@/ui/Svg';

import classes from './Header.module.scss';

type TProps = {
	readonly isMenuOpen: boolean;
	readonly isMenuVisible: boolean;
	readonly theme?: string;
	readonly float?: boolean;
	readonly fromNavMenu?: boolean;
	readonly onToggleMenu: () => void;
	readonly onCloseMenu: (linkName: string) => void;
};

const HeaderView = (props: TProps) => {
	const { route } = useRouter();

	const containerClass = concatClasses(
		classes,
		'container',
		props.isMenuOpen ? 'container--slideUp' : '',
		props.float ? 'container--float' : '',
		route.includes('contact') ? 'container--contact' : '',
	);

	const menuClass = concatClasses(
		classes,
		'container__menu',
		props.isMenuOpen || props.fromNavMenu ? 'container__menu--active' : '',
		props.theme === 'dark' ? 'container__menu--dark' : 'container__menu--light',
		props.fromNavMenu ? 'container__menu--fromNavMenu' : '',
		route !== '/contact' ? 'container__menu--hover' : '',
	);

	const logoClass = concatClasses(
		classes,
		'container__logo',
		props.theme === 'dark' ? 'container__logo--dark' : 'container__logo--light',
		props.fromNavMenu ? 'container__logo--fromNavMenu' : '',
		props.isMenuOpen ? 'container__logo--inMenu' : '',
	);

	const textClass = concatClasses(
		classes,
		'container__text',
		props.theme === 'dark' ? 'container__text--dark' : 'container__text--light',
		props.isMenuOpen ? 'container__text--inMenu' : '',
	);

	const mobileBurgerContainerClasses = concatClasses(
		classes,
		'mobileBurger',
		props.fromNavMenu ? 'mobileBurger--fromNavMenu' : '',
	);

	const mobileBurgerIconClasses = concatClasses(
		classes,
		'mobileBurger__icon',
		props.isMenuOpen ? 'mobileBurger__icon--active' : '',
		props.theme === 'dark' ? 'mobileBurger__icon--dark' : 'mobileBurger__icon--light',
	);

	return (
		<header className={containerClass}>
			<div className={mobileBurgerContainerClasses}>
				<button
					className={classes['mobileBurger__button']}
					type="button"
					onClick={props.onToggleMenu}
				>
					<Svg name="humburger" className={mobileBurgerIconClasses} />
				</button>
			</div>
			<button className={menuClass} type="button" onClick={props.onToggleMenu}>
				MENU
			</button>
			<Link
				className={logoClass}
				href="/"
				onClick={() => (props.isMenuOpen ? props.onCloseMenu('home') : null)}
			>
				AVIV SHILOH
			</Link>
			<a href="https://api.whatsapp.com/send?phone=972504949449" className={textClass}>
				CONTACT
			</a>
		</header>
	);
};

HeaderView.displayName = 'HeaderView';
HeaderView.defaultProps = {};

export default React.memo(HeaderView);
