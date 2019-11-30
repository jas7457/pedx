import React from 'react';
import App, { AppInitialProps } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApollo, { InitApolloOptions } from 'next-with-apollo';
import ApolloClient, { Operation } from 'apollo-boost';
import { ThemeProvider } from 'styled-components';

import CSSReset from '../components/CSSReset';
import ConstrainedWidth from '../components/ConstrainedWidth';

import theme from '../config/theme';
import { SHOPIFY_GRAPHQL_ENDPOINT, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/variables';

class MyApp extends App {
	// @ts-ignore
	static async getInitialProps({ Component, ctx }): Promise<{ pageProps: any }> {
		let pageProps: AppInitialProps['pageProps'] = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		// this exposes the query to the user
		pageProps.query = ctx.query;

		return { pageProps };
	}

	public render() {
		// @ts-ignore
		const { Component, apollo, pageProps } = this.props;

		return (
			<ApolloProvider client={apollo}>
				<CSSReset />

				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
					<footer>Footer</footer>
				</ThemeProvider>
			</ApolloProvider>
		);
	}
}

export default withApollo(({ headers }: InitApolloOptions<any>) => {
	return new ApolloClient({
		uri: SHOPIFY_GRAPHQL_ENDPOINT,
		fetchOptions: {},
		request: (operation: Operation) => {
			operation.setContext({
				/*
				fetchOptions: {
					credentials: 'include',
					'no-cors': true
				},
				 */

				headers: {
					...headers,
					'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
				}
			});
		}
	});
})(MyApp);
