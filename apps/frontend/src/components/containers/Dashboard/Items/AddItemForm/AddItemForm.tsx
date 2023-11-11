import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import type { TItem } from '@/types/item';
import useApi from '@/utils/useApi';
import AddItemFormView from './AddItemForm.view';

type TProps = {
	readonly toggleModal: () => void;
	readonly addItem: (itemInfo: TItem) => void;
};

const AddItemForm = (props: TProps) => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: '',
		stock: 0,
		price: 0,
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
			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/item/create`,
					method: 'post',
					data: {
						name: formData.name,
						stock: formData.stock,
						price: formData.price,
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			props.addItem({ ...formData, _id: 'reload to generate id' });

			props.toggleModal();
		} catch (error) {
			console.error('An error occurred during otp:', error);
		}
	};

	return (
		<AddItemFormView
			formData={formData}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(AddItemForm);
