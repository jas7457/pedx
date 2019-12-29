import React from 'react';
import styled from 'styled-components';

import theme from '../../../config/theme';

export const StyledProductPage = styled.div`
	padding-top: ${theme.dimensions['4']};

	@media (min-width: ${theme.breakpoints.tablet}) {
		display: flex;
		flex-wrap: wrap;

		.left {
			width: 40%;
		}

		.right {
			position: sticky;
			height: 100%;
			top: 5rem;
			width: 60%;
			padding: 0 ${theme.dimensions['6']};
		}
	}

	.left {
		& > img {
			max-height: 100%;
			max-width: 100%;
			margin: 0 auto;
		}
	}

	.selected-variant {
		margin-top: ${theme.dimensions['4']};
	}

	.product-title {
		letter-spacing: 1px;
	}

	.product-description {
		margin-bottom: ${theme.dimensions['4']};
	}

	.price {
		color: black;
		font-size: ${theme.text['2xl']};
	}

	hr {
		height: 1px;
		color: ${theme.colors.gray.lighter};
		margin: ${theme.dimensions['2']} 0;
	}

	.variant-selection {
		margin-bottom: ${theme.dimensions['4']};

		button {
			padding: 0.4rem 0.8rem;
			position: relative;
			min-width: 4rem;
			letter-spacing: 1px;

			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 0;
				height: 1px;
				background-color: black;
				transform: translateX(-50%);
				will-change: width;
				transition-duration: ${theme.transitionTime};
			}

			&:hover,
			&:focus {
				&:after {
					width: 85%;
				}
			}

			&.selected {
				background-color: black;
				color: white;
			}

			& + button {
				margin-left: ${theme.dimensions['2']};
			}
		}

		.color-swatch {
			height: 50px;
			width: 50px;
			border-radius: 100%;
			border: 1px solid ${theme.colors.gray.lighter};
		}
	}
`;

export const StyledVariantList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin-top: ${theme.dimensions['4']};
	
	.variant-wrapper {
		height: 100px;
		width: 100px;
		margin-right: ${theme.dimensions['2']};
		overflow: hidden;
		border: 2px solid transparent;
		padding: 2px;
		
		&.is-selected, &:hover, &:focus {
			border-color: ${theme.colors.gray.darker};
		}
		
		& > div {
			margin: 1px;
			overflow: hidden;
			height: calc(100% - 2px);
			width: calc(100% - 2px);
		}
	}
	
	.variant-image {
		height: 100%;
		width: 100%;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		background-color: ${theme.colors.gray.lightest};
		background-color: ${theme.colors.gray.lightest};
	}
	
	.variant-title {
		font-size: ${theme.text.xl};
	}
	
	.variant-amount {
		font-size: ${theme.text.sm}
		font-weight: 100;
		font-style: italic;
	}
`;
