import React from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';

import ProductList from '../../components/ProductList';
import Hero from '../../components/Hero';

import { COLLECTION_PAGE_QUERY } from '../../generated/COLLECTION_PAGE_QUERY';

export default function CollectionPage() {
	const router = useRouter();
	const { handle } = router.query;

	const {data, loading, error} = useQuery<COLLECTION_PAGE_QUERY>(COLLECTION_PAGE_GQL_QUERY, {
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

	if( !data || !data.collectionByHandle) {
		return null;
	}

	const { collectionByHandle:values } = data;

	return (
		<div>
			<h1>{values.title}</h1>
			<h2>{values.description}</h2>
			<Hero image={values.image?.originalSrc!}>
				<h2>{values.title}</h2>
				<h3>{values.description}</h3>
			</Hero>

			<ProductList products={values.products.edges} style={{marginTop: 20}} />
		</div>
	);
}

const COLLECTION_PAGE_GQL_QUERY = gql`
    query COLLECTION_PAGE_QUERY($handle:String!) {
        collectionByHandle(handle: $handle) {
            title
            description
            image {
                originalSrc
            }
            products(first: 20) {
                edges {
                    node {
                        id
                        title
                        description
                        handle
                        availableForSale
                        priceRange {
                            minVariantPrice {
                                amount
                            }
                        }
                        images(first:20) {
                            edges {
                                node {
                                    originalSrc
                                }
                            }
                        }
                        variants(first: 20) {
                            edges {
                                node {
                                    title
                                    id
                                    image {
                                        originalSrc
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;