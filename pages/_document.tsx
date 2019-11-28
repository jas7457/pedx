import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	// @ts-ignore
	static getInitialProps({ renderPage }) {
		const sheet = new ServerStyleSheet();
		// @ts-ignore
		const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
		const styleTags = sheet.getStyleElement();
		debugger;
		return { ...page, styleTags };
	}

	public render() {
		// @ts-ignore
		const { styleTags } = this.props;

		return (
			<html>
				<Head>
					<>
						{styleTags}
						<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
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
