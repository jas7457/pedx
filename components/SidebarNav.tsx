import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import Link from 'next/link';
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

import Drawer from './Drawer';

import theme from '../config/theme';

export default function SidebarNav(props: SidebarNavProps) {
	const { isOpen, setIsSidebarOpen } = props;

	return (
		<Drawer isOpen={isOpen} onOverlayClick={() => setIsSidebarOpen(false)} type="primary">
			<StyledSidebarNav>
				<ul className="list-reset">
					{links.map(link => {
						return (
							<li key={link.href}>
								<Link href={link.href}>
									<a
										className="link-anchor flex align-center"
										onClick={() => setIsSidebarOpen(false)}
									>
										<span className="icon">{link.icon}</span>
										<span>{link.text}</span>
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</StyledSidebarNav>
		</Drawer>
	);
}

const StyledSidebarNav = styled.div`
	ul {
		li {
			margin-bottom: ${theme.dimensions['4']};
		}
	}

	a.link-anchor {
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
