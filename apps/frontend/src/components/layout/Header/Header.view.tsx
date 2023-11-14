import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/app';
import Logo from '@/assets/logo.png';

import classes from './Header.module.scss';

type TProps = {
	readonly logout: () => void;
};
const HeaderView = (props: TProps) => {
	const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

	return (
		<div className={classes['container']}>
			<NavLink to="/" className={classes['navLink']}>
				<img src={Logo} alt="logo" className={classes['container__image']} />
			</NavLink>
			{!isAuth && (
				<div className={classes['linksContainer']}>
					<NavLink
						to="/auth/login"
						className={({ isActive }) =>
							`${classes['linksContainer__link']} ${
								isActive ? classes['linksContainer__link--active'] : ''
							}`
						}
					>
						LOGIN
					</NavLink>
					<NavLink
						to="/auth/register"
						className={({ isActive }) =>
							`${classes['linksContainer__link']} ${
								isActive ? classes['linksContainer__link--active'] : ''
							}`
						}
					>
						REGISTER
					</NavLink>
				</div>
			)}
			{isAuth && (
				<button type="button" className={classes['linksContainer__link']} onClick={props.logout}>
					Logout
				</button>
			)}
		</div>
	);
};

export default React.memo(HeaderView);
