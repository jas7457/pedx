// library
import React, { useContext, useEffect, useReducer, useState } from 'react';
import classNames from 'classnames';
import { useQuery } from 'react-apollo';

// components
import { StyledProductPage, StyledVariantList } from './StyledProduct';
import GraphQL from '../../GraphQL';
import ScaledBackgroundImage from '../../ScaledBackgroundImage';
import FadeIn from '../../FadeIn';
import ImageMagnifier from '../../ImageManifier';
import ThemeButton from '../../ThemeButton';
import Heading from '../../Heading';
import Select from '../../Select';
import ProductSlider from '../../ProductSlider';

// misc
import { ProductStateReducer } from '../../../reducers/ProductState';
import dollarize from '../../../helpers/dollarize';
import { CartContext } from '../../../context/CartContext';

// gql stuff
import { PRODUCT_RECOMMENDATIONS_BY_ID_QUERY } from './ProductGQL';
import {
	PRODUCT_BY_HANDLE_productByHandle,
	PRODUCT_BY_HANDLE_productByHandle_variants_edges
} from '../../../generated/PRODUCT_BY_HANDLE';
import { PRODUCT_RECOMMENDATIONS_BY_ID } from '../../../generated/PRODUCT_RECOMMENDATIONS_BY_ID';
import SectionTitle from '../../SectionTitle';
import ConstrainedWidth from '../../ConstrainedWidth';

export default function ProductDisplay(props: { values: PRODUCT_BY_HANDLE_productByHandle; variantId?: string }) {
	const { values, variantId } = props;

	const { checkout, checkoutLineItemsAdd } = useContext(CartContext);

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
			adding: false
		};
	});

	const { variantGroups, variantsByUniqueImages, selection } = state;

	const selectedVariant = (() => {
		const firstSelection = values.variants.edges.find(edge => {
			return edge.node.selectedOptions.every(option => {
				return option.value === selection[option.name];
			});
		});

		if (firstSelection) {
			return firstSelection;
		}
		return values.variants.edges[0];
	})();

	return (
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
							dispatch({
								type: 'SET_CURRENT_QUANTITY',
								quantity: parseInt(e.target.value)
							});
						}}
					/>
				</div>

				<hr />

				<div className="product-description" dangerouslySetInnerHTML={{ __html: values?.descriptionHtml }} />

				<ThemeButton
					className="block w-full"
					onClick={async () => {
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
					disabled={state.adding}
				>
					Add to Cart
				</ThemeButton>
			</div>
		</StyledProductPage>
	);
}

function VariantSelector(props: VariantProps) {
	const { variantsByUniqueImages, selectedVariant, handleSelectedVariant } = props;

	return (
		<StyledVariantList className="list-reset">
			{variantsByUniqueImages.map(variantObj => {
				const isSelected = variantObj.variants.some(variant => variant === selectedVariant);
				const variant = variantObj.variants[0];
				const selection = variant.node.selectedOptions.reduce((accum, current) => {
					accum[current.name] = current.value;
					return accum;
				}, {} as Record<string, string>);

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

interface VariantProps {
	variantsByUniqueImages: Array<{
		image: string;
		variants: PRODUCT_BY_HANDLE_productByHandle_variants_edges[];
	}>;
	selectedVariant: PRODUCT_BY_HANDLE_productByHandle_variants_edges;
	handleSelectedVariant: (variant: Record<string, string>) => void;
}

export const Recommendations = React.memo(function Recommendations(props: RecommendationsProps) {
	const { productId } = props;
	const [htmlRef, setHtmlRef] = useState<HTMLElement | null>(null);

	const result = useQuery<PRODUCT_RECOMMENDATIONS_BY_ID>(PRODUCT_RECOMMENDATIONS_BY_ID_QUERY, {
		variables: {
			productId
		}
	});

	if (!result.data || !result.data.productRecommendations || result.data.productRecommendations.length === 0) {
		return null;
	}

	return (
		<div ref={setHtmlRef}>
			<GraphQL result={result}>
				{data => {
					if (!data.productRecommendations || data.productRecommendations.length === 0) {
						return null;
					}
					if (!htmlRef) {
						return null;
					}

					return (
						<>
							<SectionTitle title="Similar Products" />

							<ConstrainedWidth>
								<ProductSlider
									products={data.productRecommendations.map(r => ({
										image: r.images.edges[0].node.originalSrc,
										title: r.title,
										href: `/products/${r.handle}`
									}))}
								/>
							</ConstrainedWidth>
						</>
					);
				}}
			</GraphQL>
		</div>
	);
});

interface RecommendationsProps {
	productId: string;
}
