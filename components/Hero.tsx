import React, { ReactNode } from 'react';
import styled from 'styled-components';

import BackgroundImage from './BackgroundImage';

export default function Hero(props: HeroProps) {
	const { image, children, className } = props;

	return (
		<StyledBackgroundImage image={image} className={className}>
			{children}
		</StyledBackgroundImage>
	);
}

const StyledBackgroundImage = styled(BackgroundImage)`
	max-height: 80vh;

	&:after {
		content: '';
		display: block;
		padding-bottom: 57%;
	}
`;

interface HeroProps {
	image: string;
	children: ReactNode;
	className?: string;
}
