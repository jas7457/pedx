import React, { useState, useEffect } from 'react';
import compose from 'lodash/flowRight';
import { graphql } from 'react-apollo';

import {
	createCheckoutGQL,
	checkoutLineItemsAddGQL,
	checkoutLineItemsRemoveGQL,
	checkoutLineItemsUpdateGQL
} from '../components/cart/checkout';

import useLocalStorage from '../hooks/useLocalStorage';

import { checkoutLineItemsRemove, checkoutLineItemsRemoveVariables } from '../generated/checkoutLineItemsRemove';
import {
	checkoutCreate,
	checkoutCreateVariables,
	checkoutCreate_checkoutCreate_checkout
} from '../generated/checkoutCreate';
import { checkoutLineItemsAdd, checkoutLineItemsAddVariables } from '../generated/checkoutLineItemsAdd';
import { checkoutLineItemsUpdate, checkoutLineItemsUpdateVariables } from '../generated/checkoutLineItemsUpdate';
import { CheckoutLineItemInput } from '../generated/globalTypes';

export const CART_KEY = 'cart';

function CartProvider(props: CartProviderProps) {
	const { children, createCheckout, checkoutLineItemsAdd, checkoutLineItemsRemove, checkoutLineItemsUpdate } = props;
	const [checkout, _setCheckout] = useState<checkoutCreate_checkoutCreate_checkout | undefined>();
	const [isCartOpen, setIsCartOpen] = useState(false);

	const [items, setItems] = useLocalStorage<CheckoutLineItemInput[]>(CART_KEY, [], newItems => {
		createCheckout({ variables: { input: { lineItems: newItems } } }).then(resp =>
			setCheckout(resp.data.checkoutCreate?.checkout!)
		);
	});
	const setCheckout = (checkout: checkoutCreate_checkoutCreate_checkout) => {
		_setCheckout(checkout);
		setItems(
			checkout.lineItems.edges.map(edge => {
				return {
					variantId: edge.node.variant?.id!,
					quantity: edge.node.quantity
				};
			})
		);
	};

	// set up the checkout
	useEffect(() => {
		createCheckout({
			variables: {
				input: {
					lineItems: items
				}
			}
		}).then(resp => {
			setCheckout(resp.data.checkoutCreate?.checkout!);
		});
	}, []);

	return (
		<CartContext.Provider
			value={{
				isCartOpen,
				setIsCartOpen,
				checkout,
				checkoutLineItemsAdd: async (data: checkoutLineItemsAddVariables) => {
					return checkoutLineItemsAdd({ variables: data })
						.then(response => {
							setCheckout(response.data.checkoutLineItemsAdd?.checkout!);
							return true;
						})
						.catch(error => {
							console.error(error);
							return false;
						});
				},
				checkoutLineItemsRemove: async (data: checkoutLineItemsRemoveVariables) => {
					return checkoutLineItemsRemove({ variables: data })
						.then(response => {
							setCheckout(response.data.checkoutLineItemsRemove?.checkout!);
							return true;
						})
						.catch(error => {
							console.error(error);
							return false;
						});
				},
				checkoutLineItemsUpdate: async (data: checkoutLineItemsUpdateVariables) => {
					return checkoutLineItemsUpdate({ variables: data })
						.then(response => {
							setCheckout(response.data.checkoutLineItemsUpdate?.checkout!);
							return true;
						})
						.catch(error => {
							console.error(error);
							return false;
						});
				}
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

const CartProviderWithMutations = compose(
	// graphql(query),
	graphql(createCheckoutGQL, { name: 'createCheckout' }),
	graphql(checkoutLineItemsAddGQL, { name: 'checkoutLineItemsAdd' }),
	graphql(checkoutLineItemsRemoveGQL, { name: 'checkoutLineItemsRemove' }),
	graphql(checkoutLineItemsUpdateGQL, { name: 'checkoutLineItemsUpdate' })
	// @ts-ignore
)(CartProvider);

export const CartContext = React.createContext<{
	isCartOpen: boolean;
	setIsCartOpen: (open: boolean) => void;
	checkout: checkoutCreate_checkoutCreate_checkout | undefined;
	checkoutLineItemsAdd: (variables: checkoutLineItemsAddVariables) => Promise<boolean>;
	checkoutLineItemsRemove: (variables: checkoutLineItemsRemoveVariables) => Promise<boolean>;
	checkoutLineItemsUpdate: (variables: checkoutLineItemsUpdateVariables) => Promise<boolean>;
}>({
	isCartOpen: false,
	setIsCartOpen: () => {},
	checkout: undefined,
	checkoutLineItemsAdd: () => Promise.resolve(true),
	checkoutLineItemsRemove: () => Promise.resolve(true),
	checkoutLineItemsUpdate: () => Promise.resolve(true)
});

export default CartProviderWithMutations;

interface CartProviderProps {
	children: React.ReactNode;
	checkout: checkoutCreate_checkoutCreate_checkout;

	createCheckout: (data: {
		variables: checkoutCreateVariables;
	}) => Promise<{
		data: checkoutCreate;
	}>;

	checkoutLineItemsAdd: (data: {
		variables: checkoutLineItemsAddVariables;
	}) => Promise<{
		data: checkoutLineItemsAdd;
	}>;

	checkoutLineItemsRemove: (data: {
		variables: checkoutLineItemsRemoveVariables;
	}) => Promise<{
		data: checkoutLineItemsRemove;
	}>;

	checkoutLineItemsUpdate: (data: {
		variables: checkoutLineItemsUpdateVariables;
	}) => Promise<{
		data: checkoutLineItemsUpdate;
	}>;
}
