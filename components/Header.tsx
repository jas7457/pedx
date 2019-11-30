import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default function Header() {
	return (
		<StyledHeader>
			<nav>
				<ul>
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>

					<li>
						<Link href="/about">
							<a>About</a>
						</Link>
					</li>

					<li>
						<Link href="/shop">
							<a>Shop</a>
						</Link>
					</li>

					<li>
						<Link href="/contact">
							<a>Contact</a>
						</Link>
					</li>

					<li>
						<Link href="/faq">
							<a>FAQs</a>
						</Link>
					</li>

					<li>
						<Link href="/looks">
							<a>Looks</a>
						</Link>
					</li>
				</ul>
			</nav>
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	position: absolute;
	top: 40px;
	width: 100%;
	height: calc(100vh - 20px);
	color: white;

	nav {
		position: sticky;
		top: 10px;
	}

	ul {
		list-style: none;
		text-align: center;
	}

	li {
		display: inline-block;
		text-transform: uppercase;
		font-weight: 100;
		letter-spacing: 2px;

		& ~ li {
			margin-left: 1rem;
		}

		a {
			position: relative;

			&:after {
				border-bottom: 2px solid ${props => props.theme.colors.primary.main};
				content: '';
				display: block;
				width: 0;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				transition: ${props => props.theme.transitionTime} width;
				will-change: width;
			}

			&:hover,
			&:focus {
				&:after {
					width: 100%;
				}
			}
		}
	}
`;
