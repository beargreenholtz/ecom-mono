import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import type { TItem } from '@/types/api/item';
import useApi from '@/utils/useApi';

import CategoryView from './Category.view';

const Category = () => {
	const dispatch = useDispatch();
	const { category } = useParams();

	const [itemsState, setItemsState] = useState<TItem[]>();

	const fetchCategoryItems = async () => {
		try {
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/item/get-all-items-by-category/${category}`,
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

			setItemsState(response.data.allItems);
		} catch (error) {
			console.error('An error occurred during otp:', error);
		}
	};

	useEffect(() => {
		fetchCategoryItems();
	}, []);

	return <CategoryView items={itemsState} />;
};

export default React.memo(Category);
