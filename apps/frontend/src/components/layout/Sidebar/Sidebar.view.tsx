import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Sidebar.module.scss';

const SidebarView = () => {
	return (
		<div className={classes['container']}>
			<NavLink className={classes['container__link']} to="/dashboard/users">
				Users
			</NavLink>
			<NavLink className={classes['container__link']} to="/dashboard/items">
				Items
			</NavLink>
			<NavLink className={classes['container__link']} to="/items">
				Orders
			</NavLink>
			<NavLink className={classes['container__link']} to="/items">
				Mail
			</NavLink>
			<NavLink className={classes['container__link']} to="/items">
				Reports
			</NavLink>
		</div>
	);
};

export default React.memo(SidebarView);
