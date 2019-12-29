import React from 'react';
import gql from 'graphql-tag';

export const PRODUCT_BY_HANDLE_QUERY = gql`
	query PRODUCT_BY_HANDLE($handle: String!) {
		productByHandle(handle: $handle) {
			id
			title
			descriptionHtml
			productType
			priceRange {
				minVariantPrice {
					amount
				}
				maxVariantPrice {
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
					cursor
					node {
						id
						title
						selectedOptions {
							name
							value
						}
						priceV2 {
							amount
						}
						image {
							originalSrc
						}
					}
				}
			}
		}
	}
`;

export const PRODUCT_RECOMMENDATIONS_BY_ID_QUERY = gql`
	query PRODUCT_RECOMMENDATIONS_BY_ID($productId: ID!) {
		productRecommendations(productId: $productId) {
			id
			title
			handle
			images(first: 1) {
				edges {
					node {
						originalSrc
					}
				}
			}
		}
	}
`;
