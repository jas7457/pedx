import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import Dialog from '../Dialog';
import BackgroundImage from '../BackgroundImage';
import Drawer from '../Drawer';
import { CartContext } from '../../context/CartContext';
import theme from '../../config/theme';
import dollarize from '../../helpers/dollarize';
import ThemeButton from '../ThemeButton';
import Select from '../Select';
import Link from 'next/link';

export default function Cart() {
	const { checkout, checkoutLineItemsRemove, checkoutLineItemsUpdate, isCartOpen, setIsCartOpen } = useContext(
		CartContext
	);

	const items = checkout?.lineItems.edges || [];
	const [isUpdating, setIsUpdating] = useState(false);

	return (
		<StyledDrawer
			className="flex flex-column"
			isOpen={isCartOpen}
			onOverlayClick={() => setIsCartOpen(false)}
			side="right"
			wide
		>
			<Dialog
				header="Cart"
				onCloseClick={() => setIsCartOpen(false)}
				footer={
					<>
						<div className="flex uppercase">
							<div className="footer-attribute">Subtotal</div>
							<div className="ml-auto">{dollarize(checkout?.subtotalPriceV2.amount || '0.00')}</div>
						</div>
						<div className="flex uppercase">
							<div className="footer-attribute">Taxes</div>
							<div className="ml-auto">{dollarize(checkout?.totalTaxV2.amount || '0.00')}</div>
						</div>
						<div className="flex uppercase">
							<div className="footer-attribute">Total</div>
							<div className="ml-auto">{dollarize(checkout?.totalPriceV2.amount || '0.00')}</div>
						</div>

						<ThemeButton
							className="w-full checkout-button"
							border
							disabled={items.length === 0 || isUpdating}
							onClick={() => {
								if (checkout) {
									open(checkout.webUrl);
								}
							}}
						>
							Checkout
						</ThemeButton>
					</>
				}
			>
				<>
					{items.length === 0 ? (
						<>No items in cart</>
					) : (
						<ul className="list-reset">
							{items.map(({ node: item }) => {
								const href = item.variant?.product.handle!;

								return (
									<li
										key={item.id}
										className="flex align-center"
										title={`${item.title} : ${item.variant?.title}`}
									>
										<Link
											as={`/products/${href}`}
											href={{
												pathname: '/products/[handle]',
												query: { variantId: item.variant?.id }
											}}
										>
											<a onClick={() => setIsCartOpen(false)}>
												<BackgroundImage
													className="item-image flex-shrink-none"
													image={item.variant?.image?.src!}
												>
													<button
														className="item-remove clickable"
														aria-label="Remove Item"
														title="Remove Item"
														onClick={async e => {
															e.preventDefault();
															e.stopPropagation();
															setIsUpdating(true);
															await checkoutLineItemsRemove({
																checkoutId: checkout?.id!,
																lineItemIds: [item.id]
															});
															setIsUpdating(false);
														}}
													>
														<div className="flex align-center justify-center">
															<FontAwesomeIcon icon={faTimesCircle} />
														</div>
													</button>
												</BackgroundImage>
											</a>
										</Link>

										<div className="flex-grow flex-shrink overflow-hidden">
											<div className="truncate">{item.title}</div>
											<div className="item-variant-title truncate">{item.variant?.title}</div>
										</div>

										<div className="flex-shrink-none flex flex-column">
											<b>{dollarize('' + item.quantity * parseFloat(item.variant?.price!))}</b>

											<div className="item-quantity-wrapper inline-block">
												<Select
													value={'' + item.quantity}
													options={Array.from(
														{ length: Math.max(20, item.quantity) },
														(_, index) => `${index + 1}`
													)}
													disabled={isUpdating}
													onChange={async e => {
														setIsUpdating(true);
														await checkoutLineItemsUpdate({
															checkoutId: checkout?.id!,
															lineItems: [
																{ id: item.id, quantity: parseInt(e.target.value) }
															]
														});
														setIsUpdating(false);
													}}
												/>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</>
			</Dialog>
		</StyledDrawer>
	);
}

const StyledDrawer = styled(Drawer)`
	.footer-attribute {
		color: ${theme.colors.gray.darker};
		font-weight: 100;
		letter-spacing: 1px;
	}

	.checkout-button {
		margin-top: ${theme.dimensions['4']};
	}

	li {
		& + li {
			margin-top: ${theme.dimensions['4']};
		}
	}

	.item-image {
		height: 65px;
		width: 65px;
		margin-right: ${theme.dimensions['2']};
	}

	.item-remove {
		display: flex;
		position: absolute;
		top: -10px;
		left: -10px;
		font-size: 1rem;
		border-radius: 100%;
		height: 24px;
		width: 24px;
		padding: 4px;

		& > * {
			border-radius: 100%;
			overflow: hidden;
			background-color: white;
			color: black;
		}
	}

	.item-variant-title {
		color: ${theme.colors.gray.medium};
	}

	.item-quantity-wrapper {
		border-radius: 2px;
		overflow: hidden;
		text-align: center;

		button {
			width: 25px;
		}

		span {
			padding: 0 ${theme.dimensions['2']};
			border-left: 1px solid ${theme.colors.gray.darker};
			border-right: 1px solid ${theme.colors.gray.darker};
		}
	}
`;
