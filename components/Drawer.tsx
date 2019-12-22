import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import Overlay from './Overlay';

import theme from '../config/theme';

export default function Drawer(props: DrawerProps) {
	const { isOpen, onOverlayClick, children, className, side = 'left', wide = false } = props;

	const transform = (() => {
		if (side === 'left') {
			return isOpen ? 'translateX(0%)' : 'translateX(-100%)';
		}

		return isOpen ? 'translateX(0%)' : 'translateX(100%)';
	})();

	return (
		<>
			<Overlay isOpen={isOpen} onClick={() => onOverlayClick()} />
			<StyledOverlayChildren
				style={useSpring({ transform })}
				data-side={side}
				data-is-open={isOpen}
				data-wide={wide}
				aria-hidden={!isOpen}
				className={className}
			>
				{children}
			</StyledOverlayChildren>
		</>
	);
}

const StyledOverlayChildren = styled(animated.div)<{
	'data-is-open': boolean;
	'data-side': DrawerProps['side'];
	'data-wide': boolean;
}>`
	position: fixed;
	width: 75%;
	top: 0;
	bottom: 0;
	z-index: 2;

	background: white;
	color: ${theme.colors.text};
	max-width: ${props => (props['data-wide'] ? '600px' : '300px')};
	${props => `${props['data-side']}: 0`};
`;

interface DrawerProps {
	children: React.ReactNode;
	isOpen: boolean;
	onOverlayClick: () => void;
	side?: 'left' | 'right';
	className?: string;
	wide?: boolean;
}
