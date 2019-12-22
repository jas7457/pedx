import React, { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classNames from 'classnames';

import theme from '../config/theme';

function ThemeButton(props: ThemeButtonProps) {
	const {
		children,
		onClick,
		href,
		className: propClassName,
		inverse = false,
		border = false,
		disabled = false
	} = props;

	const className = classNames(propClassName, { inverse, border });

	if (href) {
		return (
			<Link href={href}>
				<a className={className}>{children}</a>
			</Link>
		);
	}

	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}

export default styled(ThemeButton)`
	display: inline-block;
	padding: ${theme.dimensions['2']};
	background-color: black;
	color: white;
	will-change: background-color, color, border-color;
	transition-property: background-color, color, border-color;
	transition-duration: ${theme.transitionTime};
	letter-spacing: 2px;
	text-transform: uppercase;
	min-width: 90px;

	&.border {
		border: 2px solid black;
	}

	&.inverse {
		background-color: white;
		color: black;
	}

	&:hover,
	&:focus {
		background-color: #3b7fd3;
		border-color: transparent;

		&.inverse {
			background-color: black;
			color: white;
		}
	}

	&[disabled] {
		background-color: ${theme.colors.gray.lighter} !important;
		color: ${theme.colors.gray.lightest} !important;
		pointer-events: none !important;

		&.border {
			border-color: transparent !important;
		}
	}
`;

interface ThemeButtonProps {
	children: ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	href?: string;
	inverse?: boolean;
	border?: boolean;
	disabled?: boolean;
}
