import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import useModal from '@/utils/useModal';
import useApi from '@/utils/useApi';
import type { TItem } from '@/types/item';
import ItemsView from './Items.view';

const Items = () => {
	const dispatch = useDispatch();
	const [isShowingModal, toggleModal] = useModal();
	const [isShowingModalEdit, toggleModalEdit] = useModal();
	const [clickedItemId, setClickedItemId] = useState('');

	const [allItemsState, setAllItemsState] = useState<TItem[]>([]);

	const addItem = (itemInfo: TItem) => {
		setAllItemsState((prev) => [...prev, itemInfo]);
	};

	useEffect(() => {
		const findAllItems = async () => {
			try {
				const response = await useApi(
					{
						url: `${import.meta.env.VITE_BACkEND_URL}/item/getallitems`,
						method: 'get',
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

	const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
		console.log(e);
		setClickedItemId(id);
		toggleModalEdit();
	};

	return (
		<ItemsView
			isShowingModal={isShowingModal}
			allItems={allItemsState}
			isShowingModalEdit={isShowingModalEdit}
			clickedItemId={clickedItemId}
			toggleModal={toggleModal}
			toggleModalEdit={toggleModalEdit}
			handleClickEdit={handleClickEdit}
			addItem={addItem}
		/>
	);
};

export default React.memo(Items);
