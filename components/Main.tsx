import React, { ReactNode } from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

export default function Main(props: MainProps) {
	const { children, className, marginTop } = props;

	return (
		<StyledMain marginTop={marginTop} className={className}>
			{children}
		</StyledMain>
	);
}

const StyledMain = styled.main<{ marginTop: boolean }>`
	margin-top: ${props => (props.marginTop ? theme.dimensions['10'] : 0)};
`;

interface MainProps {
	children: ReactNode;
	marginTop: boolean;
	className?: string;
}
