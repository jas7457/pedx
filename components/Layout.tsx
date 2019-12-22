import React, { ReactNode } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout(props: LayoutProps) {
	const { children, className } = props;
	return (
		<>
			<Header />
			<Main className={className}>
				{children}
			</Main>
			<Footer />
		</>
	);
}

interface LayoutProps {
	children: ReactNode;
	className?: string;
}
