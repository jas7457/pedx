import React from 'react';
import styled from 'styled-components';

import BackgroundImage from './BackgroundImage';

function Hero(props: HeroProps) {
	const { image, children, className } = props;

	return (
		<BackgroundImage image={image} paddingBottom="57%" className={className}>
			<div className="children">{children}</div>
		</BackgroundImage>
	);
}

interface HeroProps {
	className?: string;
	image: string;
	children: any;
}

export default styled(Hero)`
	max-height: 80vh;

	.children {
		position: absolute;
		top: 20px;
		left: 20px;
		width: calc(100% - 40px);
	}
`;
