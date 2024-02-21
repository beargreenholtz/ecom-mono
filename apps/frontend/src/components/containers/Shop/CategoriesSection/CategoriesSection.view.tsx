import React from 'react';
import { NavLink } from 'react-router-dom';
import { categoriesSection } from '@/data/categoriesSection';
import classes from './CategoriesSection.module.scss';

const CategoriesSectionView = () => {
	return (
		<div className={classes['secondContainer']}>
			{categoriesSection.map((item) => (
				<div
					style={{ backgroundImage: `url(${item.image})` }}
					className={classes['imageContainer']}
					key={item.title}
				>
					<h2 className={classes['imageContainer__title']}>{item.title}</h2>
					<NavLink className={classes['imageContainer__button']} to={item.buttonLink} type="button">
						<span>Shop Now</span>
					</NavLink>
				</div>
			))}
		</div>
	);
};

export default React.memo(CategoriesSectionView);
