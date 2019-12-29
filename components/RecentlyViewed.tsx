import React from 'react';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';

import SectionTitle from './SectionTitle';
import GraphQL from './GraphQL';
import BackgroundImage from './BackgroundImage';
import ConstrainedWidth from './ConstrainedWidth';
import Animation from './Animation';

import useLocalStorage from '../hooks/useLocalStorage';

import { PRODUCT_BY_HANDLE_QUERY } from './pages/product/ProductGQL';
import { PRODUCT_BY_HANDLE } from '../generated/PRODUCT_BY_HANDLE';

import theme from '../config/theme';
import composeAnimations from '../animations/composeAnimations';
import fadeIn from '../animations/fadeIn';
import transformLeft from '../animations/transformLeft';

const recentlyViewedAnimation = composeAnimations([fadeIn, transformLeft]);

export default function RecentlyViewed() {
	const [items] = useLocalStorage<string[]>('recentlyViewed', []);

	if (items.length === 0) {
		return null;
	}

	const queries = items.map(item =>
		useQuery<PRODUCT_BY_HANDLE>(PRODUCT_BY_HANDLE_QUERY, {
			variables: {
				handle: item
			}
		})
	);

	return (
		<>
			<SectionTitle title="Recently Viewed" />
			<Animation animation={recentlyViewedAnimation}>
				<ConstrainedWidth>
					<StyledRecentlyViewed className="list-reset flex">
						{queries.map((query, index) => {
							return (
								<GraphQL result={query}>
									{data => {
										if (!data.productByHandle) {
											return null;
										}

										return (
											<li key={items[index]} className="flex-shrink-none relative">
												<div className="absolute w-full h-full top-0 left-0">
													<BackgroundImage
														image={data.productByHandle.images.edges[0].node.originalSrc}
														className="recent-background-image h-full w-full"
													>
														<Link href="/products/[handle]" as={`products/${items[index]}`}>
															<a className="product-link flex align-center justify-center absolute top-0 left-0 w-full h-full overflow-hidden">
																{data.productByHandle.title}
															</a>
														</Link>
													</BackgroundImage>
												</div>
											</li>
										);
									}}
								</GraphQL>
							);
						})}
					</StyledRecentlyViewed>
				</ConstrainedWidth>
			</Animation>
		</>
	);
}

const StyledRecentlyViewed = styled.ol`
	overflow-x: auto;

	li {
		position: relative;
		width: 42%;
		&:after {
			content: '';
			display: block;
			padding-bottom: 100%;
		}

		.recent-background-image {
			background-position: top center;
		}

		@media (min-width: ${theme.breakpoints.tablet}) {
			width: 24%;
		}
	}

	.product-link {
		color: white;
		opacity: 0;
		will-change: opacity;
		transition: opacity ${theme.transitionTime};
		background-color: ${theme.backgrounds.faded_black};
		padding: 0 ${theme.dimensions['2']};
		letter-spacing: 1px;
		text-align: center;

		&:hover,
		&:focus {
			opacity: 1;
		}
	}
`;
