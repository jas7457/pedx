import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import GraphQL from '../../GraphQL';
import Heading from '../../Heading';

import ShopState, { ShopStateReducerAction, SORTS } from './ShopState';

import theme from '../../../config/theme';

import { SHOP_FILTER_QUERY } from '../../../generated/SHOP_FILTER_QUERY';

export default function ShopFilter(props: {
	state: ShopState | null;
	dispatch: React.Dispatch<ShopStateReducerAction>;
}) {
	const { state, dispatch } = props;

	const result = useQuery<SHOP_FILTER_QUERY>(SHOP_FILTER_GQL_QUERY);

	return (
		<GraphQL result={result}>
			{data => {
				const { collections, productTags, productTypes } = data;

				if (!state) {
					const initState: ShopState = {
						sort: SORTS[0],
						filtersOpen: window.matchMedia(`(min-width: ${theme.breakpoints.tablet})`).matches,
						filters: [
							{
								title: 'Types',
								handle: 'product_type',
								choices: productTypes.edges.map(productType => {
									return {
										title: productType.node,
										selected: false
									};
								})
							},

							{
								title: 'Tags',
								handle: 'tag',
								choices: productTags.edges.map(productTag => {
									return {
										title: productTag.node,
										selected: false
									};
								})
							}
						]
					};

					dispatch({ type: 'INIT', state: initState });
					return null;
				}

				return (
					<StyledShopFilter>
						{state.filters.map(filter => {
							return (
								<div className="filter-fieldset" key={filter.handle}>
									<div className="flex align-center">
										<Heading
											as="h2"
											size="small"
											className="filter-heading flex-grow flex-shrink-none"
										>
											{filter.title}
										</Heading>
										{filter.choices.some(choice => choice.selected) && (
											<button
												className="clear-filter flex-shrink-none"
												onClick={() => {
													dispatch({
														type: 'CLEAR_FILTER',
														filterTitle: filter.title
													});
												}}
												title={`Clear ${filter.title}`}
											>
												Clear
											</button>
										)}
									</div>

									<ul className="list-reset">
										{filter.choices.map(choice => (
											<li className="choice-item" key={choice.title}>
												<button
													className={choice.selected ? 'selected' : undefined}
													onClick={() => {
														dispatch({
															type: 'TOGGLE_SELECTED',
															filterTitle: filter.title,
															choiceTitle: choice.title
														});
													}}
												>
													<div className="choice-title">{choice.title}</div>
													<FontAwesomeIcon icon={faCheck} />
												</button>
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</StyledShopFilter>
				);
			}}
		</GraphQL>
	);
}

const StyledShopFilter = styled.div`
	.filter-fieldset {
		& + .filter-fieldset {
			margin-top: ${theme.dimensions['6']};
		}

		color: ${theme.colors.gray_600};
	}

	ul {
		margin-left: ${theme.dimensions['4']};
	}

	.filter-heading {
		color: ${theme.colors.text};
	}

	.clear-filter {
		font-size: ${theme.dimensions['3']};
		opacity: 0.5;

		&:hover {
			color: ${theme.colors.primary.main};
		}
	}

	.choice-item {
		button {
			width: 100%;
			display: flex;
			align-items: center;
			text-align: left;

			&.selected {
				color: ${theme.colors.text};
			}

			&:hover {
				color: ${theme.colors.primary.main};
			}

			&.selected {
				svg {
					opacity: 1;
				}
			}

			svg {
				opacity: 0;
			}
		}

		.choice-title {
			margin: 0 ${theme.dimensions['1']};
			flex: 1 0 auto;
		}
	}
`;

const SHOP_FILTER_GQL_QUERY = gql`
	query SHOP_FILTER_QUERY {
		productTypes(first: 100) {
			edges {
				node
			}
		}
		collections(first: 100) {
			edges {
				node {
					id
					title
				}
			}
		}
		productTags(first: 100) {
			edges {
				node
			}
		}
	}
`;
