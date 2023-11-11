import React from 'react';

import ItemsShowcase from '@/containers/Shop/ItemsShowcase';
import Newsletter from '@/containers/Shop/Newsletter';
import CategoriesSection from '../CategoriesSection';
import Carousel from '../Carousel';

import classes from './Home.module.scss';

const HomeView = () => {
	return (
		<>
			<section className={classes['firstContainer']}>
				<Carousel />
			</section>
			<CategoriesSection />
			<ItemsShowcase />
			<Newsletter />
		</>
	);
};

export default React.memo(HomeView);
