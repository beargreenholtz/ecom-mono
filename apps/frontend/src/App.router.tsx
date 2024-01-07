import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loading from '@/containers/Loading';
import NotFound from '@/containers/NotFound';
import Header from '@/layout/Header';
import Items from '@/containers/Dashboard/Items';
import Sidebar from '@/layout/Sidebar';
import DashHeader from '@/layout/DashHeader';
import Users from '@/containers/Dashboard/Users';
import type { RootState } from './store/app';

const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Otp = React.lazy(() => import('./pages/auth/otp/Otp'));
const ResetPassRequest = React.lazy(() => import('./pages/auth/resetpassword/Request'));
const ResetPassConfirm = React.lazy(() => import('./pages/auth/resetpassword/Confirm'));
const Home = React.lazy(() => import('./pages/shop/Home'));
const Category = React.lazy(() => import('./pages/shop/Category'));
const Item = React.lazy(() => import('./pages/shop/Item'));

const AppRouter = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

	isAuth;
	const generealRotues = [
		{
			path: '/dashboard',
			element: (
				<>
					<DashHeader />
					<Sidebar />
					<Outlet />
				</>
			),
			children: [
				{
					path: 'items',
					element: <Items />,
				},
				{
					path: 'users',
					element: <Users />,
				},
			],
		},

		{
			element: (
				<>
					<Header />
					<Outlet />
				</>
			),
			children: [
				{
					path: '/',
					element: <Home />,
				},
				{
					path: '/category/:category',
					element: <Category />,
				},
				{
					path: '/items/:itemName/:itemId',
					element: <Item />,
				},
				{
					path: '/auth/login',
					element: <Login />,
				},
				{
					path: '/auth/password-reset/request',
					element: <ResetPassRequest />,
				},
				{
					path: '/auth/password-reset/confirm/:token',
					element: <ResetPassConfirm />,
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const authRoutes = [];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
