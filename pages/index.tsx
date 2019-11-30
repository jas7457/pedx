import React from 'react';
import styled from 'styled-components';

import CollectionGrid from '../components/CollectionGrid';
import Header from '../components/Header';
import ContrainedWidth from '../components/ConstrainedWidth';

export default function Index() {
	return (
		<>
			<Parallax style={{ backgroundImage: `url('/background.jpg')` }}>
				<Header />
				<div className="brand">
					<div className="letter-spacing">Pedestrian</div>
				</div>
			</Parallax>
			<ContrainedWidth>
				<main>
					<CollectionGrid />
				</main>
			</ContrainedWidth>
		</>
	);
}

const Parallax = styled.div`
	position: relative;
	height: 100vh;
	width: 100%;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	background-color: black;

	.brand {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		color: white;
		font-size: 22px;
		font-weight: 100;
		text-transform: uppercase;
		background-color: rgb(85, 85, 85, 0.4);
		padding: 10px;
	}

	.letter-spacing {
		letter-spacing: 14px;
		margin-right: -14px;
	}
`;
