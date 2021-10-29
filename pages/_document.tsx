import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	public render() {
		return (
			<Html lang="en">
				<Head>
					<>
						<link
							href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap"
							rel="stylesheet"
						/>
					</>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
