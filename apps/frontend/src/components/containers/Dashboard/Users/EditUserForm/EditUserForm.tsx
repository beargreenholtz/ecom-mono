import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import useApi from '@/utils/useApi';
import type { TUser } from '@/types/user';

import EditUserFormView from './EditUserForm.view';

type TProps = {
	readonly item: TUser | null;
	readonly onClickCloseButton: () => void;
};

const EditUserForm = (props: TProps) => {
	const dispatch = useDispatch();

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
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			props.onClickCloseButton();
		} catch (error) {
			console.error('An error occurred during otp:', error);
		}
	};

	return (
		<EditUserFormView
			formData={formData}
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
		/>
	);
};

export default React.memo(EditUserForm);
