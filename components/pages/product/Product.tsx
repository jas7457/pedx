import React, { useEffect } from 'react';
import { useQuery } from 'react-apollo';
import without from 'lodash/without';

import ProductDisplay, { Recommendations } from './ProductDisplay';
import { PRODUCT_BY_HANDLE_QUERY } from './ProductGQL';

import GraphQL from '../../GraphQL';
import FourOhFour from '../../FourOhFour';

import { PRODUCT_BY_HANDLE } from '../../../generated/PRODUCT_BY_HANDLE';
import ConstrainedWidth from '../../ConstrainedWidth';
import useLocalStorage from '../../../hooks/useLocalStorage';

export default function Product(props: ProductProps) {
	const { handle, variantId } = props;

	const result = useQuery<PRODUCT_BY_HANDLE>(PRODUCT_BY_HANDLE_QUERY, {
		variables: {
			handle
		}
	});

	const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recentlyViewed', [] as string[]);

	useEffect(() => {
		setRecentlyViewed([handle, ...without(recentlyViewed, handle)]);
	}, [handle]);

	return (
		<GraphQL result={result}>
			{data => {
				if (!data.productByHandle) {
					return <FourOhFour />;
				}

				return <ProductResolved productByHandle={data.productByHandle} variantId={variantId} />;
			}}
		</GraphQL>
	);
}

function ProductResolved(props: { productByHandle: PRODUCT_BY_HANDLE['productByHandle']; variantId?: string }) {
	const { productByHandle, variantId } = props;

	if (!productByHandle) {
		return null;
	}

	return (
		<>
			<ConstrainedWidth>
				<ProductDisplay
					key={`${productByHandle.id}.${variantId}`}
					values={productByHandle}
					variantId={variantId as string}
				/>
			</ConstrainedWidth>

			<Recommendations productId={productByHandle.id} />
		</>
	);
}

interface ProductProps {
	handle: string;
	variantId?: string;
}
