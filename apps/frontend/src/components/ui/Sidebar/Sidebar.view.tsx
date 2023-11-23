import React from 'react';
import { NavLink } from 'react-router-dom';

import { links } from '@/data/sidebarLinks';

import classes from './Sidebar.module.scss';

const SidebarView = () => {
	return (
		<div className={classes['container']}>
			{links.map((link) => {
				<NavLink className={classes['container__link']} to={link.to}>
					{link.name}
				</NavLink>;
			})}
		</div>
	);
};

export default React.memo(SidebarView);
