import React, { ReactNode } from 'react';
import styled from 'styled-components';

export default function ConstrainedWidth(props: ContrainedWithProps) {
	const { children, className } = props;
	return <StyledConstrainedWidth className={className}>{children}</StyledConstrainedWidth>;
}

const StyledConstrainedWidth = styled.div`
	width: 95%;
	max-width: 1280px;
	margin: 0 auto;
`;

interface ContrainedWithProps {
	children: ReactNode;
	className?: string;
}
