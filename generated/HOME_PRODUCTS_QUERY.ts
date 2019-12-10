// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HOME_PRODUCTS_QUERY
// ====================================================

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
  /**
   * The location of the transformed image as a URL.
   * 
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type does not support will be ignored.
   */
  transformedSrc: ShopifyURL;
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_images_edges_node;
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_images_edges[];
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants_edges_node_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * Indicates if the product variant is available for sale.
   */
  availableForSale: boolean;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants_edges_node_image | null;
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants_edges_node;
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants_edges[];
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node {
  __typename: "Product";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * Stripped description of the product, single line with HTML tags removed.
   */
  description: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * A categorization that a product can be tagged with, commonly used for filtering and searching.
   * Additional access scope required for private apps: unauthenticated_read_product_tags.
   */
  tags: string[];
  /**
   * List of images associated with the product.
   */
  images: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_images;
  /**
   * List of the product’s variants.
   */
  variants: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node_variants;
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges_node;
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: HOME_PRODUCTS_QUERY_collectionByHandle_products_edges[];
}

export interface HOME_PRODUCTS_QUERY_collectionByHandle {
  __typename: "Collection";
  /**
   * A human-friendly unique string for the collection automatically generated from its title.
   * Limit of 255 characters.
   */
  handle: string;
  /**
   * Stripped description of the collection, single line with HTML tags removed.
   */
  description: string;
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
  /**
   * List of products in the collection.
   */
  products: HOME_PRODUCTS_QUERY_collectionByHandle_products;
}

export interface HOME_PRODUCTS_QUERY {
  /**
   * Find a collection by its handle.
   */
  collectionByHandle: HOME_PRODUCTS_QUERY_collectionByHandle | null;
}
