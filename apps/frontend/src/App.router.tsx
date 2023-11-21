import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from '@/containers/Loading';
import NotFound from '@/containers/NotFound';
import Items from '@/containers/Dashboard/Items';
import Users from '@/containers/Dashboard/Users';
import type { RootState } from './store/app';
import AppLayout from './App.layout';

const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Otp = React.lazy(() => import('./pages/auth/otp/Otp'));
const ResetPasswordRequest = React.lazy(() => import('./pages/auth/resetpassword/Request'));
const ResetPasswordConfirm = React.lazy(() => import('./pages/auth/resetpassword/confirm'));
const Home = React.lazy(() => import('./pages/shop/Home'));

enum layoutFor {
	'shop',
	'dashboard',
}

const AppRouter = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

	const generealRotues = [
		{
			element: <AppLayout layoutFor={layoutFor.dashboard} />,
			children: [
				{
					path: '/dashboard/items',
					element: <Items />,
				},
				{
					path: '/dashboard/users',
					element: <Users />,
				},
			],
		},
		{
			element: <AppLayout layoutFor={layoutFor.shop} />,
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/auth/login',
					element: <Login />,
				},
				{
					path: '/auth/password-reset/request',
					element: <ResetPasswordRequest />,
				},
				{
					path: '/auth/password-reset/confirm/:token',
					element: <ResetPasswordConfirm />,
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
					path: '*',
					element: <Navigate to="/" replace />,
				},
			],
		},
	];

	const authRoutes = [];

	const notAuthRotues = [];

	const errorElement = {
		errorElement: <NotFound />,
	};

	const router = createBrowserRouter([...generealRotues, errorElement]);

	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};

export default React.memo(AppRouter);
