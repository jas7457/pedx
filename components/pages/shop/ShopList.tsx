import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import GraphQL from '../../GraphQL';
import ProductList from '../../ProductList';
import Heading from '../../Heading';
import Select from '../../Select';

import fadeIn from '../../../animations/fadeIn';

import { ProductConnectionFragment } from '../../../gql/products';
import { SHOP_PAGE_PRODUCTS_QUERY } from '../../../generated/SHOP_PAGE_PRODUCTS_QUERY';
import ShopState, { ShopStateReducerAction, SORTS } from './ShopState';
import theme from '../../../config/theme';

export default function ShopList(props: {
	query: string;
	sort?: ShopState['sort'];
	dispatch: React.Dispatch<ShopStateReducerAction>;
}) {
	const { query, sort, dispatch } = props;
	const { sortKey = SORTS[0].sortKey, reverse = false, title = '' } = sort || {};

	const result = useQuery<SHOP_PAGE_PRODUCTS_QUERY>(SHOP_PAGE_PRODUCTS_GQL_QUERY, {
		variables: {
			query,
			sortKey,
			reverse
		}
	});

	return (
		<StyledShopList>
			<div className="shop-title-wrapper flex">
				<Heading as="h1" size="medium" className="shop-title flex-grow" fontWeight={100}>
					Pedx Shop
				</Heading>

				<div className="flex flex-shrink-none align-center">
					<Select
						label="Sort By"
						options={SORTS.map(sort => sort.title)}
						value={title}
						onChange={e => {
							const sort = SORTS.find(sort => sort.title === e.target.value)!;

							dispatch({
								...sort,
								type: 'SET_SORT'
							});
						}}
					/>
					<button
						onClick={() => dispatch({ type: 'TOGGLE_FILTERS' })}
						className="filter-button flex align-center ml-auto"
					>
						<b>Filters</b>
						<FontAwesomeIcon size="sm" icon={faFilter} />
					</button>
				</div>
			</div>

			<GraphQL result={result}>
				{data => <ProductList className="product-list" products={data.products.edges} animation={fadeIn} />}
			</GraphQL>
		</StyledShopList>
	);
}

const StyledShopList = styled.div`
	.shop-title-wrapper {
		flex-direction: column;
	}

	.shop-title {
		font-size: ${theme.dimensions['8']};
	}

	.product-list {
		margin-top: ${theme.dimensions['2']};
	}

	.filter-button {
		svg {
			margin-left: ${theme.dimensions['1']};
		}
	}

	select {
		width: 150px;
		margin: 0 ${theme.dimensions['2']};
	}

	@media (min-width: ${theme.breakpoints.tablet}) {
		.shop-title-wrapper {
			flex-direction: row;
			align-items: center;
		}

		.shop-title {
			font-size: ${theme.dimensions['8']};
		}
	}
`;

const SHOP_PAGE_PRODUCTS_GQL_QUERY = gql`
	query SHOP_PAGE_PRODUCTS_QUERY($query: String!, $sortKey: ProductSortKeys!, $reverse: Boolean!) {
		products(first: 30, query: $query, sortKey: $sortKey, reverse: $reverse) {
			...ProductConnectionFragment
		}
	}
	${ProductConnectionFragment}
`;
