import React, { ReactNode } from 'react';
import styled from 'styled-components';

export default function ConstrainedWidth(props: ContrainedWithProps) {
	const { children, className, size = 'medium' } = props;
	return (
		<StyledConstrainedWidth size={size} className={className}>
			{children}
		</StyledConstrainedWidth>
	);
}

const StyledConstrainedWidth = styled.div<{ size: ContrainedWithProps['size'] }>`
	width: 95%;
	max-width: ${props => (props.size === 'medium' ? '1280px' : '1800px')};
	margin-left: auto;
	margin-right: auto;
`;

interface ContrainedWithProps {
	children: ReactNode;
	className?: string;
	size?: 'large' | 'medium';
}
