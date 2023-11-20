import React from 'react';

import type { TUser } from '@/types/user';
import Modal from '@/ui/Modal';
import EditUserForm from './EditUserForm';

import classes from './Users.module.scss';

type TProps = {
	readonly isShowingModalEdit: boolean;
	readonly allUsers: TUser[];
	readonly clickedItemId: TUser | null;
	readonly addItem: (itemInfo: TUser) => void;
	readonly onClickToggleModalEdit: () => void;
	readonly handleClickEdit: (e: React.MouseEvent<HTMLButtonElement>, item: TUser) => void;
};

const UsersView = (props: TProps) => {
	const itemBarDesc = ['ID', 'Name', 'Email', 'Role', 'Action'];

	return (
		<>
			<Modal isShow={props.isShowingModalEdit} onClickCloseButton={props.onClickToggleModalEdit}>
				<EditUserForm
					item={props.clickedItemId && props.clickedItemId}
					onClickCloseButton={props.onClickToggleModalEdit}
				/>
			</Modal>
			<div className={classes['container']}>
				<div className={classes['usersContainer']}>
					<div className={classes['usersBar']}>
						{itemBarDesc.map((item) => (
							<span key={item} className={classes['usersBar__description']}>
								{item}
							</span>
						))}
					</div>

					{props.allUsers.map((item, index) => {
						return (
							<div className={classes['itemContainer']} key={index}>
								<span className={classes['itemContainer__description']}>{item._id}</span>
								<span className={classes['itemContainer__description']}>{item.name}</span>
								<span className={classes['itemContainer__description']}>{item.email}</span>
								<span className={classes['itemContainer__description']}>{item.role}</span>

								<div className={classes['itemContainer__description']}>
									<button
										type="button"
										className={classes['itemContainer__button']}
										onClick={(e) => props.handleClickEdit(e, item)}
									>
										Edit
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			;
		</>
	);
};

export default React.memo(UsersView);
