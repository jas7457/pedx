import React from 'react';
import styled from 'styled-components';

import CollectionGrid from '../components/CollectionGrid';
import ConstrainedWidth from '../components/ConstrainedWidth';
import Layout from '../components/Layout';
import BackgroundImage from '../components/BackgroundImage';

export default function Index() {
	return (
		<StyledLayout marginTop={false}>
			<BackgroundImage image="/background.jpg" className="background-image" />

			<h1 className="text-primary-main">Collections</h1>

			<ConstrainedWidth>
				<CollectionGrid />
			</ConstrainedWidth>
		</StyledLayout>
	);
}

const StyledLayout = styled(Layout)`
	.background-image {
		height: 100vh;
		background-attachment: fixed;
	}
`;
