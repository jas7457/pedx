import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	// @ts-ignore
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet();
		// @ts-ignore
		const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
		const styleTags = sheet.getStyleElement();
		return { ...page, styleTags };
	}

	public render() {
		// @ts-ignore
		const { styleTags } = this.props;

		return (
			<html lang="en">
				<Head>
					<>
						<link
							href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap"
							rel="stylesheet"
						/>
						{styleTags}
					</>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
