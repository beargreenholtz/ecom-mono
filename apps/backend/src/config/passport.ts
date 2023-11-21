import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import type { TUser } from '../types/user';

import User from '../models/user';

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.REDIRECT_URI,
			passReqToCallback: true,
		},
		async (_req, _accessToken, _refreshToken, profile, done) => {
			const user = await User.findOne({ googleId: profile.id });

			if (!user) {
				const newUser = await User.create({
					name: profile.displayName,
					email: profile.emails?.[0]?.value,
				});

				if (newUser) {
					done(null, newUser);
				}
			} else {
				done(null, user);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user);
});

// passport.deserializeUser(async (id, done) => {
// 	const user = await User.findOne({ googleId: id });

// 	done(null, user);
// });

passport.deserializeUser((user: TUser, done) => {
	done(null, user);
});
