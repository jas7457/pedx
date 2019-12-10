import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';

import ScaledBackgroundImage from './ScaledBackgroundImage';
import ThemeButton from './ThemeButton';
import GraphQL from './GraphQL';

import theme from '../config/theme';

import {
	COLLECTION_GRID_QUERY,
	COLLECTION_GRID_QUERY_collections_edges_node
} from '../generated/COLLECTION_GRID_QUERY';

export default function CollectionGrid() {
	const result = useQuery<COLLECTION_GRID_QUERY>(COLLECTION_GRID_GQL_QUERY);
	const data = result.data!;

	return (
		<GraphQL result={result}>
			{() => {
				return (
					<StyledCollectionGrid>
						{data.collections.edges.map(product => (
							<CollectionGridItem key={product.node.id} {...product.node} />
						))}
					</StyledCollectionGrid>
				);
			}}
		</GraphQL>
	);
}

const StyledCollectionGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 800px;

	@media (min-width: ${theme.breakpoints.tablet}) {
		max-height: 100vh;
	}
`;

function CollectionGridItem(props: COLLECTION_GRID_QUERY_collections_edges_node) {
	const { title, description, image, handle } = props;

	return (
		<StyledCollectionGridItem>
			<ScaledBackgroundImage className="scaled-background-image" image={image!.originalSrc} />

			<Link href={`/collections/[handle]`} as={`collections/${handle}`}>
				<a className="anchor">
					<ThemeButton className="theme-button" inverse>{`Shop ${title}`}</ThemeButton>
				</a>
			</Link>
		</StyledCollectionGridItem>
	);
}

const spacing = 15;
const StyledCollectionGridItem = styled.div`
	position: relative;
	overflow: hidden;
	background-color: black;
	width: 100%;
	height: calc(50% - ${spacing / 2}px);

	.scaled-background-image {
		height: 100%;
	}

	.anchor {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		opacity: 0;
		will-change: opacity;
		transition: opacity ${theme.transitionTime};
		background-color: ${theme.backgrounds.faded_black};
	}

	.theme-button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		text-transform: uppercase;
	}

	&:hover {
		.scaled-background-image {
			transform: scale(${theme.scale.sm});
		}
		.anchor {
			opacity: 1;
		}
	}

	@media (min-width: ${theme.breakpoints.tablet}) {
		:nth-child(1) {
			width: 66%;
			margin-right: ${spacing}px;
			margin-bottom: ${spacing}px;
		}

		:nth-child(2) {
			width: calc(34% - ${spacing}px);
		}

		:nth-child(3) {
			width: 34%;
			margin-right: ${spacing}px;
		}

		:nth-child(4) {
			width: calc(66% - ${spacing}px);
		}
	}
`;

const COLLECTION_GRID_GQL_QUERY = gql`
	query COLLECTION_GRID_QUERY {
		collections(first: 4) {
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
