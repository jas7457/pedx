import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import CollectionGrid from '../components/CollectionGrid';
import BackgroundImage from '../components/BackgroundImage';
import ThemeButton from '../components/ThemeButton';
import SectionTitle from '../components/SectionTitle';
import PopularProducts from '../components/PopularProducts';
import RecentlyViewed from '../components/RecentlyViewed';

import theme from '../config/theme';
import NewProducts from '../components/NewProducts';

export default function Index() {
	return (
		<StyledIndex>
			<BackgroundImage image="/background2.jpg" className="background-image">
				<div className="inner">
					<h1 className="white uppercase">pedx</h1>
					<Link href="/shop">
						<a>
							<ThemeButton border>Shop</ThemeButton>
						</a>
					</Link>
				</div>
			</BackgroundImage>

			<SectionTitle title="Collections" />
			<CollectionGrid />

			<SectionTitle title="What's Popular" />
			<PopularProducts />

			<SectionTitle title="What's New" />
			<NewProducts />

			<RecentlyViewed />
		</StyledIndex>
	);
}

const StyledIndex = styled.div`
	margin-top: ${`-${theme.headerHeight}`};

	.background-image {
		height: 90vh;
		background-attachment: fixed;

		& > * {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: ${theme.backgrounds.faded_black};
			text-align: center;

			h1 {
				font-size: ${theme.text['8xl']};
				font-weight: 400;
				letter-spacing: 1rem;
			}
		}
	}
`;
