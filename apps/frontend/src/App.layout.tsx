import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/layout/Header';
import DashHeader from '@/layout/DashHeader';
import Sidebar from '@/layout/Sidebar';

enum layoutFor {
	'shop',
	'dashboard',
}

type TProps = {
	readonly layoutFor: layoutFor;
};

const AppLayout = (props: TProps) => {
	return (
		<>
			{props.layoutFor === layoutFor.shop && (
				<>
					<Header />
					<Outlet />
				</>
			)}

			{props.layoutFor === layoutFor.dashboard && (
				<>
					<DashHeader />
					<Sidebar />
					<Outlet />
				</>
			)}
		</>
	);
};

export default AppLayout;
