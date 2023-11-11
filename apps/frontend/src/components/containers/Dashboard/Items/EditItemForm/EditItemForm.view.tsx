import React from 'react';

import classes from './EditItemForm.module.scss';

type TProps = {
	readonly formData: {
		name: string;
		stock: number;
		image?: string;
		price: number;
	};
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditItemFormView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<h1 className={classes['container__title']}>Edit Item</h1>
			<form onSubmit={props.handleSubmit}>
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
						type="file"
						id="image"
						name="image"
						placeholder=" "
						value={props.formData.image}
						onChange={props.handleInputChange}
					/>
					<label htmlFor="image">Image:</label>
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

				<button type="submit">Edit</button>
			</form>
		</div>
	);
};

export default React.memo(EditItemFormView);
