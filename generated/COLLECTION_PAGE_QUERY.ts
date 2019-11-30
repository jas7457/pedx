/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: COLLECTION_PAGE_QUERY
// ====================================================

export interface COLLECTION_PAGE_QUERY_collectionByHandle_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_priceRange_minVariantPrice;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_images_edges_node;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_images_edges[];
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants_edges_node_image | null;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants_edges_node;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants_edges[];
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node {
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
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * Indicates if at least one product variant is available for sale.
   */
  availableForSale: boolean;
  /**
   * The price range.
   */
  priceRange: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_priceRange;
  /**
   * List of images associated with the product.
   */
  images: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_images;
  /**
   * List of the product’s variants.
   */
  variants: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node_variants;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges_node;
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: COLLECTION_PAGE_QUERY_collectionByHandle_products_edges[];
}

export interface COLLECTION_PAGE_QUERY_collectionByHandle {
  __typename: "Collection";
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * Stripped description of the collection, single line with HTML tags removed.
   */
  description: string;
  /**
   * Image associated with the collection.
   */
  image: COLLECTION_PAGE_QUERY_collectionByHandle_image | null;
  /**
   * List of products in the collection.
   */
  products: COLLECTION_PAGE_QUERY_collectionByHandle_products;
}

export interface COLLECTION_PAGE_QUERY {
  /**
   * Find a collection by its handle.
   */
  collectionByHandle: COLLECTION_PAGE_QUERY_collectionByHandle | null;
}

export interface COLLECTION_PAGE_QUERYVariables {
  handle: string;
}
