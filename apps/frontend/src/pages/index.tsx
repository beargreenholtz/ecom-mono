import React from 'react';
import type { NextPage } from 'next';

import Transition from '@/layout/Transition';
import Register from '@/containers/Auth/Register';

const MainPage: NextPage = () => {
	return (
		<Transition>
			<Register />
		</Transition>
	);
};

MainPage.displayName = 'MainPage';
MainPage.defaultProps = {};

export default MainPage;
