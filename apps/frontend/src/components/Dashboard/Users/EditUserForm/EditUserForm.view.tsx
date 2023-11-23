import React from 'react';

import classes from './EditUserForm.module.scss';

type TProps = {
	readonly formData: {
		readonly name?: string;
		readonly email?: string;
		readonly role?: string;
	};
	readonly handleSubmit: (e: React.FormEvent) => void;
	readonly handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const EditUserFormView = (props: TProps) => {
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
						type="text"
						id="email"
						name="email"
						placeholder=" "
						value={props.formData.email}
						onChange={props.handleInputChange}
					/>
					<label htmlFor="email">Email:</label>
				</div>

				<div className={classes['inputContainerSelect']}>
					<label htmlFor="role">Role:</label>
					<select
						id="role"
						name="role"
						value={props.formData.role}
						onChange={props.handleInputChange}
					>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>

				<button type="submit">Edit</button>
			</form>
		</div>
	);
};

export default React.memo(EditUserFormView);
