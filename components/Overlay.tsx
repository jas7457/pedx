import React, { ReactNode } from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

export default function Overlay(props: OverlayProps) {
	const { isOpen, children, onClick } = props;

	return (
		<StyledOverlay className="OVERLAY" onClick={onClick} isOpen={isOpen}>
			{children}
		</StyledOverlay>
	);
}

const StyledOverlay = styled.div<{ isOpen: boolean }>`
	display: ${props => (props.isOpen ? 'block' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	will-change: opacity;
	transition: opacity ${theme.transitionTime};
	background-color: ${theme.backgrounds.faded_black};
	opacity: ${props => (props.isOpen ? 1 : 0)};
	z-index: 2;
`;

interface OverlayProps {
	isOpen: boolean;
	children?: ReactNode;
	onClick?: () => void;
}
