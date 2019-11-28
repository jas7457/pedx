import React from 'react';
import styled from 'styled-components';

import BackgroundImage from './BackgroundImage';

import { COLLECTION_PAGE_QUERY_collectionByHandle_products_edges } from '../generated/COLLECTION_PAGE_QUERY';

function ProductList(props: ProductListProps) {
	const { products, className, ...rest } = props;

	return (
		<ul {...rest} className={className}>
			{products.map(product => {
				const image = product.node.images.edges[0].node.originalSrc;

				return (
					<li className="list-item">
						<BackgroundImage image={image} paddingBottom="100%" />
						<div>{product.node.title}</div>
						<div>
							<b>{product.node.priceRange.minVariantPrice.amount}</b>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

type T = JSX.IntrinsicElements['ul'];

interface ProductListProps extends T {
	products: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges[];
}

export default styled(ProductList)`
	display: flex;
	flex-wrap: wrap;
	list-style: none;

	.list-item {
		width: calc(33% - 10px);
		margin-right: 20px;

		&:nth-child(3n) {
			margin-right: 0;
		}
	}
`;
