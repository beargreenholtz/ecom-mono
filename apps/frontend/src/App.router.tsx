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
const ResetPassConfirm = React.lazy(() => import('./pages/auth/resetpassword/confirm'));
const Home = React.lazy(() => import('./pages/shop/Home'));

const AppRouter = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

	console.log(isAuth);
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
					path: '/auth/login',
					element: <Login />,
				},
				{
					path: '/auth/resetpassword/request',
					element: <ResetPassRequest />,
				},
				{
					path: '/auth/resetpassword/confirm/:token',
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

	const authRoutes = [];

	const notAuthRotues = [];

	const errorElement = [
		{
			errorElement: <NotFound />,
		},
	];

	const router = createBrowserRouter([...generealRotues, ...errorElement]);

	return (
		<Suspense fallback={<Loading />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};

export default React.memo(AppRouter);
