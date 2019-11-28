import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

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

interface ThemeButtonProps {
	children: JSX.Element | string;
	className?: string;
	onClick?: () => void;
	href?: string;
}

export default styled(ThemeButton)`
	display: inline-block;
	padding: 10px;
	background-color: black;
	color: white;
	transition: background-color ${props => props.theme.transitionTime};
	will-change: background-color;

	&:hover {
		background: ${props => props.theme.colors.primary.main};
	}
`;
