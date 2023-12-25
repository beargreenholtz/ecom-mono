import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import * as cartActions from '@/store/actions/cart';
import type { TItem } from '@/types/api/item';
import useApi from '@/utils/useApi';

import ItemView from './Item.view';

const Item = () => {
	const dispatch = useDispatch();
	const { itemName, itemId } = useParams();

	const [itemState, setItemState] = useState<TItem>();
	const [quantityState, setQuantityState] = useState(0);

	const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (!isNaN(Number(inputValue))) {
			setQuantityState(Number(inputValue));
		}
	};

	const handleClickChangeQuantity = (direction: string) => {
		if (direction === 'plus') setQuantityState((prev) => prev + 1);
		else if (quantityState > 0) setQuantityState((prev) => prev - 1);
	};

	const fetchCategoryItems = async () => {
		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/item/get-item-by-name/${itemName}`,
					method: 'post',
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			if (!response?.data) {
				throw 'No Items';
			}

			setItemState(response.data.item);
		} catch (error) {
			console.error('An error occurred during otp:', error);
		}
	};

	const onClickAddToCart = async () => {
		console.log(itemState?._id);

		if (!itemName || !itemId) return;

		const itemInfo = {
			_id: itemId,
			name: itemName,
			quantity: quantityState,
		};

		dispatch(cartActions.cartItemsUpdate([itemInfo]));

		try {
			const userToken = localStorage.getItem('jwt_token');

			if (!userToken || !itemState) return;

			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/update-cart`,
					method: 'post',
					data: {
						items: [
							{
								productId: itemState._id,
								quantity: quantityState,
							},
						],
					},
					headers: {
						authorization: JSON.parse(userToken),
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}
		} catch (error) {
			console.error('An error occurred during adding item:', error);
		}
	};

	useEffect(() => {
		fetchCategoryItems();
	}, []);

	return (
		<ItemView
			quantity={quantityState}
			item={itemState}
			handleClickChangeQuantity={handleClickChangeQuantity}
			handleChangeQuantity={handleChangeQuantity}
			onClickAddToCart={onClickAddToCart}
		/>
	);
};

export default React.memo(Item);
