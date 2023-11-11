import React from 'react';

import { NavLink } from 'react-router-dom';
import Logo from '@/assets/logo.png';

import classes from './DashHeader.module.scss';

const DashHeaderView = () => {
	return (
		<div className={classes['container']}>
			<NavLink to="/" className={classes['navLink']}>
				<img src={Logo} alt="logo" className={classes['container__image']} />
			</NavLink>
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
		</div>
	);
};

export default React.memo(DashHeaderView);
