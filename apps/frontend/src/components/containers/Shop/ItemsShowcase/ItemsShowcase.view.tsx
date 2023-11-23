import React from 'react';

import type { TItem } from '@/types/api/item';
import classes from './ItemsShowcase.module.scss';

type TProps = {
	readonly allItems: TItem[];
};

const ItemsShowcaseView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			{props.allItems.map((item, index) => (
				<div className={classes['itemContainer']} key={index}>
					<div className={classes['itemContainer__title']}>{item.name}</div>
					<img className={classes['itemContainer__image']} src={item.imageUrl} alt={item.name} />
				</div>
			))}
		</div>
	);
};

export default React.memo(ItemsShowcaseView);
