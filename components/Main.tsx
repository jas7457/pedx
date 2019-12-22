import React, { ReactNode } from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

export default function Main(props: MainProps) {
	const { children, className } = props;

	return <StyledMain className={className}>{children}</StyledMain>;
}

const StyledMain = styled.main`
	margin-top: ${theme.headerHeight};
	margin-bottom: 2rem;
`;

interface MainProps {
	children: ReactNode;
	className?: string;
}
