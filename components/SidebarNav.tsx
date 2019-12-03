import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faInfoCircle,
	faStore,
	faAt,
	faQuestionCircle,
	faEye,
	faTimes
} from '@fortawesome/free-solid-svg-icons';

import Overlay from './Overlay';

import theme from '../config/theme';

export default function SidebarNav(props: SidebarNavProps) {
	const { isOpen, setIsSidebarOpen } = props;

	return (
		<>
			<Overlay isOpen={isOpen} onClick={() => setIsSidebarOpen(false)} />

			<StyledSidebarNav
				style={useSpring({
					transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)'
				})}
			>
				<button className="close-button" onClick={() => setIsSidebarOpen(false)}>
					<FontAwesomeIcon icon={faTimes} />
				</button>

				<ul className="list-none">
					{links.map(link => {
						return (
							<li key={link.href}>
								<Link href={link.href}>
									<a className="link-anchor">
										<span className="icon">{link.icon}</span>
										<span>{link.text}</span>
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</StyledSidebarNav>
		</>
	);
}

const StyledSidebarNav = styled(animated.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: ${theme.dimensions['20']};
	height: 100%;
	z-index: 2;
	padding: ${theme.dimensions['5']};
	background-color: ${theme.colors.gray_800};
	color: white;
	max-width: 90%;

	.close-button {
		position: absolute;
		top: ${theme.dimensions['2']};
		right: ${theme.dimensions['4']};

		&:hover,
		&:focus {
			color: ${theme.colors.primary.main};
		}
	}

	ul {
		li {
			margin-bottom: ${theme.dimensions['4']};
		}
	}

	a.link-anchor {
		display: flex;
		align-items: center;

		&:hover,
		&:focus {
			color: ${theme.colors.primary.main};
		}

		.icon {
			margin-right: ${theme.dimensions['3']};
		}
	}
`;

const links: Array<{ text: string; href: string; icon: ReactNode }> = [
	{
		text: 'Home',
		href: '/',
		icon: <FontAwesomeIcon icon={faHome} />
	},
	{
		text: 'About',
		href: '/about',
		icon: <FontAwesomeIcon icon={faInfoCircle} />
	},
	{
		text: 'Shop',
		href: '/shop',
		icon: <FontAwesomeIcon icon={faStore} />
	},
	{
		text: 'Contact',
		href: '/contact',
		icon: <FontAwesomeIcon icon={faAt} />
	},
	{
		text: 'FAQs',
		href: '/faq',
		icon: <FontAwesomeIcon icon={faQuestionCircle} />
	},
	{
		text: 'Looks',
		href: '/looks',
		icon: <FontAwesomeIcon icon={faEye} />
	}
];

interface SidebarNavProps {
	isOpen: boolean;
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}
