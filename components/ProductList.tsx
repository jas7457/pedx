import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import classNames from 'classnames';
import { useSpring, animated } from 'react-spring';

import ScaledBackgroundImage from './ScaledBackgroundImage';
import AspectRatio from './AspectRatio';

import useIntersectionObserver from '../hooks/useIntersectionObserver';

import dollarize from '../helpers/dollarize';
import theme from '../config/theme';

export default function ProductList(props: ProductListProps) {
	const { products, className, animation } = props;

	return (
		<StyledProductList className={classNames(className, 'list-reset flex flex-wrap')}>
			{products.length === 0 ? (
				<>No products found</>
			) : (
				products.map(product => <ProductListItem key={product.id} product={product} animation={animation} />)
			)}
		</StyledProductList>
	);
}

function ProductListItem(props: {
	product: ProductListProps['products'][number];
	animation?: { from: object; to: object };
}) {
	const { product, animation } = props;

	const { ref, isIntersecting } = useIntersectionObserver<HTMLLIElement>();

	const styles = (() => {
		if (!animation) {
			return {};
		}

		return isIntersecting ? animation.to : animation.from;
	})();

	return (
		<animated.li key={product.id} className="w-full" ref={ref} style={useSpring(styles)}>
			<Link href="/products/[handle]" as={`/products/${product.handle}`}>
				<a className="block overflow-hidden" title={`Shop ${product.title}`}>
					<AspectRatio ratio={1}>
						<ScaledBackgroundImage image={product.image} />
					</AspectRatio>
				</a>
			</Link>

			<div className="product-title truncate uppercase" title={product.title}>
				{product.title}
			</div>

			<i className="block">{dollarize(product.price)}</i>
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
`;

interface ProductListProps {
	products: Array<{ id: string; image: string; title: string; handle: string; price: string }>;
	className?: string;
	animation?: { from: object; to: object };
}
