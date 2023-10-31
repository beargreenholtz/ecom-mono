import type { CSSProperties } from 'react';
import React from 'react';

import type icons from '../../../assets/icons';

import SvgView from './Svg.view';

type TProps = {
	readonly name: keyof typeof icons;
	readonly className?: string;
	readonly style?: CSSProperties;
	readonly onClick?: () => void;
};

const Svg = (props: TProps) => {
	return (
		<SvgView style={props.style} className={props.className} name={props.name} onClick={props.onClick} />
	);
};

Svg.displayName = 'Svg';
Svg.defaultProps = {};

export default React.memo(Svg);
