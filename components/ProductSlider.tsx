import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Animation from './Animation';
import Slider from './Slider';

import composeAnimations from '../animations/composeAnimations';
import fadeIn from '../animations/fadeIn';
import transformLeft from '../animations/transformLeft';

import theme from '../config/theme';

const productSliderAnimation = composeAnimations([fadeIn, transformLeft]);

export default function ProductSlider(props: ProductSliderProps) {
	const { products } = props;
	const [ref, setRef] = useState<HTMLDivElement | null>(null);
	const [isClickable, setIsClickable] = useState(true);

	return (
		<StyledProductList ref={setRef}>
			{ref && (
				<Animation animation={productSliderAnimation}>
					<Slider
						htmlRef={ref}
						onDrag={dragValues => {
							if (dragValues.distance > 50) {
								setIsClickable(false);
							} else {
								setIsClickable(true);
							}
						}}
						onCancel={() => setIsClickable(true)}
					>
						{products.map(product => ({
							image: product.image,
							children: (
								<Link href={`/products/[handle]`} as={product.href}>
									<a
										className="block h-full w-full"
										onClick={e => {
											if (!isClickable) {
												e.preventDefault();
											}
										}}
										onDragStart={e => e.preventDefault()}
									>
										<div className="product-title absolute w-full bottom-0 left-0 truncate">
											{product.title}
										</div>
									</a>
								</Link>
							)
						}))}
					</Slider>
				</Animation>
			)}
		</StyledProductList>
	);
}

const StyledProductList = styled.div`
	.product-title {
		padding: ${theme.dimensions['4']};
		background-color: rgba(255, 255, 255, 0.8);
	}

	a {
		user-select: none;
	}
`;

interface ProductSliderProps {
	products: Array<{ image: string; title: string; href: string }>;
}
