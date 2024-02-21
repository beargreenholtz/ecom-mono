import React from 'react';

import CarouselItemView from './CarouselItem.view';

type TProps = {
	readonly imageSrc: string;
	readonly alt: string;
	readonly title: string;
	readonly text: string;
};

const CarouselItem = (props: TProps) => {
	return (
		<CarouselItemView imageSrc={props.imageSrc} alt={props.alt} title={props.title} text={props.text} />
	);
};

export default React.memo(CarouselItem);
