import React from 'react';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';
import { carouselItems } from '@/data/carouselItems';

import CarouselItem from './CarouselItem';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import classes from './Carousel.module.scss';

const CarouselView = () => {
	return (
		<div className={classes['container']}>
			<Flickity className={classes['carouselContainer']} options={{ pageDots: false }}>
				{carouselItems.map((item, index) => {
					return (
						<div
							className={classes['carouselContainer__item']}
							key={index}
							style={{ backgroundColor: item.color }}
						>
							<CarouselItem
								imageSrc={item.src}
								alt={item.alt}
								title={item.title}
								text={item.text}
							/>
						</div>
					);
				})}
			</Flickity>
		</div>
	);
};

export default React.memo(CarouselView);
