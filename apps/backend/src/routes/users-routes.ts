import express from 'express';
import { check } from 'express-validator';
import passport from 'passport';
import { passowrdvaliteregex } from '../utils/password-validate';

import {
	signUp,
	loginGenerateOtp,
	passwordResetGenerator,
	loginOtp,
	passwordReset,
	failedGooglAuth,
	successGoogleAuth,
	getAllUsers,
	editUser,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/success', successGoogleAuth);

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

router.post('/password-reset-request', passwordResetGenerator);
router.post('/password-reset/:resetPasswordToken', passwordReset);

router.get('/failed-google-auth', failedGooglAuth);

router.get(
	'/google-auth',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	}),
);

router.get(
	'/callback-google-auth',
	passport.authenticate('google', {
		successRedirect: process.env.CLIENT_HOME_PAGE_URL,
		failureRedirect: '/login/failed',
	}),
);

router.get('/get-all-users', getAllUsers);

router.post('/update', editUser);

export default router;
