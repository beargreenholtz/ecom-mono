import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError, isAxiosError } from 'axios';
import useApi from '@/utils/useApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { TUser } from '@/types/api/user';

import EditUserFormView from './EditUserForm.view';

type TProps = {
	readonly item: TUser | null;
	readonly onClickCloseButton: () => void;
};

const EditUserForm = (props: TProps) => {
	const dispatch = useDispatch();
	const [storedData, persistData] = useLocalStorage('jwt_token');

	const [error, setError] = useState('');

	const [formData, setFormData] = useState({
		name: props.item?.name,
		email: props.item?.email,
		role: props.item?.role,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (typeof storedData !== 'string') throw 'no token';

			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/update`,
					method: 'post',
					data: {
						id: props.item && props.item._id,
						name: formData.name,
						email: formData.email,
						role: formData.role,
					},
					headers: {
						authorization: storedData,
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}
		} catch (error) {
			if (isAxiosError(error)) {
				setError(error.response?.data?.message);
			}
		}
	};

	return (
		<EditUserFormView
			formData={formData}
			error={error}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(EditUserForm);
