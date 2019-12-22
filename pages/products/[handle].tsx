import React, { useContext, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import classNames from 'classnames';

import ConstrainedWidth from '../../components/ConstrainedWidth';
import ScaledBackgroundImage from '../../components/ScaledBackgroundImage';
import GraphQL from '../../components/GraphQL';
import FadeIn from '../../components/FadeIn';
import FourOhFour from '../../components/FourOhFour';
import ImageMagnifier from '../../components/ImageManifier';
import ThemeButton from '../../components/ThemeButton';
import Heading from '../../components/Heading';
import Select from '../../components/Select';

import { ProductStateReducer } from '../../reducers/ProductState';
import dollarize from '../../helpers/dollarize';
import theme from '../../config/theme';
import { CartContext } from '../../context/CartContext';

import {
	PRODUCT_BY_HANDLE,
	PRODUCT_BY_HANDLE_productByHandle,
	PRODUCT_BY_HANDLE_productByHandle_variants_edges
} from '../../generated/PRODUCT_BY_HANDLE';

export default function ProductPage() {
	const router = useRouter();
	const { handle, variantId } = router.query;

	const result = useQuery<PRODUCT_BY_HANDLE>(PRODUCT_BY_HANDLE_QUERY, {
		variables: {
			handle
		}
	});

	return (
		<GraphQL result={result}>
			{data => {
				if (!data.productByHandle) {
					return <FourOhFour />;
				}

				return (
					<ProductDisplay
						key={`${data.productByHandle.id}.${variantId}`}
						values={data.productByHandle}
						variantId={variantId as string}
					/>
				);
			}}
		</GraphQL>
	);
}

function ProductDisplay(props: { values: PRODUCT_BY_HANDLE_productByHandle; variantId?: string }) {
	const { values, variantId } = props;

	const [state, dispatch] = useReducer(ProductStateReducer, undefined, () => {
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

		// if a specific variant id was passed in, load that
		if (variantId) {
			values.variants.edges.forEach(edge => {
				if (edge.node.id === variantId) {
					edge.node.selectedOptions.forEach(option => {
						selection[option.name] = option.value;
					});
				}
			});
		}

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
			currentQuantity: 1,
			selection,
			adding: false,
			pending: false
		};
	});

	const { variantGroups, variantsByUniqueImages, selection } = state;

	const selectedVariant = values.variants.edges.find(edge => {
		return edge.node.selectedOptions.every(option => {
			return option.value === selection[option.name];
		});
	})!;

	const { checkout, checkoutLineItemsAdd } = useContext(CartContext);

	useEffect(() => {
		const id = setTimeout(() => {
			dispatch({ type: 'SET_PENDING', pending: false });
		}, 500);

		return () => clearTimeout(id);
	}, [state.adding, state.pending]);

	return (
		<ConstrainedWidth>
			<StyledProductPage>
				<div className="left">
					<FadeIn key={selectedVariant?.node.image?.originalSrc}>
						<ImageMagnifier src={selectedVariant?.node.image?.originalSrc!} />
					</FadeIn>

					<VariantSelector
						variantsByUniqueImages={variantsByUniqueImages}
						selectedVariant={selectedVariant}
						handleSelectedVariant={selection => {
							dispatch({
								type: 'SELECT_VARIANT',
								selection
							});
						}}
					/>
				</div>

				<div className="right">
					<Heading as="h1" size="small" className="product-title">
						{values.title}
					</Heading>

					<b className="price">
						<i>{dollarize(selectedVariant.node.priceV2.amount)}</i>
					</b>

					<hr />

					{Object.values(variantGroups).map(variantGroup => {
						return (
							<div className="variant-selection" key={variantGroup.name}>
								<label className="flex-shrink-none">
									<b>{variantGroup.name}</b>
								</label>
								<div>
									{variantGroup.values.map(value => {
										return (
											<button
												key={value.variant.node.id}
												className={classNames({
													selected: value.value === selection[variantGroup.name]
												})}
												onClick={() => {
													dispatch({
														type: 'SELECT_VARIANT',
														selection: {
															...state.selection,
															[variantGroup.name]: value.value
														}
													});
												}}
											>
												{value.value}
											</button>
										);
									})}
								</div>
							</div>
						);
					})}

					<div className="variant-selection">
						<Select
							value={`${state.currentQuantity}`}
							options={Array.from({ length: 20 }, (_, index) => `${index + 1}`)}
							className="block w-full"
							label="Qty"
							onChange={async e => {
								dispatch({ type: 'SET_CURRENT_QUANTITY', quantity: parseInt(e.target.value) });
							}}
						/>
					</div>

					<hr />

					<div
						className="product-description"
						dangerouslySetInnerHTML={{ __html: values?.descriptionHtml }}
					/>

					<ThemeButton
						className="block w-full"
						onClick={async () => {
							dispatch({ type: 'SET_PENDING', pending: true });
							dispatch({ type: 'SET_ADDING', adding: true });

							await checkoutLineItemsAdd({
								checkoutId: checkout?.id!,
								lineItems: [{ variantId: selectedVariant.node.id, quantity: state.currentQuantity }]
							});

							dispatch({ type: 'SET_ADDING', adding: false });
							dispatch({ type: 'SET_CURRENT_QUANTITY', quantity: 1 });
						}}
						border
						inverse
						disabled={state.adding || state.pending}
					>
						Add to Cart
					</ThemeButton>
				</div>
			</StyledProductPage>
		</ConstrainedWidth>
	);
}

const StyledProductPage = styled.div`
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
					<li key={variant.node.id}>
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
