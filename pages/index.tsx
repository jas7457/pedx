import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import CollectionGrid from '../components/CollectionGrid';
import ConstrainedWidth from '../components/ConstrainedWidth';
import BackgroundImage from '../components/BackgroundImage';
import Heading from '../components/Heading';

import theme from '../config/theme';
import ThemeButton from '../components/ThemeButton';

export default function Index() {
	return (
		<StyledIndex>
			<BackgroundImage image="/background2.jpg" className="background-image">
				<div className="inner">
					<h1>pedx</h1>
					<Link href="/shop">
						<a>
							<ThemeButton border>Shop</ThemeButton>
						</a>
					</Link>
				</div>
			</BackgroundImage>

			<ConstrainedWidth>
				<Heading as="h2" size="medium" fontWeight={100}>
					Collections
				</Heading>
				<CollectionGrid />
			</ConstrainedWidth>
		</StyledIndex>
	);
}

const StyledIndex = styled.div`
	margin-top: ${`-${theme.headerHeight}`};

	.background-image {
		height: 90vh;
		background-attachment: fixed;

		.children {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: ${theme.backgrounds.faded_black};
			text-align: center;

			h1 {
				font-size: ${theme.text['8xl']};
				font-weight: 400;
				letter-spacing: 1rem;
				color: white;
				text-transform: uppercase;
			}
		}
	}
`;
