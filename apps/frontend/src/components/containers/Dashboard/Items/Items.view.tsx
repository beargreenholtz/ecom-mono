import React from 'react';

import Modal from '@/ui/Modal';
import type { TItem } from '@/types/item';
import classes from './Items.module.scss';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';

type TProps = {
	readonly isShowingModal: boolean;
	readonly isShowingModalEdit: boolean;
	readonly allItems: TItem[];
	readonly clickedItemId: TItem | null;
	readonly addItem: (itemInfo: TItem) => void;
	readonly toggleModal: () => void;
	readonly toggleModalEdit: () => void;
	readonly handleClickEdit: (e: React.MouseEvent<HTMLButtonElement>, item: TItem) => void;
};

const ItemsView = (props: TProps) => {
	const itemBarDesc = ['ID', 'Product', 'Stock', 'Price', 'Action'];

	return (
		<>
			<Modal isShow={props.isShowingModal} onClickCloseButton={props.toggleModal}>
				<AddItemForm toggleModal={props.toggleModal} addItem={props.addItem} />
			</Modal>
			<Modal isShow={props.isShowingModalEdit} onClickCloseButton={props.toggleModalEdit}>
				<EditItemForm
					toggleModal={props.toggleModalEdit}
					item={props.clickedItemId && props.clickedItemId}
				/>
			</Modal>
			<div className={classes['container']}>
				<div className={classes['itemsContainer']}>
					<div className={classes['itemsBar']}>
						{itemBarDesc.map((item) => (
							<span key={item} className={classes['itemsBar__description']}>
								{item}
							</span>
						))}
					</div>

					{props.allItems.map((item, index) => {
						return (
							<div className={classes['itemContainer']} key={index}>
								<span className={classes['itemContainer__description']}>{item._id}</span>
								<span className={classes['itemContainer__description']}>{item.name}</span>
								<span className={classes['itemContainer__description']}>{item.stock}</span>
								<span className={classes['itemContainer__description']}>
									<img
										className={classes['itemContainer__image']}
										src={item.imageUrl}
										alt=""
									/>
									{item.price}
								</span>

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
				<button type="button" className={classes['addItemButton']} onClick={props.toggleModal}>
					Add Item
				</button>
			</div>
		</>
	);
};

export default React.memo(ItemsView);
