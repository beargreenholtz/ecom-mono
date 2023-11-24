import React from 'react';

import { NavLink, useParams } from 'react-router-dom';
import type { TItem } from '@/types/api/item';

import classes from './Category.module.scss';

type TProps = {
	readonly items: TItem[] | undefined;
};

const CategoryView: React.FC<TProps> = (props: TProps) => {
	const { category } = useParams();

	return (
		<div className={classes['container']}>
			<h1 className={classes['container__title']}>{category}</h1>
			<div className={classes['innerContainer']}>
				{props.items &&
					props.items.map((item) => (
						<NavLink key={item.name} to={`/items/${item.name}`}>
							<div className={classes['itemContainer']} key={item.name + item.imageUrl}>
								<div className={classes['itemContainer__title']}>{item.name}</div>
								<img
									className={classes['itemContainer__image']}
									src={item.imageUrl}
									alt={item.name}
								/>
								<div className={classes['itemContainer__title']}>
									{`Price: ${item.price}`}
								</div>
							</div>
						</NavLink>
					))}
			</div>
		</div>
	);
};

export default React.memo(CategoryView);
