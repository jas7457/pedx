import React from 'react';
import App, { AppInitialProps } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApollo, { InitApolloOptions } from 'next-with-apollo';
import ApolloClient, { Operation } from 'apollo-boost';

import Layout from '../components/Layout';

import { SHOPIFY_GRAPHQL_ENDPOINT, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '../config/variables';

import '../assets/styles/main.scss';

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
		// @ts-ignore
		const { marginTop = true } = Component;

		return (
			<ApolloProvider client={apollo}>
				<Layout marginTop={marginTop}>
					<Component {...pageProps} />
				</Layout>
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
