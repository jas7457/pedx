import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';

import ProductList from '../../components/ProductList';
import Hero from '../../components/Hero';
import ConstrainedWidth from '../../components/ConstrainedWidth';
import GraphQL from '../../components/GraphQL';
import FadeIn from '../../components/FadeIn';
import FourOhFour from '../../components/FourOhFour';

import fadeInTransformUp from '../../animations/fadeInTransformUp';
import theme from '../../config/theme';

import { COLLECTION_PAGE_QUERY } from '../../generated/COLLECTION_PAGE_QUERY';

export default function CollectionPage() {
	const router = useRouter();
	const { handle } = router.query;

	const result = useQuery<COLLECTION_PAGE_QUERY>(COLLECTION_PAGE_GQL_QUERY, {
		variables: {
			handle
		}
	});

	return (
		<GraphQL result={result}>
			{data => {
				const values = data.collectionByHandle;
				if (!values) {
					return <FourOhFour />;
				}

				return (
					<>
						<FadeIn>
							<Hero image={values.image?.originalSrc!}>
								<StyledHeroChild className="flex align-center justify-center w-full h-full">
									<div className="w-full">
										<h1>{values.title}</h1>
										<i>{values.description}</i>
									</div>
								</StyledHeroChild>
							</Hero>
						</FadeIn>

						<StyledConstrainedWidth>
							<ProductList products={values.products.edges} animation={fadeInTransformUp} />
						</StyledConstrainedWidth>
					</>
				);
			}}
		</GraphQL>
	);
}

CollectionPage.marginTop = false;

const StyledConstrainedWidth = styled(ConstrainedWidth)`
	margin-top: ${theme.dimensions['4']};
`;

const COLLECTION_PAGE_GQL_QUERY = gql`
	query COLLECTION_PAGE_QUERY($handle: String!) {
		collectionByHandle(handle: $handle) {
			title
			description
			image {
				originalSrc
			}
			products(first: 20) {
				edges {
					node {
						id
						title
						description
						handle
						availableForSale
						priceRange {
							minVariantPrice {
								amount
							}
						}
						images(first: 20) {
							edges {
								node {
									originalSrc
								}
							}
						}
						variants(first: 20) {
							edges {
								node {
									title
									id
									image {
										originalSrc
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

const StyledHeroChild = styled.div`
	color: white;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.5);

	h1 {
		font-size: ${theme.text['5xl']};
		font-weight: 100;
		text-transform: uppercase;
		letter-spacing: 6px;
		word-break: break-word;

		@media (min-width: ${theme.breakpoints.tablet}) {
			font-size: ${theme.text['6xl']};
		}
	}

	i {
		color: ${theme.colors.gray.lighter};
	}
`;
