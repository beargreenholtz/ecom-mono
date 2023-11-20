import express from 'express';
import { check } from 'express-validator';
import passport from 'passport';
import { passowrdvaliteregex } from '../utils/password-validate';

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

router.post('/logingenerateotp', loginGenerateOtp);
router.post('/loginotp/', loginOtp);

router.post('/passwordresetrequest', passwordResetGenertor);
router.post('/passwordReset/:resetPasswordToken', passwordReset);

router.get('/failedgoogleauth', failedgoogleauth);

router.get(
	'/googleauth',
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

router.get('/getallusers', getAllUsers);

router.post('/update', editUser);

export default router;
