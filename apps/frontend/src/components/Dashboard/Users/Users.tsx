import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import useModal from '@/utils/useModal';
import useApi from '@/utils/useApi';
import type { TUser } from '@/types/user';

import UsersView from './Users.view';

const Users = () => {
	const dispatch = useDispatch();
	const [isShowingModalEdit, toggleModalEdit] = useModal();
	const [clickedItemId, setClickedItemId] = useState<TUser | null>(null);

	const [allUsersState, setAllUsersState] = useState<TUser[]>([]);

	const addItem = (itemInfo: TUser) => {
		setAllUsersState((prev) => [...prev, itemInfo]);
	};

	useEffect(() => {
		const findAllUsers = async () => {
			try {
				const response = await useApi(
					{
						url: `${import.meta.env.VITE_BACkEND_URL}/user/get-all-users`,
						method: 'get',
					},
					dispatch,
				);

				if (response instanceof AxiosError) {
					throw response;
				}

				setAllUsersState(response?.data.allUsers);
			} catch (error) {
				console.error('An error occurred during otp:', error);
			}
		};

		findAllUsers();
	}, []);

	const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>, item: TUser) => {
		setClickedItemId(item);
		toggleModalEdit();
	};

	return (
		<UsersView
			allUsers={allUsersState}
			isShowingModalEdit={isShowingModalEdit}
			clickedItemId={clickedItemId}
			toggleModalEdit={toggleModalEdit}
			handleClickEdit={handleClickEdit}
			addItem={addItem}
		/>
	);
};

export default React.memo(Users);
