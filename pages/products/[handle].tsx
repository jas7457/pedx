import React from 'react';
import { useRouter } from 'next/router';

import Product from '../../components/pages/product/Product';

export default function ProductPage() {
	const router = useRouter();
	const { handle, variantId } = router.query;

	return <Product key={handle as string} handle={handle as string} variantId={variantId as string} />;
}
