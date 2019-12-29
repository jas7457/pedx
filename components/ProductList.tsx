import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';

import ScaledBackgroundImage from './ScaledBackgroundImage';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

import dollarize from '../helpers/dollarize';
import theme from '../config/theme';

import { COLLECTION_PAGE_QUERY_collectionByHandle_products_edges } from '../generated/COLLECTION_PAGE_QUERY';

export default function ProductList(props: ProductListProps) {
	const { products, className, animation } = props;

	return (
		<StyledProductList className={classNames(className, 'list-reset flex flex-wrap')}>
			{products.length === 0 ? (
				<>No products found</>
			) : (
				products.map(product => (
					<ProductListItem key={product.node.id} product={product} animation={animation} />
				))
			)}
		</StyledProductList>
	);
}

function ProductListItem(props: {
	product: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges;
	animation?: { from: object; to: object };
}) {
	const { product, animation } = props;
	const node = product.node;

	const { ref, isIntersecting } = useIntersectionObserver<HTMLLIElement>();

	const styles = (() => {
		if (!animation) {
			return {};
		}

		return isIntersecting ? animation.to : animation.from;
	})();

	return (
		<animated.li key={node.id} className="w-full" ref={ref} style={useSpring(styles)}>
			<Link href="/products/[handle]" as={`/products/${node.handle}`}>
				<a className="block overflow-hidden" title={`Shop ${node.title}`}>
					<ScaledBackgroundImage
						className="scaled-background-image"
						image={node.images.edges[0].node.originalSrc}
					/>
				</a>
			</Link>

			<div className="product-title truncate uppercase" title={node.title}>
				{node.title}
			</div>

			<i className="block">{dollarize(node.priceRange.minVariantPrice.amount)}</i>
		</animated.li>
	);
}

const StyledProductList = styled.ul`
	& > li {
		margin-bottom: ${theme.dimensions['4']};

		.product-title {
			font-size: ${theme.text.lg};
			font-weight: 100;
			letter-spacing: 1px;
		}

		@media (min-width: ${theme.breakpoints.tablet}) {
			width: calc(33.3333% - 13.3333px);
			margin-right: 20px;

			&:nth-child(3n) {
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
	animation?: { from: object; to: object };
}
