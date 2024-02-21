import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import useModal from '@/utils/useModal';
import useApi from '@/utils/useApi';
import type { TItem } from '@/types/api/item';
import ItemsView from './Items.view';

const Items = () => {
	const dispatch = useDispatch();
	const [isShowingModal, onClickToggleModal] = useModal();
	const [isShowingModalEdit, onToggleModalEdit] = useModal();
	const [clickedItemId, setClickedItemId] = useState<TItem | null>(null);

	const [allItemsState, setAllItemsState] = useState<TItem[]>([]);

	const addItem = (itemInfo: TItem) => {
		setAllItemsState((prev) => [...prev, itemInfo]);
	};

	useEffect(() => {
		const findAllItems = async () => {
			try {
				const response = await useApi(
					{
						url: `${import.meta.env.VITE_BACkEND_URL}/item/get-all-items`,
						method: 'post',
						data: {
							limit: Infinity,
						},
					},
					dispatch,
				);

				if (response instanceof AxiosError) {
					throw response;
				}

				if (!response?.data.allItems) {
					throw 'No Items';
				}

				setAllItemsState(response?.data.allItems);
			} catch (error) {
				console.error('An error occurred during otp:', error);
			}
		};

		findAllItems();
	}, []);

	const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>, item: TItem) => {
		console.log(e);
		setClickedItemId(item);
		onToggleModalEdit();
	};

	return (
		<ItemsView
			isShowingModal={isShowingModal}
			allItems={allItemsState}
			isShowingModalEdit={isShowingModalEdit}
			clickedItemId={clickedItemId}
			handleClickEdit={handleClickEdit}
			addItem={addItem}
			onToggleModalEdit={onToggleModalEdit}
			onClickToggleModal={onClickToggleModal}
		/>
	);
};

export default React.memo(Items);
