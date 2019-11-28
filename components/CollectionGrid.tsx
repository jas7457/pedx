import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';

import ThemeButton from './ThemeButton';

import {
	COLLECTION_GRID_QUERY,
	COLLECTION_GRID_QUERY_collections_edges_node
} from '../generated/COLLECTION_GRID_QUERY';

export default function CollectionGrid() {
	const { data, loading, error } = useQuery<COLLECTION_GRID_QUERY>(COLLECTION_GRID_GQL_QUERY);
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	if (!data) {
		return null;
	}

	return (
		<>
			<div>
				<ThemeButton href="/collections">Shop collections</ThemeButton>
			</div>
			<StyledCollectionGrid>
				{data.collections.edges.map(product => (
					<CollectionGridItem key={product.node.id} {...product.node} />
				))}
			</StyledCollectionGrid>
		</>
	);
}

function CollectionGridItem(props: COLLECTION_GRID_QUERY_collections_edges_node) {
	const { title, description, image, handle } = props;

	return (
		<StyledCollectionGridItem>
			<div className="background-image" style={{ backgroundImage: `url(${image!.originalSrc})` }} />
			<Link href={`/collections/[handle]`} as={`collections/${handle}`}>
				<a>
					<div className="hover">
						<ThemeButton className="shop-now">{`Shop ${title}`}</ThemeButton>
					</div>
				</a>
			</Link>
		</StyledCollectionGridItem>
	);
}

const StyledCollectionGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 800px;
`;

const spacing = 15;
const StyledCollectionGridItem = styled.div`
	position: relative;
	height: calc(50% - ${spacing / 2}px);
	overflow: hidden;
	background-color: black;
	width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
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

	.background-image {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background-size: cover;
		background-position: center;
		transition-duration: ${props => props.theme.transitionTime};
		transition-property: transform, opacity;
		will-change: transform, opacity;
		pointer-events: none;
	}

	.hover {
		position: absolute;
		display: block;
		opacity: 0;
		padding: 20px;
		height: 100%;
		width: 100%;
		will-change: opacity;
	}

	&:hover {
		.hover {
			opacity: 1;
		}

		.background-image {
			transform: scale(1.05);
			opacity: 0.5;
		}
	}

	.shop-now {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		text-transform: uppercase;
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
