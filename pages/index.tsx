import React from 'react';
import styled from 'styled-components';

import CollectionGrid from '../components/CollectionGrid';
import ConstrainedWidth from '../components/ConstrainedWidth';
import BackgroundImage from '../components/BackgroundImage';
import Heading from '../components/Heading';

import theme from '../config/theme';

export default function Index() {
	return (
		<StyledIndex>
			<BackgroundImage image="/background.jpg" className="background-image" />

			<ConstrainedWidth>
				<Heading as="h2" size="medium">
					Collections
				</Heading>
				<CollectionGrid />
			</ConstrainedWidth>
		</StyledIndex>
	);
}

Index.marginTop = false;

const StyledIndex = styled.div`
	.background-image {
		height: 100vh;
		background-attachment: fixed;
	}
`;
