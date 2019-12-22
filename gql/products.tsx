import gql from 'graphql-tag';

export const ProductConnectionFragment = gql`
	fragment ProductConnectionFragment on ProductConnection {
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
`;
