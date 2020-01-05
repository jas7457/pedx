import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import GraphQL from './GraphQL';
import Slider from './Slider';

import { ProductConnectionFragment } from '../gql/products';
import { ProductSortKeys } from '../generated/globalTypes';
import { SHOP_PAGE_PRODUCTS_QUERY } from '../generated/SHOP_PAGE_PRODUCTS_QUERY';
import dollarize from '../helpers/dollarize';

export default function NewProducts() {
	const result = useQuery<SHOP_PAGE_PRODUCTS_QUERY>(NEW_PRODUCTS_GQL_QUERY);

	return (
		<section>
			<GraphQL result={result}>
				{data => (
					<Slider
						includeIndex={true}
						items={data.products.edges.map(edge => ({
							id: edge.node.id,
							image: edge.node.images.edges[0].node.originalSrc,
							title: edge.node.title,
							subtitle: dollarize(edge.node.priceRange.minVariantPrice.amount, true),
							href: '/products/[handle]',
							as: `/products/${edge.node.handle}`
						}))}
					/>
				)}
			</GraphQL>
		</section>
	);
}

const NEW_PRODUCTS_GQL_QUERY = gql`
	query NEW_PRODUCTS_QUERY {
		products(first: 20, sortKey: ${ProductSortKeys.CREATED_AT}, reverse: true) {
			...ProductConnectionFragment
		}
	}
	${ProductConnectionFragment}
`;
