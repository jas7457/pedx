import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';

import Layout from '../../components/Layout';
import ConstrainedWidth from '../../components/ConstrainedWidth';

import { PRODUCT_BY_HANDLE } from '../../generated/PRODUCT_BY_HANDLE';

export default function CollectionPage() {
	const router = useRouter();
	const { handle } = router.query;

	const {data, loading, error} = useQuery<PRODUCT_BY_HANDLE>(PRODUCT_BY_HANDLE_QUERY, {
		variables: {
			handle
		}
	});

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		console.log(error);
		return <div>Error</div>;
	}

	if( !data || !data.productByHandle) {
		return null;
	}

	const { productByHandle:values } = data;
	const image = values?.images.edges[0].node.originalSrc;

	return (
		<Layout marginTop={true}>
			<ConstrainedWidth>
				<h1>{values.title}</h1>
				<h2>{values.description}</h2>
				<img src={image} />
			</ConstrainedWidth>
		</Layout>
	);
}

const PRODUCT_BY_HANDLE_QUERY = gql`
    query PRODUCT_BY_HANDLE($handle:String!) {
        productByHandle(handle: $handle) {
            id
            title
            description
            images(first: 20) {
                edges {
                    node {
                        originalSrc
                    }
                }
            }
            variants(first: 20) {
                edges {
                    node {
                        id
                        title
                        availableForSale
                        image {
                            originalSrc
                        }
                    }
                }
            }
        }
    }
`;
