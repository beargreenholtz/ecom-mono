import User from '../models/user';
import OTP from '../models/otp';
import type { TUser, TUserOrigin } from '../types/user';
import Cart from '../models/cart';
import Product from '../models/product';
import type { CartItem } from '../types/cart';

export const getUserByEmail = async (email: string) => {
	return await User.findOne({ email: email });
};

export const getUserById = async (id: string) => {
	return await User.findOne({ _id: id });
};

export const createUser = async (user: TUser, hashedPassword: string) => {
	const newUser = new User({
		name: user.name,
		email: user.email,
		username: user.username,
		password: hashedPassword,
		orders: [],
		reviews: [],
	});

	await newUser.save();

	return newUser;
};

export const findOtp = async (otp: string) => {
	return await OTP.findOne({ otp: otp });
};

export const createOtp = async (otpPayload: { otp: string; email: string }) => {
	await OTP.create(otpPayload);
};

export const findLatestOtp = async (email: string) => {
	return await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
};

export const saveresetPasswordTokenOnUser = async (existingUser: TUser, resetPasswordToken: string) => {
	existingUser.resetPasswordToken = resetPasswordToken;
	existingUser.resetPasswordTokenExpiration = Date.now() + 60 * 60 * 1000;

	await existingUser.save();

	return existingUser;
};

// export const findUserByresetPasswordToken = async (resetPasswordToken: string) => {
// 	return await User.findOne({
// 		resetPasswordToken: resetPasswordToken,
// 		resetPasswordTokenExpiration: { $gt: Date.now() },
// 	});
// };

export const saveUserWithNewPassword = async (user: TUser, hashedPassword: string) => {
	user.password = hashedPassword;
	user.resetPasswordToken = undefined;
	user.resetPasswordTokenExpiration = undefined;

	await user.save();

	return user;
};

export const verifyUserByUserId = async (userId: string) => {
	return await User.findOne({ _id: userId });
};

export const getAllUsers = async () => {
	return await User.find({});
};

export const updateUserById = async (info: TUserOrigin) => {
	return await User.findOneAndUpdate(
		{ _id: info.id },
		{ name: info.name, email: info.email, role: info.role },
	);
};

export const updateCartByUserIdAndItems = async (userId: string, items: CartItem[]) => {
	console.log(items);

	const existingCart = await Cart.findOne({ userId });

	if (existingCart) {
		items.forEach((newItem) => {
			const existingItem = existingCart.items.find((item) => {
				return item.productId.toString() === newItem.productId.toString();
			});

			if (existingItem) {
				existingItem.quantity += newItem.quantity;
			} else {
				existingCart.items.push(newItem);
			}
		});

		await existingCart.save();
	} else {
		const newCart = new Cart({
			userId: userId,
			items,
		});

		await newCart.save();

		await User.findByIdAndUpdate(userId, { cart: newCart._id });
	}

	return { existingCart };
};

export const getAllCartItemsById = async (userId: string) => {
	const cartItems = await Cart.findOne({ userId }).populate({
		path: 'items',
		populate: { path: 'productId' },
	});

	return cartItems;
};
