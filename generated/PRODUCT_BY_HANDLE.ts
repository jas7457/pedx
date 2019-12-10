/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PRODUCT_BY_HANDLE
// ====================================================

export interface PRODUCT_BY_HANDLE_productByHandle_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
}

export interface PRODUCT_BY_HANDLE_productByHandle_priceRange_maxVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
}

export interface PRODUCT_BY_HANDLE_productByHandle_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: PRODUCT_BY_HANDLE_productByHandle_priceRange_minVariantPrice;
  /**
   * The highest variant's price.
   */
  maxVariantPrice: PRODUCT_BY_HANDLE_productByHandle_priceRange_maxVariantPrice;
}

export interface PRODUCT_BY_HANDLE_productByHandle_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface PRODUCT_BY_HANDLE_productByHandle_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: PRODUCT_BY_HANDLE_productByHandle_images_edges_node;
}

export interface PRODUCT_BY_HANDLE_productByHandle_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: PRODUCT_BY_HANDLE_productByHandle_images_edges[];
}

export interface PRODUCT_BY_HANDLE_productByHandle_variants_edges_node_selectedOptions {
  __typename: "SelectedOption";
  /**
   * The product option’s name.
   */
  name: string;
  /**
   * The product option’s value.
   */
  value: string;
}

export interface PRODUCT_BY_HANDLE_productByHandle_variants_edges_node_priceV2 {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
}

export interface PRODUCT_BY_HANDLE_productByHandle_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface PRODUCT_BY_HANDLE_productByHandle_variants_edges_node {
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
   * List of product options applied to the variant.
   */
  selectedOptions: PRODUCT_BY_HANDLE_productByHandle_variants_edges_node_selectedOptions[];
  /**
   * The product variant’s price.
   */
  priceV2: PRODUCT_BY_HANDLE_productByHandle_variants_edges_node_priceV2;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: PRODUCT_BY_HANDLE_productByHandle_variants_edges_node_image | null;
}

export interface PRODUCT_BY_HANDLE_productByHandle_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: PRODUCT_BY_HANDLE_productByHandle_variants_edges_node;
}

export interface PRODUCT_BY_HANDLE_productByHandle_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: PRODUCT_BY_HANDLE_productByHandle_variants_edges[];
}

export interface PRODUCT_BY_HANDLE_productByHandle {
  __typename: "Product";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml: ShopifyHTML;
  /**
   * A categorization that a product can be tagged with, commonly used for filtering and searching.
   */
  productType: string;
  /**
   * The price range.
   */
  priceRange: PRODUCT_BY_HANDLE_productByHandle_priceRange;
  /**
   * List of images associated with the product.
   */
  images: PRODUCT_BY_HANDLE_productByHandle_images;
  /**
   * List of the product’s variants.
   */
  variants: PRODUCT_BY_HANDLE_productByHandle_variants;
}

export interface PRODUCT_BY_HANDLE {
  /**
   * Find a product by its handle.
   */
  productByHandle: PRODUCT_BY_HANDLE_productByHandle | null;
}

export interface PRODUCT_BY_HANDLEVariables {
  handle: string;
}
