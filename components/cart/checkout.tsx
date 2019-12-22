import gql from 'graphql-tag';

const CheckoutFragment = gql`
	fragment CheckoutFragment on Checkout {
		id
		webUrl
		totalTaxV2 {
			amount
		}
		subtotalPriceV2 {
			amount
		}
		totalPriceV2 {
			amount
		}
		lineItems(first: 250) {
			edges {
				node {
					id
					title
					variant {
						id
						title
						image {
							src
						}
						price
						product {
							handle
						}
					}
					quantity
				}
			}
		}
	}
`;

export const createCheckoutGQL = gql`
	mutation checkoutCreate($input: CheckoutCreateInput!) {
		checkoutCreate(input: $input) {
			userErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`;

export const checkoutLineItemsAddGQL = gql`
	mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
		checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
			userErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`;

export const checkoutLineItemsUpdateGQL = gql`
	mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
		checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
			userErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`;

export const checkoutLineItemsRemoveGQL = gql`
	mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
		checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
			userErrors {
				message
				field
			}
			checkout {
				...CheckoutFragment
			}
		}
	}
	${CheckoutFragment}
`;
