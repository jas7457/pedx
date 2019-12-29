import React, { ReactNode } from 'react';
import styled from 'styled-components';

import theme from '../config/theme';

export default function Overlay(props: OverlayProps) {
	const { isOpen, children, onClick } = props;

	return (
		<StyledOverlay className="top-0 left-0 w-full h-full" onClick={onClick} isOpen={isOpen}>
			{children}
		</StyledOverlay>
	);
}

const StyledOverlay = styled.div<{ isOpen: boolean }>`
	display: ${props => (props.isOpen ? 'block' : 'none')};
	position: fixed;
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
