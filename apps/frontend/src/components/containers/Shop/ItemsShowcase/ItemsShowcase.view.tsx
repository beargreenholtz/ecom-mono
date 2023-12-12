import React from 'react';

import { NavLink } from 'react-router-dom';
import type { TItem } from '@/types/api/item';
import classes from './ItemsShowcase.module.scss';

type TProps = {
	readonly allItems: TItem[];
};

const ItemsShowcaseView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			{props.allItems.map((item, index) => (
				<NavLink className={classes['itemContainer']} key={index} to={`/items/${item.name}`}>
					<div className={classes['itemContainer__title']}>{item.name}</div>
					<img className={classes['itemContainer__image']} src={item.imageUrl} alt={item.name} />
				</NavLink>
			))}
		</div>
	);
};

export default React.memo(ItemsShowcaseView);
