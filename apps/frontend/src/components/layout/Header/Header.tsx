import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import useApi from '@/utils/useApi';
import * as authActions from '@/store/actions/auth';
import * as cartActions from '@/store/actions/cart';

import HeaderView from './Header.view';

const Header = () => {
	const dispatch = useDispatch();
	const [isHoverCart, setIsHoverCart] = useState(false);
	const userToken = localStorage.getItem('jwt_token');

	const onClickLogout = () => {
		dispatch(authActions.logout());
	};

	const onClickCart = () => {
		setIsHoverCart((prev) => !prev);
	};

	useEffect(() => {
		const getAllCartItems = async () => {
			if (!userToken) return;

			const response = await useApi(
				{
					url: `${import.meta.env.VITE_BACkEND_URL}/user/get-cart-items`,
					method: 'get',
					headers: {
						authorization: JSON.parse(userToken),
					},
				},
				dispatch,
			);

			if (response instanceof AxiosError) {
				throw response;
			}

			if (!response?.data.userInfo.items) return;

			const products = response?.data.userInfo.items.map((item) => {
				if (typeof item.productId === 'string') {
					return {
						productId: 'dummy',
						name: 'dumm',
						quantity: 3,
					};
				}

				return {
					name: item.productId.name,
					productId: item.productId._id,
					quantity: item.quantity,
				};
			});

			console.log(products);

			dispatch(cartActions.cartItemsUpdate(products));
		};

		console.log('i fire once');

		getAllCartItems();
	}, []);

	return <HeaderView isHoverCart={isHoverCart} onClickLogout={onClickLogout} onClickCart={onClickCart} />;
};

export default React.memo(Header);
