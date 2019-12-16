// library
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// components
import SidebarNav from './SidebarNav';
import Cart from './Cart';

import theme from '../config/theme';

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);

	return (
		<StyledHeader className="flex">
			<button className="clickable flex-shrink-none" onClick={() => setIsSidebarOpen(isOpen => !isOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<div className="center flex-grow flex-shrink-none">
				<Link href="/">
					<a className="clickable">pedestrian</a>
				</Link>
			</div>

			<button className="clickable flex-shrink-none" onClick={() => setIsCartOpen(!isCartOpen)}>
				<FontAwesomeIcon icon={faShoppingCart} />
			</button>

			<SidebarNav isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

			<Cart isOpen={isCartOpen} handleClose={() => setIsCartOpen(false)} />
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	position: fixed;
	top: 0;
	padding: ${theme.dimensions['4']};
	height: ${theme.dimensions['10']};
	width: 100%;
	z-index: 2;
	box-shadow: ${theme.boxShadow.bottom};
	background-color: rgba(255, 255, 255, 0.9);

	.clickable {
		color: ${theme.colors.text};
		will-change: color;
		transition: color ${theme.transitionTime};

		&:hover {
			color: ${theme.colors.primary.main};
		}
	}

	.center {
		text-align: center;
		font-size: ${theme.text['2xl']};
		text-transform: uppercase;
		letter-spacing: 12px;
	}
`;
