import React, { ReactNode } from 'react';
import styled from 'styled-components';

export default function BackgroundImage(props: BackgroundImageProps) {
	const { image, className, children } = props;
	return (
		<StyledBackgroundImage className={className} style={{ backgroundImage: `url(${image})` }}>
			{children && <div className="children">{children}</div>}
		</StyledBackgroundImage>
	);
}

const StyledBackgroundImage = styled.div`
	position: relative;
	background-size: cover;
	background-position: center;
	width: 100%;

	.children {
		position: absolute;
		height: 100%;
		width: 100%;
	}
`;

export interface BackgroundImageProps {
	image: string;
	children?: ReactNode;
	className?: string;
}
