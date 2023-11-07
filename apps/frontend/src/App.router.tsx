import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';

import Loading from '@/containers/Loading';
import NotFound from '@/containers/NotFound';
import type { RootState } from './store/app';

const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Otp = React.lazy(() => import('./pages/auth/otp/Otp'));
const ResetPassRequest = React.lazy(() => import('./pages/auth/resetpassword/Request'));
const ResetPassConfirm = React.lazy(() => import('./pages/auth/resetpassword/confirm'));

const AppRouter = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

	const routes = !isAuth
		? [
				{
					path: '/auth/login',
					element: <Login />,
				},
				{
					path: '/auth/register',
					element: <Register />,
				},
				{
					path: '/auth/otp/:otp',
					element: <Otp />,
				},
				{
					path: '/auth/resetpassword/request',
					element: <ResetPassRequest />,
				},
				{
					path: '/auth/resetpassword/confirm/:token',
					element: <ResetPassConfirm />,
				},
		  ]
		: [];

	const errorElement = [
		{
			errorElement: <NotFound />,
		},
	];

	const router = createBrowserRouter([...routes, ...errorElement]);

	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};

export default React.memo(AppRouter);
