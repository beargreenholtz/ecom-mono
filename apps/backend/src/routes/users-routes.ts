import express from 'express';
import { check } from 'express-validator';
import passport from 'passport';
import { passowrdvaliteregex } from '../utils/password-validate';
import checkAuth from '../middleware/check-auth';
import checkRule from '../middleware/check-rule';

import {
	signUp,
	loginGenerateOtp,
	passwordResetGenertor,
	loginOtp,
	passwordReset,
	// callbackGoogleAuth,
	failedgoogleauth,
	successgoogleauth,
	getAllUsers,
	editUser,
	updateCart,
	getCartItems,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/success', successgoogleauth);

router.post(
	'/signup',
	[
		check('name').not().isEmpty(),
		check('username').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 8 }).matches(passowrdvaliteregex),
	],
	signUp,
);

router.post('/login-generate-otp', loginGenerateOtp);
router.post('/login-otp/', loginOtp);

router.post('/password-reset-request', passwordResetGenertor);
router.post('/password-Reset/:resetPasswordToken', passwordReset);

router.get('/failed-goog-leauth', failedgoogleauth);

router.get(
	'/google-auth',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	}),
);

// router.get('/callbackgoogleauth', callbackGoogleAuth);

router.get(
	'/callbackgoogleauth',
	passport.authenticate('google', {
		successRedirect: process.env.CLIENT_HOME_PAGE_URL,
		failureRedirect: '/login/failed',
	}),
);

router.get('/get-all-users', getAllUsers);

router.use(checkAuth);
router.use(checkRule);

router.post('/update', editUser);

router.post('/update-cart', updateCart);

router.get('/get-cart-items', getCartItems);

export default router;
