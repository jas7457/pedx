import React, {ReactNode} from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery, QueryResult } from 'react-apollo';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import ProductList from '../../components/ProductList';
import Hero from '../../components/Hero';
import ConstrainedWidth from '../../components/ConstrainedWidth';

import theme from '../../config/theme';

import { COLLECTION_PAGE_QUERY } from '../../generated/COLLECTION_PAGE_QUERY';

export default function CollectionPage() {
	const router = useRouter();
	const { handle } = router.query;

	const result = useQuery<COLLECTION_PAGE_QUERY>(COLLECTION_PAGE_GQL_QUERY, {
		variables: {
			handle
		}
	});


	const values = result?.data?.collectionByHandle!;

	return (
		<Test result={result}>
			{()=>(
					<>
						<Hero image={values.image?.originalSrc!}>
							<StyledHeroChild>
								<div>
									<h1>{values.title}</h1>
									<i>{values.description}</i>
								</div>
							</StyledHeroChild>
						</Hero>

						<StyledConstrainedWidth>
							<ProductList products={values.products.edges} />
						</StyledConstrainedWidth>
					</>
			)}
		</Test>
	);
}

const StyledConstrainedWidth = styled(ConstrainedWidth)`
	margin-top: ${theme.dimensions['4']};
`;


function Test(props:{result:QueryResult; children:(data:any) => ReactNode;}){
	const {result, children} =  props;
	const {loading, error, data} = result;

	return (
		<Layout marginTop={false}>
			{loading
				? (
					<div>Loading...</div>
				)
				: error ? (
					<div>Error</div>
				) : data && (
					<>{children(data)}</>
				)
			}
		</Layout>
	);
}

const COLLECTION_PAGE_GQL_QUERY = gql`
    query COLLECTION_PAGE_QUERY($handle: String!) {
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

const StyledHeroChild = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	color: white;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.5);
	
	h1 {
		font-size: ${theme.text['6xl']};
		font-weight: 100;
		text-transform: uppercase;
		letter-spacing: 6px;
	}
	
	i {
		color: ${theme.colors.gray_400}
	}
`;
