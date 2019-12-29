import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

export default function SectionTitle(props: { title: string }) {
	const { title } = props;

	return (
		<StyledSectionTitle className="flex align-center">
			<hr className="flex-grow flex-shrink" />
			<h2 className="heading flex-shrink-none uppercase">{title}</h2>
			<hr className="flex-grow flex-shrink" />
		</StyledSectionTitle>
	);
}

const StyledSectionTitle = styled.div`
	padding: 1rem 0;
	color: ${theme.colors.gray.darker};

	hr {
		height: 1px;
		color: ${theme.colors.gray.lighter};
	}

	.heading {
		margin: 0 1rem;
		letter-spacing: 4px;
		font-size: ${theme.text.lg};
		font-weight: 100;

		@media (min-width: ${theme.breakpoints.tablet}) {
			margin: 0 1.5rem;
			letter-spacing: 8px;
			font-size: ${theme.text['4xl']};
		}
	}
`;
