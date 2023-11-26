import React from 'react';

import classes from './CarouselItem.module.scss';

type TProps = {
	readonly imageSrc: string;
	readonly alt: string;
	readonly title: string;
	readonly text: string;
};

const CarouselItemView = (props: TProps) => {
	return (
		<div className={classes['container']}>
			<img src={props.imageSrc} alt={props.alt} className={classes['container__image']} />
			<div className={classes['itemContainer']}>
				<h1 className={classes['itemContainer__title']}>{props.title}</h1>
				<p className={classes['itemContainer__text']}>{props.text}</p>
				<button type="button" className={classes['itemContainer__button']}>
					Shop Now
				</button>
			</div>
		</div>
	);
};

export default React.memo(CarouselItemView);
