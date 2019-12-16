/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SHOP_FILTER_QUERY
// ====================================================

export interface SHOP_FILTER_QUERY_productTypes_edges {
  __typename: "StringEdge";
  /**
   * The item at the end of StringEdge.
   */
  node: string;
}

export interface SHOP_FILTER_QUERY_productTypes {
  __typename: "StringConnection";
  /**
   * A list of edges.
   */
  edges: SHOP_FILTER_QUERY_productTypes_edges[];
}

export interface SHOP_FILTER_QUERY_collections_edges_node {
  __typename: "Collection";
  /**
   * Globally unique identifier.
   */
  id: string;
  /**
   * The collection’s name. Limit of 255 characters.
   */
  title: string;
}

export interface SHOP_FILTER_QUERY_collections_edges {
  __typename: "CollectionEdge";
  /**
   * The item at the end of CollectionEdge.
   */
  node: SHOP_FILTER_QUERY_collections_edges_node;
}

export interface SHOP_FILTER_QUERY_collections {
  __typename: "CollectionConnection";
  /**
   * A list of edges.
   */
  edges: SHOP_FILTER_QUERY_collections_edges[];
}

export interface SHOP_FILTER_QUERY_productTags_edges {
  __typename: "StringEdge";
  /**
   * The item at the end of StringEdge.
   */
  node: string;
}

export interface SHOP_FILTER_QUERY_productTags {
  __typename: "StringConnection";
  /**
   * A list of edges.
   */
  edges: SHOP_FILTER_QUERY_productTags_edges[];
}

export interface SHOP_FILTER_QUERY {
  /**
   * List of product types for the shop's products that are published to your app.
   */
  productTypes: SHOP_FILTER_QUERY_productTypes;
  /**
   * List of the shop’s collections.
   */
  collections: SHOP_FILTER_QUERY_collections;
  /**
   * Tags added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   */
  productTags: SHOP_FILTER_QUERY_productTags;
}
