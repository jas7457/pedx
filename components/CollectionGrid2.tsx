import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';

import ThemeButton from './ThemeButton';
import GraphQL from './GraphQL';
import Animation from './Animation';
import Slider from './Slider';

import fadeIn from '../animations/fadeIn';

import { COLLECTION_GRID_QUERY } from '../generated/COLLECTION_GRID_QUERY';
import ConstrainedWidth from './ConstrainedWidth';
import theme from '../config/theme';

export default function CollectionGrid() {
	const result = useQuery<COLLECTION_GRID_QUERY>(COLLECTION_GRID_GQL_QUERY);

	return (
		<GraphQL result={result}>
			{data => {
				return (
					<StyledCollectionGrid>
						<Animation animation={fadeIn}>
							<ConstrainedWidth>
								<div className="collection-grid-inner flex w-full">
									<aside className="flex align-center justify-space-between">
										<div className="title uppercase">Collections</div>
										<ThemeButton onClick={() => alert('Route not yet made')}>Shop All</ThemeButton>
									</aside>
									<Slider
										className="flex-grow"
										items={data.collections.edges.map(collection => ({
											id: collection.node.id,
											title: collection.node.title,
											href: `/collections/[handle]`,
											as: `/collections/${collection.node.handle}`,
											image: collection.node.image?.originalSrc!
										}))}
										config={{
											mobile: {
												widthPercent: 75,
												onScreen: 1
											},
											tablet: {
												widthPercent: 50,
												onScreen: 2
											},
											desktop: {
												widthPercent: 100 / 3,
												onScreen: 3
											}
										}}
									/>
								</div>
							</ConstrainedWidth>
						</Animation>
					</StyledCollectionGrid>
				);
			}}
		</GraphQL>
	);
}

const StyledCollectionGrid = styled.section`
	background-color: ${theme.colors.gray.lightest};
	padding: ${theme.dimensions['3']} 0;

	.collection-grid-inner {
		margin: ${theme.dimensions['4']} 0;

		flex-direction: column;
		@media (min-width: ${theme.breakpoints.desktop}) {
			flex-direction: row;
		}
	}

	aside {
		flex-direction: row;
		margin-bottom: ${theme.dimensions['2']};

		@media (min-width: ${theme.breakpoints.desktop}) {
			padding-right: 2rem;
			margin-right: 1em;
			border-right: 1px solid ${theme.colors.gray.medium};
			flex-direction: column;
			justify-content: center;
			margin-bottom: 0;
		}

		.title {
			font-size: ${theme.text['2xl']};
			letter-spacing: 4px;
		}
	}
`;

const COLLECTION_GRID_GQL_QUERY = gql`
	query COLLECTION_GRID_QUERY {
		collections(first: 10) {
			edges {
				node {
					id
					handle
					description
					title
					image {
						originalSrc
					}
				}
			}
		}
	}
`;
