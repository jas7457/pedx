import React, { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import theme from '../config/theme';

function ThemeButton(props: ThemeButtonProps) {
	const { children, onClick, href, className } = props;

	if (href) {
		return (
			<Link href={href}>
				<a className={className}>{children}</a>
			</Link>
		);
	}

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
}

export default styled(ThemeButton)`
	display: inline-block;
	padding: ${theme.dimensions['2']};
	background-color: black;
	color: white;
	will-change: background-color;
	transition: background-color ${theme.transitionTime};
	letter-spacing: 2px;

	&:hover,
	&:focus {
		background-color: ${theme.colors.primary.main};
	}
`;

interface ThemeButtonProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	href?: string;
}
