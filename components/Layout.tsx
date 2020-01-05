import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout(props: LayoutProps) {
	const { children, className } = props;

	return (
		<StyledLayout className="flex flex-column">
			<Header />
			<Main className={className}>{children}</Main>
			<Footer />
		</StyledLayout>
	);
}

const StyledLayout = styled.div`
	min-height: 100vh;
`;

interface LayoutProps {
	children: ReactNode;
	className?: string;
}
