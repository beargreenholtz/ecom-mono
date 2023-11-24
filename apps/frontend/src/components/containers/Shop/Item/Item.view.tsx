import React, { type ChangeEvent } from 'react';

import { NavLink } from 'react-router-dom';
import type { TItem } from '@/types/api/item';

import classes from './Item.module.scss';

type TProps = {
	readonly item: TItem | undefined;
	readonly quantity: number;
	readonly handleClickChangeQuantity: (direction: string) => void;
	readonly handleChangeQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ItemView = (props: TProps) => {
	if (!props.item) return <p>no item</p>;

	return (
		<div className={classes['container']}>
			<div className={classes['innerContainer']}>
				<div className={classes['leftContainer']}>
					<img
						className={classes['leftContainer__image']}
						src={props.item.imageUrl}
						alt={props.item.name}
					/>
				</div>
				<div className={classes['rightContainer']}>
					<NavLink
						className={classes['rightContainer__category']}
						to={`../category/${props.item.category}`}
					>
						{props.item.category}
					</NavLink>
					<div className={classes['description']}>
						<h1 className={classes['description__title']}>{props.item.name}</h1>
						<div className={classes['description__title']}>{`$${props.item.price}`}</div>
					</div>
					<div className={classes['addToCartContainer']}>
						<div className={classes['quantityContainer']}>
							<button
								type="button"
								className={classes['quantityContainer__button']}
								onClick={() => props.handleClickChangeQuantity('minus')}
							>
								-
							</button>
							<input
								value={props.quantity}
								type="text"
								className={classes['quantityContainer__input']}
								onChange={props.handleChangeQuantity}
							/>
							<button
								type="button"
								className={classes['quantityContainer__button']}
								onClick={() => props.handleClickChangeQuantity('plus')}
							>
								+
							</button>
						</div>
						<button type="button" className={classes['addToCartContainer__button']}>
							Add To Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(ItemView);
