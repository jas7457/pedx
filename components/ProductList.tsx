import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classNames from 'classnames';
// @ts-ignore
import Fade from 'react-reveal/fade';

import ScaledBackgroundImage from './ScaledBackgroundImage';

import dollarize from '../helpers/dollarize';
import theme from '../config/theme';

import { COLLECTION_PAGE_QUERY_collectionByHandle_products_edges } from '../generated/COLLECTION_PAGE_QUERY';

export default function ProductList(props: ProductListProps) {
	const { products, className } = props;

	return (
		<StyledProductList className={classNames(className, 'list-reset')}>
			{products.map(product => {
				const image = product.node.images.edges[0].node.originalSrc;

				return (
					<li key={product.node.id}>
						<Fade>
							<>
								<Link href={`/products/${product.node.handle}`}>
									<a className="anchor" title={`Shop ${product.node.title}`}>
										<ScaledBackgroundImage className="scaled-background-image" image={image} />
									</a>
								</Link>
								<div className="product-title truncate" title={product.node.title}>
									{product.node.title}
								</div>
								<div className="product-price">
									{dollarize(product.node.priceRange.minVariantPrice.amount)}
								</div>
							</>
						</Fade>
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
		width: 100%;
		margin-bottom: ${theme.dimensions['4']};

		.anchor {
			display: block;
			overflow: hidden;
		}

		.product-title {
			text-transform: uppercase;
			font-size: ${theme.text.lg};
			font-weight: 100;
		}

		.product-price {
			font-style: italic;
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

interface ProductListProps {
	products: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges[];
	className?: string;
}
