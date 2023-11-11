import React from 'react';

import hat from '@/assets/items-images/hat.png';
import belt from '@/assets/items-images/belt.png';
import vest from '@/assets/items-images/vest.png';
import nike from '@/assets/items-images/nike.png';
import vans from '@/assets/items-images/vans.png';
import milVest from '@/assets/items-images/milvest.png';

import classes from './ItemsShowcase.module.scss';

const ItemsShowcaseView = () => {
	const items = [
		{
			image: hat,
		},
		{
			image: belt,
		},
		{
			image: vest,
		},
		{
			image: nike,
		},
		{
			image: vans,
		},

		{
			image: milVest,
		},
	];

	return (
		<div className={classes['container']}>
			{items.map((item, index) => (
				<div className={classes['itemContainer']} key={index}>
					<img className={classes['itemContainer__image']} src={item.image} alt="sgasgas" />
				</div>
			))}
		</div>
	);
};

export default React.memo(ItemsShowcaseView);
