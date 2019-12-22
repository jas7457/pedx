import React, { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

export default function ImageMagnifier(props: ImageMagnifierProps) {
	const { src } = props;

	const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<StyledFigure
			className={classNames({ 'is-enabled': isEnabled })}
			onClick={() => setIsEnabled(!isEnabled)}
			onMouseMove={e => {
				// @ts-ignore
				const { left, top, width, height } = e.target.getBoundingClientRect();
				const x = ((e.pageX - left) / width) * 100;
				const y = ((e.pageY - top) / height) * 100;
				setBackgroundPosition(`${x}% ${y}%`);
			}}
			style={{ backgroundImage: `url(${src})`, backgroundPosition }}
		>
			<img src={src} alt="" />
		</StyledFigure>
	);
}

const StyledFigure = styled.figure`
	width: 100%;
	background-repeat: no-repeat;
	cursor: zoom-in;

	&.is-enabled {
		cursor: zoom-out;

		&:hover img {
			opacity: 0;
		}
	}
`;

interface ImageMagnifierProps {
	src: string;
}
