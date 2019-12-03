// library
import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// components
import SidebarNav from './SidebarNav';

import theme from '../config/theme';

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<StyledHeader>
			<button className="clickable left" onClick={() => setIsSidebarOpen(isOpen => !isOpen)}>
				<FontAwesomeIcon icon={faBars} />
			</button>

			<div className="center">
				<Link href="/">
					<a className="clickable">pedestrian</a>
				</Link>
			</div>

			<div className="right">
				<button className="clickable login-button" onClick={() => alert('Not yet implemented')}>
					Login
				</button>

				<button className="clickable" onClick={() => alert('Not yet implemented')}>
					<FontAwesomeIcon icon={faShoppingCart} />
				</button>
			</div>

			<SidebarNav isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	position: fixed;
	display: flex;
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

	.left {
		flex-shrink: 0;
	}

	.center {
		flex-shrink: 1;
		flex-grow: 1;
		text-align: center;
		font-size: ${theme.text['2xl']};
		text-transform: uppercase;
		letter-spacing: 12px;
	}

	.right {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.login-button {
		margin-right: ${theme.dimensions['2']};
	}
`;
