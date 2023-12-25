import React from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/app';

import classes from './CartPopup.module.scss';

type Props = {
	readonly onClickChangeQuantity: (
		itemId: string,
		itemName: string,
		initialQuantity: number,
		targetQuantity: number,
	) => void;
	readonly isLoading: boolean;
	readonly error: string;
};

const CartPopupView = (props: Props) => {
	const cartItems = useSelector((state: RootState) => state.cart.cartItems);

	return (
		<div className={classes['container']}>
			<div className={classes['cardContainer']}>
				{cartItems.map((item) => {
					return (
						<div key={item.name} className={classes['itemContainer']}>
							<p>{item.name}</p>
							<div className={classes['itemContainer__quantityController']}>
								<select
									disabled={props.isLoading}
									onChange={(e) =>
										props.onClickChangeQuantity(
											item.productId,
											item.name,
											item.quantity,
											parseInt(e.target.value),
										)
									}
								>
									{[...new Array(100)]
										.map((_, i) => i + 1)
										.map((i) => (
											<option key={i} value={i} selected={item.quantity === i ?? true}>
												{i}
											</option>
										))}
								</select>
							</div>
						</div>
					);
				})}
				<p>{props.error}</p>
			</div>
		</div>
	);
};

export default React.memo(CartPopupView);
