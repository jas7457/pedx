import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';
import classNames from 'classnames';

import ScaledBackgroundImage from './ScaledBackgroundImage';
import ThemeButton from './ThemeButton';
import GraphQL from './GraphQL';
import Animation from './Animation';
import BackgroundImage from './BackgroundImage';
import Heading from './Heading';

import theme from '../config/theme';
import fadeIn from '../animations/fadeIn';

import { COLLECTION_GRID_QUERY } from '../generated/COLLECTION_GRID_QUERY';

export default function CollectionGrid() {
	const result = useQuery<COLLECTION_GRID_QUERY>(COLLECTION_GRID_GQL_QUERY);
	const [selectedIndex, setSelectedIndex] = useState(0);

	return (
		<GraphQL result={result}>
			{data => {
				const selectedCollection = data.collections.edges[selectedIndex];

				return (
					<Animation animation={fadeIn}>
						<StyledCollectionGrid className="flex overflow-hidden white">
							<BackgroundImage
								className="selected-collection flex-shrink-none h-full"
								image={selectedCollection.node.image!.originalSrc}
							>
								<div className="inner flex align-center justify-center flex-column h-full w-full">
									<Heading
										as="h1"
										size="medium"
										fontWeight={600}
										className="collection-heading uppercase"
									>
										Collections
									</Heading>

									<div className="explore-collections">
										<i>Explore our newest collections</i>
									</div>

									<Link
										href={`/collections/[handle]`}
										as={`collections/${selectedCollection.node.handle}`}
									>
										<a>
											<ThemeButton>{`Shop ${selectedCollection.node.title}`}</ThemeButton>
										</a>
									</Link>
								</div>
							</BackgroundImage>

							<div className="collection-item-wrapper flex flex-wrap flex-shrink-none h-full">
								{data.collections.edges.map((product, index) => {
									const { title, description, image, handle } = product.node;

									return (
										<div
											className={classNames('collection-item overflow-hidden relative', {
												'is-selected': index === selectedIndex
											})}
											onClick={() => setSelectedIndex(index)}
										>
											<ScaledBackgroundImage
												className="scaled-image w-full h-full"
												image={image!.originalSrc}
											/>
											<div className="collection-name absolute w-full h-full top-0 left-0 flex align-center justify-center uppercase">
												{product.node.title}
											</div>
											>
										</div>
									);
								})}
							</div>
						</StyledCollectionGrid>
					</Animation>
				);
			}}
		</GraphQL>
	);
}

const StyledCollectionGrid = styled.div`
	flex-direction: column;
	max-height: 75vh;

	.selected-collection {
		&:after {
			content: '';
			display: block;
			padding-bottom: 75%;
		}

		.inner {
			background-color: ${theme.backgrounds.faded_black_light};
		}
	}

	.collection-item-wrapper {
		height: 250px;
		margin-top: 2px;
	}

	.explore-collections {
		margin-bottom: 3rem;
		color: ${theme.colors.gray.lightest};
	}

	.collection-heading {
		letter-spacing: 4px;
	}

	.collection-item {
		width: calc(50% - 1px);
		height: calc(50% - 1px);
		cursor: pointer;

		&:nth-child(1) {
			margin-right: 2px;
			margin-bottom: 2px;
		}

		&:nth-child(3) {
			margin-right: 2px;
		}
	}

	.collection-name {
		opacity: 1;
		will-change: opacity;
		transition: opacity ${theme.transitionTime};
		background-color: ${theme.backgrounds.faded_black_light};
		font-weight: 100;
		letter-spacing: 1px;
		font-size: ${theme.text.lg};
		font-style: italic;

		&:hover,
		&:focus {
			opacity: 0;
		}
	}

	@media (min-width: ${theme.breakpoints.tablet}) {
		flex-direction: row;

		.selected-collection {
			width: 60%;
		}

		.collection-item-wrapper {
			height: auto;
			width: 40%;
			margin-top: 0;
			margin-left: 2px;
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
