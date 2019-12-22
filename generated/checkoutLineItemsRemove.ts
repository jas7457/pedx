/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: checkoutLineItemsRemove
// ====================================================

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_userErrors {
  __typename: "UserError";
  /**
   * The error message.
   */
  message: string;
  /**
   * Path to the input field which caused the error.
   */
  field: string[] | null;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_totalTaxV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_subtotalPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_totalPriceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node_variant_image {
  __typename: "Image";
  /**
   * The location of the image as a URL.
   */
  src: ShopifyURL;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node_variant_product {
  __typename: "Product";
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node_variant {
  __typename: "ProductVariant";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node_variant_image | null;
  /**
   * The product variant’s price.
   */
  price: ShopifyMoney;
  /**
   * The product object that the product variant belongs to.
   */
  product: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node_variant_product;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node {
  __typename: "CheckoutLineItem";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * Title of the line item. Defaults to the product's title.
   */
  title: string;
  /**
   * Product variant of the line item.
   */
  variant: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node_variant | null;
  /**
   * The quantity of the line item.
   */
  quantity: number;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges {
  __typename: "CheckoutLineItemEdge";
  /**
   * The item at the end of CheckoutLineItemEdge.
   */
  node: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges_node;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems {
  __typename: "CheckoutLineItemConnection";
  /**
   * A list of edges.
   */
  edges: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems_edges[];
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove_checkout {
  __typename: "Checkout";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * The url pointing to the checkout accessible from the web.
   */
  webUrl: ShopifyURL;
  /**
   * The sum of all the taxes applied to the line items and shipping lines in the checkout.
   */
  totalTaxV2: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_totalTaxV2;
  /**
   * Price of the checkout before shipping and taxes.
   */
  subtotalPriceV2: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_subtotalPriceV2;
  /**
   * The sum of all the prices of all the items in the checkout, taxes and discounts included.
   */
  totalPriceV2: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_totalPriceV2;
  /**
   * A list of line item objects, each one containing information about an item in the checkout.
   */
  lineItems: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout_lineItems;
}

export interface checkoutLineItemsRemove_checkoutLineItemsRemove {
  __typename: "CheckoutLineItemsRemovePayload";
  /**
   * List of errors that occurred executing the mutation.
   */
  userErrors: checkoutLineItemsRemove_checkoutLineItemsRemove_userErrors[];
  checkout: checkoutLineItemsRemove_checkoutLineItemsRemove_checkout | null;
}

export interface checkoutLineItemsRemove {
  /**
   * Removes line items from an existing checkout
   */
  checkoutLineItemsRemove: checkoutLineItemsRemove_checkoutLineItemsRemove | null;
}

export interface checkoutLineItemsRemoveVariables {
  checkoutId: string;
  lineItemIds: string[];
}
