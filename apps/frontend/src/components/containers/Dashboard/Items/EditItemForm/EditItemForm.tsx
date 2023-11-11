import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import useApi from '@/utils/useApi';
import EditItemFormView from './EditItemForm.view';

type TProps = {
	readonly id: string;
	readonly toggleModal: () => void;
};

const EditItemForm = (props: TProps) => {
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
					url: `${import.meta.env.VITE_BACkEND_URL}/item/update`,
					method: 'post',
					data: {
						id: props.id,
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

			props.toggleModal();
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
