type TProduct = {
	name: string;
	quantity: number;
	_id: string;
};

export type TCartItem = {
	_id?: string;
	productId: TProduct | string;
	name: string;
	quantity: number;
};

export type TUserInfo = {
	readonly _id: string;
	readonly items: TCartItem[];
};
