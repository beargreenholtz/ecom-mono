import express, { type ErrorRequestHandler } from 'express';
import cookieSession from 'cookie-session';

import passport from 'passport';

import userRouter from './routes/users-routes';
import itemRouter from './routes/item-routes';
import HttpError from './models/http-error';
import './config/passport';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: 'session',
		keys: ['cyberwolve'],
		maxAge: 24 * 60 * 60 * 100,
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use((_: express.Request, res: express.Response, next: express.NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_HOME_PAGE_URL}`);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Type',
	);
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE, PUT');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Expose-Headers', 'Authorization');
	next();
});

app.use('/user', userRouter);
app.use('/item', itemRouter);

app.use(() => {
	const error = new HttpError('Could not find this route.', 404);

	throw error;
});

app.use(((error, _, res, next) => {
	if (res.headersSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
}) as ErrorRequestHandler);

export default app;
