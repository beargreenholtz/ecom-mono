import React, { useEffect, useState } from 'react';
import { type AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

import type { TItem } from '@/types/item';
import useApi from '@/utils/useApi';
import ItemsShowcaseView from './ItemsShowcase.view';

const ItemsShowcase = () => {
	const dispatch = useDispatch();

	const [allItemsState, setAllItemsState] = useState<TItem[]>([]);

	useEffect(() => {
		const findAllItems = async () => {
			try {
				const response = await useApi(
					{
						url: `${import.meta.env.VITE_BACkEND_URL}/item/get-all-items`,
						method: 'post',
						data: {
							limit: 6,
						},
					},
					dispatch,
				);

				if (response instanceof AxiosError) {
					throw response;
				}

				setAllItemsState(response?.data.allItems);
			} catch (error) {
				console.error('An error occurred during otp:', error);
			}
		};

		findAllItems();
	}, []);

	return <ItemsShowcaseView allItems={allItemsState} />;
};

export default React.memo(ItemsShowcase);
