import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import type { TItem } from '@/types/api/item';
import useApi from '@/utils/useApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import EditItemFormView from './EditItemForm.view';

type TProps = {
	readonly item: TItem | null;
	readonly onToggleModalEdit: () => void;
};

const EditItemForm = (props: TProps) => {
	const dispatch = useDispatch();
	const [storedData, persistData] = useLocalStorage('jwt_token');

	const [formData, setFormData] = useState({
		name: props.item?.name,
		stock: props.item?.stock,
		imageUrl: props.item?.imageUrl,
		price: props.item?.price,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
					url: `${import.meta.env.VITE_BACkEND_URL}/item/update`,
					method: 'post',
					data: {
						id: props.item && props.item._id,
						name: formData.name,
						stock: formData.stock,
						price: formData.price,
						imageUrl: formData.imageUrl,
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

			props.onToggleModalEdit();
		} catch (error) {
			console.error('An error occurred during otp:', error);
		}
	};

	return (
		<EditItemFormView
			formData={formData}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(EditItemForm);
