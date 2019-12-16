import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import Overlay from './Overlay';

import theme from '../config/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Drawer(props: DrawerProps) {
	const { isOpen, onOverlayClick, children, type, className, side = 'left' } = props;

	const transform = (() => {
		if (side === 'left') {
			return isOpen ? 'translateX(0%)' : 'translateX(-100%)';
		}

		return isOpen ? 'translateX(0%)' : 'translateX(100%)';
	})();

	return (
		<>
			<Overlay isOpen={isOpen} onClick={() => onOverlayClick()}></Overlay>
			<StyledOverlayChildren
				style={useSpring({ transform })}
				side={side}
				type={type}
				isOpen={isOpen}
				className={className}
			>
				<>
					<button className="close-button" onClick={() => onOverlayClick()}>
						<FontAwesomeIcon icon={faTimes} />
					</button>

					{children}
				</>
			</StyledOverlayChildren>
		</>
	);
}

const StyledOverlayChildren = styled(animated.div)<{
	type: DrawerProps['type'];
	isOpen: boolean;
	side: DrawerProps['side'];
}>`
	position: fixed;
	background: ${props => (props.type === 'primary' ? theme.colors.gray_800 : 'white')};
	color: ${props => (props.type === 'primary' ? 'white' : theme.colors.text)};
	width: 75%;
	max-width: 300px;
	${props => `${props.side}: 0`};
	top: 0;
	bottom: 0;
	z-index: 2;
	padding: ${theme.dimensions['4']};

	.close-button {
		position: absolute;
		top: 0;
		right: ${theme.dimensions['1']};
		padding: ${theme.dimensions['2']};

		&:hover,
		&:focus {
			color: ${theme.colors.primary.main};
		}
	}
`;

interface DrawerProps {
	children: React.ReactNode;
	isOpen: boolean;
	onOverlayClick: () => void;
	type: 'primary' | 'secondary';
	side?: 'left' | 'right';
	className?: string;
}
