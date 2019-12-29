// library
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { config } from 'react-spring';

// components
import SidebarNav from './SidebarNav';
import Cart from './cart/Cart';
import Animation from './Animation';

import { CartContext } from '../context/CartContext';
import scaleToOne from '../animations/scaleToOne';
import theme from '../config/theme';

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const { setIsCartOpen, checkout } = useContext(CartContext);

	const cartTotal = checkout
		? checkout.lineItems.edges.reduce((accum, current) => accum + current.node.quantity, 0)
		: 0;

	return (
		<StyledHeader className="flex">
			<button
				className="flex-shrink-none clickable"
				aria-label="Main Menu"
				onClick={() => setIsSidebarOpen(isOpen => !isOpen)}
			>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<div className="center flex-grow flex-shrink-none uppercase">
				<Link href="/">
					<a>pedestrian</a>
				</Link>
			</div>

			<button
				className="shopping-button flex-shrink-none relative clickable"
				aria-label="Shopping Cart"
				onClick={() => setIsCartOpen(true)}
			>
				<FontAwesomeIcon icon={faShoppingCart} />
				{cartTotal > 0 && (
					<Animation
						className="shopping-count flex align-center justify-center absolute top-0 overflow-hidden"
						config={config.wobbly}
						animation={scaleToOne}
					>
						{cartTotal}
					</Animation>
				)}
			</button>

			<SidebarNav isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

			<Cart />
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	position: fixed;
	top: 0;
	padding: ${theme.dimensions['4']};
	height: ${theme.headerHeight};
	width: 100%;
	z-index: 2;
	box-shadow: ${theme.boxShadow.bottom};
	background-color: rgba(255, 255, 255, 0.95);

	.center {
		text-align: center;
		font-size: ${theme.text['2xl']};
		letter-spacing: 12px;
	}

	.shopping-button {
		.shopping-count {
			right: -0.4rem;
			height: 14px;
			width: 14px;
			border-radius: 100%;
			border: 1px solid black;
			background-color: white;
			font-size: 0.5rem;
			font-weight: 600;
		}
	}
`;
