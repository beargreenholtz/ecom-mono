import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import type { TItem } from '@/types/api/item';
import useApi from '@/utils/useApi';

import ItemView from './Item.view';

const Item = () => {
	const dispatch = useDispatch();
	const { itemName } = useParams();

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

	useEffect(() => {
		fetchCategoryItems();
	}, []);

	return (
		<ItemView
			quantity={quantityState}
			item={itemState}
			handleClickChangeQuantity={handleClickChangeQuantity}
			handleChangeQuantity={handleChangeQuantity}
		/>
	);
};

export default React.memo(Item);
