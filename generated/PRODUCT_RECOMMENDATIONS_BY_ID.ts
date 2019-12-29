/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PRODUCT_RECOMMENDATIONS_BY_ID
// ====================================================

export interface PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations_images_edges_node {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
}

export interface PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations_images_edges_node;
}

export interface PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations_images_edges[];
}

export interface PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations {
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
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * List of images associated with the product.
   */
  images: PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations_images;
}

export interface PRODUCT_RECOMMENDATIONS_BY_ID {
  /**
   * Find recommended products related to a given `product_id`.
   * To learn more about how recommendations are generated, see
   * [*Showing product recommendations on product pages*](https: // help.shopify.com/themes/development/recommended-products).
   */
  productRecommendations: PRODUCT_RECOMMENDATIONS_BY_ID_productRecommendations[] | null;
}

export interface PRODUCT_RECOMMENDATIONS_BY_IDVariables {
  productId: string;
}
