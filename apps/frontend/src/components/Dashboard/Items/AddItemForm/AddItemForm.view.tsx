import React from 'react';

import classes from './AddItemForm.module.scss';

type TProps = {
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	readonly formData: {
		readonly name: string;
		readonly imageUrl: string;
		readonly stock: number;
		readonly image?: string;
		readonly price: number;
	};
};

const AddItemFormView = (props: TProps) => {
	const formFields = [
		{
			name: 'name',
			type: 'text',
			label: 'Name',
		},
		{
			name: 'stock',
			type: 'number',
			label: 'Stock',
		},
		{
			name: 'image',
			type: 'file',
			label: 'Image',
		},
		{
			name: 'price',
			type: 'number',
			label: 'Price',
		},
	];

	return (
		<div className={classes['container']}>
			<h1 className={classes['container__title']}>Add Item</h1>
			<form encType="multipart/form-data" onSubmit={props.handleSubmit}>
				<div className={classes['inputContainer']}>
					<input
						type="text"
						id="name"
						name="name"
						placeholder=" "
						value={props.formData.name}
						onChange={props.handleInputChange}
					/>
					<label htmlFor="name">Name:</label>
				</div>

				<div className={classes['inputContainer']}>
					<input
						type="number"
						id="stock"
						name="stock"
						placeholder=" "
						value={props.formData.stock}
						onChange={props.handleInputChange}
					/>
					<label htmlFor="stock">Stock:</label>
				</div>

				<div className={classes['inputContainer']}>
					<input
						type="text"
						id="imageUrl"
						name="imageUrl"
						placeholder=" "
						value={props.formData.imageUrl}
						onChange={props.handleInputChange}
					/>
					<label htmlFor="imageUrl">Image url:</label>
				</div>

				<div className={classes['inputContainer']}>
					<input
						type="number"
						id="price"
						name="price"
						placeholder=" "
						value={props.formData.price}
						onChange={props.handleInputChange}
					/>
					<label htmlFor="price">Price:</label>
				</div>

				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default React.memo(AddItemFormView);