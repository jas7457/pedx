import React, { ReactNode } from 'react';
import styled from 'styled-components';

export default function BackgroundImage(props: BackgroundImageProps) {
	const { image, className, title, children, onClick } = props;
	return (
		<StyledBackgroundImage
			className={className}
			title={title}
			style={{ backgroundImage: `url(${image})` }}
			onClick={onClick}
		>
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
	title?: string;
	onClick?: (e: React.MouseEvent) => void;
}
