import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/app';
import Logo from '@/assets/logo.png';
import Svg from '@/ui/Svg';
import CartPopup from './CartPopup';

import classes from './Header.module.scss';

type TProps = {
	readonly isHoverCart: boolean;
	readonly onClickCart: VoidFunction;
	readonly onClickLogout: VoidFunction;
};
const HeaderView = (props: TProps) => {
	const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
	const cartItems = useSelector((state: RootState) => state.cart.cartItems);

	return (
		<div className={classes['container']}>
			<NavLink to="/" className={classes['navLink']}>
				<img src={Logo} alt="logo" className={classes['container__image']} />
			</NavLink>
			{!isAuth && (
				<div className={classes['linksContainer']}>
					<NavLink
						to="/auth/login"
						className={({ isActive }) =>
							`${classes['linksContainer__link']} ${
								isActive ? classes['linksContainer__link--active'] : ''
							}`
						}
					>
						LOGIN
					</NavLink>
					<NavLink
						to="/auth/register"
						className={({ isActive }) =>
							`${classes['linksContainer__link']} ${
								isActive ? classes['linksContainer__link--active'] : ''
							}`
						}
					>
						REGISTER
					</NavLink>
				</div>
			)}
			{isAuth && (
				<div className={classes['container__rightside']}>
					<button
						type="button"
						className={classes['linksContainer__link']}
						onClick={props.onClickLogout}
					>
						Logout
					</button>
					<div>
						{cartItems.length > 0 && <p>{cartItems.length}</p>}
						<Svg
							className={classes['linksContainer__svg']}
							name="cart"
							onClick={props.onClickCart}
						/>
						{props.isHoverCart && <CartPopup />}
					</div>
				</div>
			)}
		</div>
	);
};

export default React.memo(HeaderView);
