import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
// @ts-ignore
import Zoom from 'react-reveal/zoom';

import ScaledBackgroundImage from './ScaledBackgroundImage';

import theme from '../config/theme';

import { COLLECTION_PAGE_QUERY_collectionByHandle_products_edges } from '../generated/COLLECTION_PAGE_QUERY';

export default function ProductList(props: ProductListProps) {
	const { products, className } = props;

	return (
		<StyledProductList className={className}>
			{products.map((product, index) => {
				const image = product.node.images.edges[0].node.originalSrc;

				return (
					<li key={product.node.id}>
						<Zoom>
							<>
								<Link href={`/products/${product.node.handle}`}>
									<a className="anchor" title={`Shop ${product.node.title}`}>
										<ScaledBackgroundImage className="scaled-background-image" image={image} />
									</a>
								</Link>
								<div className="truncate" title={product.node.title}>
									{product.node.title}
								</div>
								<div>
									<b>{dollarize(product.node.priceRange.minVariantPrice.amount)}</b>
								</div>
							</>
						</Zoom>
					</li>
				);
			})}
		</StyledProductList>
	);
}

const StyledProductList = styled.ul`
	display: flex;
	flex-wrap: wrap;

	& > li {
		margin-bottom: ${theme.dimensions['4']};

		.anchor {
			display: block;
			overflow: hidden;
		}

		@media (min-width: ${theme.breakpoints.tablet}) {
			width: calc(33.3333% - 13.3333px);
			margin-right: 20px;

			&:nth-child(3) {
				margin-right: 0;
			}
		}
	}

	.scaled-background-image {
		&:after {
			content: '';
			display: block;
			padding-bottom: 100%;
		}
	}
`;

function dollarize(num: string): string {
	return `$${parseFloat(num).toFixed(2)}`;
}

interface ProductListProps {
	products: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges[];
	className?:string;
}
