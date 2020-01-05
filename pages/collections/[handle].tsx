import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';

import ProductList from '../../components/ProductList';
import ConstrainedWidth from '../../components/ConstrainedWidth';
import GraphQL from '../../components/GraphQL';
import FourOhFour from '../../components/FourOhFour';
import Animation from '../../components/Animation';
import BackgroundImage from '../../components/BackgroundImage';
import AspectRatio from '../../components/AspectRatio';

import fadeInTransformUp from '../../animations/fadeInTransformUp';
import fadeIn from '../../animations/fadeIn';
import theme from '../../config/theme';

import { ProductConnectionFragment } from '../../gql/products';
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
					<StyledCollectionPage>
						<Animation animation={fadeIn}>
							<AspectRatio className="hero" ratio={9 / 16}>
								<BackgroundImage image={values.image?.originalSrc!}>
									<div className="hero__child flex align-center justify-center w-full h-full white">
										<div className="w-full">
											<h1 className="uppercase">{values.title}</h1>
											<i>{values.description}</i>
										</div>
									</div>
								</BackgroundImage>
							</AspectRatio>
						</Animation>

						<ConstrainedWidth>
							<ProductList
								animation={fadeInTransformUp}
								products={values.products.edges.map(edge => ({
									...edge.node,
									image: edge.node.images.edges[0].node.originalSrc,
									price: edge.node.priceRange.minVariantPrice.amount
								}))}
							/>
						</ConstrainedWidth>
					</StyledCollectionPage>
				);
			}}
		</GraphQL>
	);
}

const StyledCollectionPage = styled.div`
	margin-top: ${`-${theme.headerHeight}`};

	.hero {
		max-height: 80vh;
		min-height: 60vh;
		margin-bottom: ${theme.dimensions['4']};
	}

	.hero__child {
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);

		h1 {
			font-size: ${theme.text['5xl']};
			font-weight: 100;
			letter-spacing: 6px;
			word-break: break-word;

			@media (min-width: ${theme.breakpoints.tablet}) {
				font-size: ${theme.text['6xl']};
			}
		}

		i {
			color: ${theme.colors.gray.lighter};
		}
	}
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
				...ProductConnectionFragment
			}
		}
	}
	${ProductConnectionFragment}
`;
