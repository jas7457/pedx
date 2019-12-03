import React, { ReactNode } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function Layout(props: LayoutProps) {
	const { children, className, marginTop } = props;
	return (
		<>
			<Header />
			<Main marginTop={marginTop} className={className}>
				{children}
			</Main>
			<Footer />
		</>
	);
}

interface LayoutProps {
	children: ReactNode;
	marginTop: boolean;
	className?: string;
}
