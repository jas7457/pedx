import React from 'react';
import styled from 'styled-components';

export default function BackgroundImage(props: BackgroundImageProps) {
	const { image, className, paddingBottom, children } = props;
	return (
		<StyledBackgroundImage
			className={className}
			paddingBottom={paddingBottom}
			style={{ backgroundImage: `url(${image})` }}
		>
			{children}
		</StyledBackgroundImage>
	);
}

interface BackgroundImageProps {
	image: string;
	children?: JSX.Element;
	paddingBottom: string;
	className?: string;
}

const StyledBackgroundImage = styled.div<{ paddingBottom: string }>`
	position: relative;
	background-size: cover;
	background-position: center;
	width: 100%;

	&:after {
		content: '';
		display: block;
		padding-bottom: ${props => props.paddingBottom};
	}
`;
