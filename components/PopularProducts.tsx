import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import GraphQL from './GraphQL';
import Slider from './Slider';

import { ProductConnectionFragment } from '../gql/products';
import { ProductSortKeys } from '../generated/globalTypes';
import { SHOP_PAGE_PRODUCTS_QUERY } from '../generated/SHOP_PAGE_PRODUCTS_QUERY';

export default function PopularProducts() {
	const result = useQuery<SHOP_PAGE_PRODUCTS_QUERY>(POPULAR_PRODUCTS_GQL_QUERY);

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
							subtitle: edge.node.productType,
							as: `/products/${edge.node.handle}`,
							href: '/products/[handle]'
						}))}
						config={{
							mobile: {
								widthPercent: 75,
								onScreen: 1,
								showButtons: true
							},
							tablet: {
								widthPercent: 40,
								onScreen: 2,
								showButtons: true
							},
							desktop: {
								widthPercent: 100 / 3,
								onScreen: 3,
								showButtons: true
							}
						}}
					/>
				)}
			</GraphQL>
		</section>
	);
}

const POPULAR_PRODUCTS_GQL_QUERY = gql`
	query POPULAR_PRODUCTS_QUERY {
		products(first: 20, sortKey: ${ProductSortKeys.BEST_SELLING}) {
			...ProductConnectionFragment
		}
	}
	${ProductConnectionFragment}
`;
