/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PRODUCT_BY_HANDLE
// ====================================================

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
   * Indicates if the product variant is available for sale.
   */
  availableForSale: boolean;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: PRODUCT_BY_HANDLE_productByHandle_variants_edges_node_image | null;
}

export interface PRODUCT_BY_HANDLE_productByHandle_variants_edges {
  __typename: "ProductVariantEdge";
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
   * Stripped description of the product, single line with HTML tags removed.
   */
  description: string;
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
