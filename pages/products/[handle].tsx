import React, { useState } from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import classNames from 'classnames';

import Layout from '../../components/Layout';
import ConstrainedWidth from '../../components/ConstrainedWidth';
import ScaledBackgroundImage from '../../components/ScaledBackgroundImage';
import Select from '../../components/Select';
import GraphQL from '../../components/GraphQL';

import dollarize from '../../helpers/dollarize';
import theme from '../../config/theme';

import {
	PRODUCT_BY_HANDLE,
	PRODUCT_BY_HANDLE_productByHandle,
	PRODUCT_BY_HANDLE_productByHandle_variants_edges
} from '../../generated/PRODUCT_BY_HANDLE';
import ThemeButton from '../../components/ThemeButton';

export default function ProductPage() {
	const router = useRouter();
	const { handle } = router.query;

	const result = useQuery<PRODUCT_BY_HANDLE>(PRODUCT_BY_HANDLE_QUERY, {
		variables: {
			handle
		}
	});

	const { data } = result;

	return (
		<Layout marginTop={true}>
			<GraphQL result={result}>
				{() => {
					if (!data || !data.productByHandle) {
						return null;
					}

					return <ProductDisplay values={data?.productByHandle} />;
				}}
			</GraphQL>
		</Layout>
	);
}

function ProductDisplay(props: { values: PRODUCT_BY_HANDLE_productByHandle }) {
	const { values } = props;

	const [state, setState] = useState(() => {
		const variantsByUniqueImages: Array<{
			image: string;
			variants: PRODUCT_BY_HANDLE_productByHandle_variants_edges[];
		}> = [];
		const variantGroups: Record<
			string,
			{
				name: string;
				values: Array<{ value: string; variant: PRODUCT_BY_HANDLE_productByHandle_variants_edges }>;
			}
		> = {};

		const selection: Record<string, string> = {};

		values.variants.edges.forEach(edge => {
			const temp: any = { variant: edge };

			edge.node.selectedOptions.forEach(option => {
				const currentSelection = selection[option.name];
				if (!currentSelection) {
					selection[option.name] = option.value;
				}

				temp[option.name] = option.value;

				variantGroups[option.name] = variantGroups[option.name] || {
					name: option.name,
					values: []
				};

				const group = variantGroups[option.name];
				if (!group.values.find(val => val.value === option.value)) {
					group.values.push({
						value: option.value,
						variant: edge
					});
				}
			});

			const image = edge.node.image?.originalSrc;
			if (image) {
				const current = variantsByUniqueImages.find(variant => variant.image === image);

				// if there is already a record for this image, just add the variant. otherwise, create a new record
				if (current) {
					current.variants.push(edge);
				} else {
					variantsByUniqueImages.push({ image, variants: [edge] });
				}
			}
		});

		return {
			variantGroups,
			variantsByUniqueImages,
			selection
		};
	});

	const { variantGroups, variantsByUniqueImages, selection } = state;

	const selectedVariant = values.variants.edges.find(edge => {
		return edge.node.selectedOptions.every(option => {
			return option.value === selection[option.name];
		});
	})!;

	return (
		<Layout marginTop={true}>
			<ConstrainedWidth>
				<StyledProductPage>
					<div className="left">
						<img src={selectedVariant?.node.image?.originalSrc} />

						<VariantSelector
							variantsByUniqueImages={variantsByUniqueImages}
							selectedVariant={selectedVariant}
							handleSelectedVariant={selection => {
								setState({
									...state,
									selection
								});
							}}
						/>
					</div>

					<div className="right">
						<h1 className="product-title">{values.title}</h1>
						<h2
							className="product-description"
							dangerouslySetInnerHTML={{ __html: values?.descriptionHtml }}
						/>

						<div className="variant-container">
							{Object.values(variantGroups).map(variantGroup => {
								return (
									<div>
										<Select
											options={variantGroup.values.map(val => val.value)}
											value={selection[variantGroup.name]}
											label={variantGroup.name}
											onChange={e => {
												setState({
													...state,
													selection: {
														...state.selection,
														[variantGroup.name]: e.target.value
													}
												});
											}}
										/>
									</div>
								);
							})}
						</div>

						<span style={{ display: 'inline-block', margin: '1rem 0.5rem' }}>
							<i>{dollarize(selectedVariant.node.priceV2.amount)}</i> — {selectedVariant.node.title}
						</span>
						<ThemeButton onClick={() => alert('Not yet implemented')} border>
							Add to Cart
						</ThemeButton>
					</div>
				</StyledProductPage>
			</ConstrainedWidth>
		</Layout>
	);
}

const StyledProductPage = styled.div`
	display: flex;
	padding-top: ${theme.dimensions['4']};
	flex-wrap: wrap;
	flex-flow: column-reverse;

	@media (min-width: ${theme.breakpoints.tablet}) {
		flex-flow: initial;

		.left {
			width: 40%;
		}

		.right {
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

	.right {
		.product-title {
			font-size: ${theme.text['3xl']};
			margin-bottom: ${theme.dimensions['2']};
		}

		.product-description {
			font-size: ${theme.text.md};
		}

		.selected-variant {
			margin-top: ${theme.dimensions['4']};
		}
	}

	.variant-container {
		display: flex;
		flex-wrap: wrap;
		margin-top: ${theme.dimensions['4']};

		& > * {
			width: 100%;
			padding: ${theme.dimensions['2']};
		}

		@media (min-width: ${theme.breakpoints.tablet}) {
			& > * {
				width: 50%;
			}
		}

		label {
			display: block;
		}
	}
`;

function VariantSelector(props: {
	variantsByUniqueImages: Array<{
		image: string;
		variants: PRODUCT_BY_HANDLE_productByHandle_variants_edges[];
	}>;
	selectedVariant: PRODUCT_BY_HANDLE_productByHandle_variants_edges;
	handleSelectedVariant: (variant: Record<string, string>) => void;
}) {
	const { variantsByUniqueImages, selectedVariant, handleSelectedVariant } = props;

	return (
		<StyledVariantList className="list-reset">
			{variantsByUniqueImages.map(variantObj => {
				const isSelected = variantObj.variants.some(variant => variant === selectedVariant);
				const variant = variantObj.variants[0];
				const selection: Record<string, string> = {};
				variant.node.selectedOptions.forEach(option => {
					selection[option.name] = option.value;
				});

				return (
					<li>
						<button
							className={classNames('variant-wrapper', { 'is-selected': isSelected })}
							title={`${variant.node.title} - ${dollarize(variant.node.priceV2.amount)}`}
							onClick={() => handleSelectedVariant(selection)}
						>
							<div>
								<ScaledBackgroundImage image={variantObj.image} className="variant-image" />
							</div>
						</button>
					</li>
				);
			})}
		</StyledVariantList>
	);
}

const StyledVariantList = styled.ul`
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
			border-color: ${theme.colors.gray_700};
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
		background-color: ${theme.colors.gray_300};
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

const PRODUCT_BY_HANDLE_QUERY = gql`
	query PRODUCT_BY_HANDLE($handle: String!) {
		productByHandle(handle: $handle) {
			id
			title
			descriptionHtml
			productType
			priceRange {
				minVariantPrice {
					amount
				}
				maxVariantPrice {
					amount
				}
			}
			images(first: 20) {
				edges {
					node {
						originalSrc
					}
				}
			}
			variants(first: 20) {
				edges {
					cursor
					node {
						id
						title
						selectedOptions {
							name
							value
						}
						priceV2 {
							amount
						}
						image {
							originalSrc
						}
					}
				}
			}
		}
	}
`;
