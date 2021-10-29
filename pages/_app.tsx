import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApollo, { InitApolloOptions } from 'next-with-apollo';
import ApolloClient, { Operation } from 'apollo-boost';

import '../assets/styles/main.scss';

import Layout from '../components/Layout';
import CartProvider from '../context/CartContext';

import { SHOPIFY_GRAPHQL_ENDPOINT, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/variables';

class MyApp extends App {
	public render() {
		// @ts-ignore
		const { Component, apollo, pageProps } = this.props;

		return (
			<ApolloProvider client={apollo}>
				<CartProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</CartProvider>
			</ApolloProvider>
		);
	}
}

export default withApollo(({ headers }: InitApolloOptions<any>) => {
	return new ApolloClient({
		uri: SHOPIFY_GRAPHQL_ENDPOINT,
		request: (operation: Operation) => {
			operation.setContext({
				headers: {
					...headers,
					'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
				}
			});
		}
	});
})(MyApp);
