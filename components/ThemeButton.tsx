import React, { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classNames from 'classnames';

import theme from '../config/theme';

function ThemeButton(props: ThemeButtonProps) {
	const { children, onClick, href, className: propClassName, inverse = false, border } = props;

	const className = classNames(propClassName, { inverse, border });

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
	background-color: white;
	color: black;
	will-change: background-color;
	transition-property: background-color, color;
	transition-duration: ${theme.transitionTime};
	letter-spacing: 2px;

	&.border {
		border: 1px solid black;
	}

	&.inverse {
		background-color: black;
		color: white;
	}

	&:hover,
	&:focus {
		background-color: ${theme.colors.primary.main};
		color: white;

		&.inverse {
			background-color: ${theme.colors.primary.main};
		}
	}
`;

interface ThemeButtonProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	href?: string;
	inverse?: boolean;
	border?: boolean;
}
