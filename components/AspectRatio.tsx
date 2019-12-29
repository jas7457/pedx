import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

export default function AspectRatio(props: AspectRatioProps) {
	const { ratio, children, className } = props;

	return (
		<StyledAspectRatio ratio={ratio} className={classNames('relative', className)}>
			{children}
		</StyledAspectRatio>
	);
}

const StyledAspectRatio = styled.div<{ ratio: number }>`
	&:after {
		content: '';
		display: block;
		padding-bottom: ${props => `${props.ratio * 100}%`};
	}

	& > * {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`;

interface AspectRatioProps {
	ratio: number;
	children?: React.ReactNode;
	className?: string;
}
