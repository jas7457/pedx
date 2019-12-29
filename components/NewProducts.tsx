import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import GraphQL from './GraphQL';
import ProductSlider from './ProductSlider';

import { ProductConnectionFragment } from '../gql/products';
import { ProductSortKeys } from '../generated/globalTypes';
import { SHOP_PAGE_PRODUCTS_QUERY } from '../generated/SHOP_PAGE_PRODUCTS_QUERY';

export default function NewProducts() {
	const result = useQuery<SHOP_PAGE_PRODUCTS_QUERY>(NEW_PRODUCTS_GQL_QUERY);
	const [ref, setRef] = useState<HTMLDivElement | null>(null);

	return (
		<div ref={setRef}>
			<GraphQL result={result}>
				{data => {
					if (!ref) {
						return null;
					}

					return (
						<ProductSlider
							products={data.products.edges.map(edge => ({
								image: edge.node.images.edges[0].node.originalSrc,
								title: edge.node.title,
								href: `/products/${edge.node.handle}`
							}))}
						/>
					);
				}}
			</GraphQL>
		</div>
	);
}

const NEW_PRODUCTS_GQL_QUERY = gql`
	query NEW_PRODUCTS_QUERY {
		products(first: 20, sortKey: ${ProductSortKeys.CREATED_AT}) {
			...ProductConnectionFragment
		}
	}
	${ProductConnectionFragment}
`;
