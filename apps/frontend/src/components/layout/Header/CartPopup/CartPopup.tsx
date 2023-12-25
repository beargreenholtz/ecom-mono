import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import * as cartActions from '@/store/actions/cart';
import useApi from '@/utils/useApi';

import CartPopupView from './CartPopup.view';

const CartPopup = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const userToken = localStorage.getItem('jwt_token');

	const updateCartDatabase = async (id: string, quantity: number) => {
		try {
			setIsLoading(true);

			if (!userToken) return;

			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/update-cart`,
					method: 'post',
					data: {
						items: [
							{
								productId: id,
								quantity,
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

			setIsLoading(false);

			setError('');

			return response;
		} catch (error) {
			setIsLoading(false);

			if (error instanceof AxiosError) {
				setError(error.response?.data.message);
			}

			console.error('An error occurred during adding item:', error);
		}
	};

	const onClickChangeQuantity = async (
		itemId: string,
		itemName: string,
		initialQuantity: number,
		targetQuantity: number,
	) => {
		const data = await updateCartDatabase(itemId, targetQuantity - initialQuantity);

		if (data && data.status !== 200) return;

		dispatch(
			cartActions.cartItemsUpdate([
				{
					productId: itemId,
					name: itemName,
					quantity: targetQuantity - initialQuantity,
				},
			]),
		);
	};

	return (
		<CartPopupView isLoading={isLoading} error={error} onClickChangeQuantity={onClickChangeQuantity} />
	);
};

export default React.memo(CartPopup);
